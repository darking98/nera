import React from 'react'
import { getTransaction } from '../actions'
import TransactionDetail from '../components/TransactionDetail'

const Transaction = async ({ params }: { params: { id: string } }) => {
  try {
    const transaction = await getTransaction({ id: params.id })
    return <TransactionDetail data={transaction} />
  } catch (error: any) {
    return <div>{error}</div>
  }
}

export default Transaction
