import React, { useTransition } from 'react'
import Input from '@/src/components/form/Input'
import { Button, Box } from '@chakra-ui/react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FormProvider } from 'react-hook-form'
import { createAccount } from '../actions'
import { useRouter } from 'next/navigation'
import { handleRequest } from '@/src/utils/functions'
const Register = () => {
  const router = useRouter()
  const [isSendingForm, startTransition] = useTransition()
  const registerSchema = z.object({
    name: z
      .string()
      .min(1, 'Ingresa tu nombre')
      .max(100, 'Caracteres excedidos'),
    account_number: z
      .string()
      .min(10, 'El número de cuenta debe tener 10 dígitos')
      .max(10, 'El número de cuenta debe tener 10 dígitos')
  })

  const methods = useForm({
    resolver: zodResolver(registerSchema),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit'
  })

  const action = methods.handleSubmit(async (data) => {
    const { name, account_number } = data
    startTransition(async () => {
      const request = await handleRequest(() =>
        createAccount({
          accountNumber: account_number,
          name
        })
      )
      if (request?.success) {
        router.push('/dashboard')
      }
    })
  })

  return (
    <FormProvider {...methods}>
      <form onSubmit={action}>
        <Box mb={2}>
          <Input name='name' label='Nombre' type='text' />
        </Box>
        <Box mb={2}>
          <Input name='account_number' label='Número de cuenta' type='number' />
        </Box>
        <Button width='100%' isLoading={isSendingForm} type='submit'>
          Registrarme
        </Button>
      </form>
    </FormProvider>
  )
}

export default Register
