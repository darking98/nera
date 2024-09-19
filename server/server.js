import express from 'express'
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import { expressMiddleware } from './middleware.js'
import fetch from 'node-fetch'

dotenv.config()

const app = express()
const port = 3001

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

app.use(express.json())

// get user (account)
app.get('/user', expressMiddleware, async (req, res) => {
  try {
    const userId = req.headers['user_id']
    const { data, error } = await supabase
      .from('accounts')
      .select('*')
      .eq('id', userId)
      .single()

    if (error) {
      return res.status(500).json({ error: error?.message || 'Algo salió mal' })
    }
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json({ error: 'Algo salió mal' })
  }
})

// create account
app.post('/accounts', async (req, res) => {
  const body = req.body
  if (!body.name || !body.account_number) {
    return res.status(500).json({
      error: 'No se proveyeron los datos necesarios para crear una cuenta'
    })
  }
  try {
    const { data, error } = await supabase
      .from('accounts')
      .insert({
        name: body.name,
        account_number: body.account_number
      })
      .select('id')
      .single()

    if (error) {
      if (error.code === '23505') {
        return res.status(500).json({
          error:
            'El número de cuenta ingresado ya existe en nuestra base de datos'
        })
      }
      return res.status(500).json({ error: error?.message || 'Algo salió mal' })
    }
    res.status(200).json({ data })
  } catch (error) {
    res.status(500).json({ error: error.msg || 'Algo salió mal' })
  }
})

// login to app
app.post('/login', async (req, res) => {
  const body = req.body
  if (!body.account_number) {
    return res.status(500).json({
      error: 'No se proveyó el número de cuenta'
    })
  }
  try {
    const { data, error } = await supabase
      .from('accounts')
      .select('id')
      .eq('account_number', body.account_number)
      .single()
    if (error) {
      // the result contains 0 rows
      if (error.code === 'PGRST116') {
        return res.status(500).json({
          error: 'El número de cuenta no existe'
        })
      }
      return res.status(500).json({ error: error?.message || 'Algo salió mal' })
    }

    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ error: error.msg || 'Algo salió mal' })
  }
})

// balance
app.get('/accounts/balance', expressMiddleware, async (req, res) => {
  try {
    const userId = req.headers['user_id']
    const { data, error } = await supabase.rpc('calculate_balance', {
      user_id: userId
    })
    if (error) {
      return res.status(500).json({ error: error?.message || 'Algo salió mal' })
    }
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ error: 'Algo salió mal' })
  }
})

// transactions
app.post('/transactions', expressMiddleware, async (req, res) => {
  const { amount, type, to, concept } = req.body

  if (!amount || !type) {
    return res.status(500).json({
      error:
        'No se proveyeron los datos necesarios para realizar la transacción'
    })
  }

  try {
    const userId = req.headers['user_id']
    let transaction = {
      account_id: userId
    }
    // Primero validamos si el usaurio tiene balance para transferir ese monto
    if (type === 'transfer' || type === 'withdraw') {
      const response = await fetch(`http://localhost:3001/accounts/balance`, {
        headers: {
          user_id: userId
        }
      })
      const balance = await response.json()
      if (amount > balance) {
        return res.status(500).json({
          error: 'No tenes suficiente balance para realizar esta operación'
        })
      }
    }

    if (type === 'deposit') {
      transaction.amount = amount
      transaction.type = 'deposit'
    } else if (type === 'withdraw') {
      transaction.amount = amount
      transaction.external_account = to
      transaction.type = 'withdraw'
    } else if (type === 'transfer') {
      // Nos traemos el id del usuario en base a su número de cuenta
      const { data, error } = await supabase
        .from('accounts')
        .select('id, account_number')
        .eq('account_number', to)
      if (error || data.length === 0) {
        return {
          errorMessage:
            error?.message ||
            'El número de ingresado no corresponde a una cuenta registrada en Nera'
        }
      }
      // Validamos que no se esté transfiriendo a sí mismo
      const response = await fetch(`http://localhost:3001/user`, {
        headers: {
          user_id: userId
        }
      })
      const user = await response.json()
      if (user?.account_number === to) {
        return {
          errorMessage: 'No podes transferir a tu propia cuenta'
        }
      }
      transaction.to_account_id = data[0].id
      transaction.amount = amount
      transaction.concept = concept
      transaction.type = 'transfer'
    }

    const { data, error } = await supabase
      .from('transactions')
      .insert(transaction)
      .select('*')
      .single()
    if (error) {
      return res.status(500).json({ error: error?.message || 'Algo salió mal' })
    }
    res.status(200).json({ data })
  } catch (error) {
    res.status(500).json({ error: error.msg || 'Algo salió mal' })
  }
})

app.get('/transactions', expressMiddleware, async (req, res) => {
  const { page = 1, page_size = 10 } = req.query
  const from = (page - 1) * page_size
  const to = from + page_size - 1
  try {
    const userId = req.headers['user_id']
    const { data, error, count } = await supabase
      .from('transactions')
      .select(
        '*, to_account_id(name, id, account_number), account_id(name, id, account_number)',
        {
          count: 'exact'
        }
      )
      .or(`account_id.eq.${userId},to_account_id.eq.${userId}`)
      .order('created_at', { ascending: false })
      .range(from, to)

    if (error) {
      return res.status(500).json({ error: error?.message || 'Algo salió mal' })
    }
    res.status(200).json({ data, count })
  } catch (error) {
    res.status(500).json({ error: error.msg || 'Algo salió mal' })
  }
})

app.get('/transactions/:id', expressMiddleware, async (req, res) => {
  try {
    const { id } = req.params
    const userId = req.headers['user_id']

    const { data, error } = await supabase
      .from('transactions')
      .select(
        '*, to_account_id(name, id, account_number), account_id(name, id, account_number)'
      )
      .eq('id', id)
      .or(`account_id.eq.${userId},to_account_id.eq.${userId}`)
      .single()
    if (error) {
      return res.status(500).json({ error: error?.message || 'Algo salió mal' })
    }
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ error: error.msg || 'Algo salió mal' })
  }
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
