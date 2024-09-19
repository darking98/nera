'use client'
import React from 'react'
import { TransactionsResponse } from '@/src/types'
import { Box, Flex, Text, Container, Button, Link } from '@chakra-ui/react'
import { useGetUser } from '@/src/hooks/useGetUser'
import { formatCurrency, formatDateTime } from '@/src/utils/functions'
import NextLink from 'next/link'
const TransactionDetail = ({ data }: { data: TransactionsResponse }) => {
  const { user } = useGetUser()

  const isTransferRecieved =
    data?.type === 'transfer' && data?.to_account_id?.id === user?.id
  const isTransferSent =
    data?.type === 'transfer' && data?.account_id?.id === user?.id
  const isDeposit = data?.type === 'deposit'
  const isWithdraw = data?.type === 'withdraw'

  const isIncome = isDeposit || isTransferRecieved
  const isEgress = isWithdraw || isTransferSent
  return (
    <Container maxW='2xl'>
      <Box mb={2}>
        <Text>Número de operación {data?.id}</Text>
      </Box>
      <Flex
        fontWeight='600'
        justifyContent='space-between'
        p={4}
        border='1px solid #5A5A5A'
        borderRadius='xl'
      >
        <Text>
          {isTransferRecieved
            ? 'Transferencia recibida'
            : isTransferSent
            ? 'Transferencia enviada'
            : isDeposit
            ? 'Depósito'
            : isWithdraw
            ? `Retiro a cuenta externa`
            : null}
        </Text>
        <Text color={isIncome ? 'green.400' : isEgress ? 'red.400' : 'white'}>
          {isIncome ? '+' : isEgress ? '-' : 'null'} ${' '}
          {formatCurrency(data?.amount)} ARS
        </Text>
      </Flex>
      <Box mt={4} border='1px solid #5A5A5A' borderRadius='xl'>
        <Flex p={4} justifyContent='space-between' alignItems='center'>
          <Text>Fecha</Text>
          <Text fontWeight='600'>{formatDateTime(data?.created_at)}</Text>
        </Flex>
        <Flex p={4} justifyContent='space-between' alignItems='center'>
          <Text>Creada por</Text>
          <Flex alignItems='flex-end' flexDirection='column'>
            <Text fontWeight='600'>{data?.account_id?.name}</Text>
            <Text fontWeight='600'>N° {data?.account_id?.account_number}</Text>
          </Flex>
        </Flex>
        {isTransferSent && (
          <Flex p={4} justifyContent='space-between' alignItems='center'>
            <Text>Recibida por</Text>
            <Flex alignItems='flex-end' flexDirection='column'>
              <Text fontWeight='600'>{data?.to_account_id?.name}</Text>
              <Text fontWeight='600'>
                N° {data?.to_account_id?.account_number}
              </Text>
            </Flex>
          </Flex>
        )}
        {isWithdraw && (
          <Flex p={4} justifyContent='space-between' alignItems='center'>
            <Text>Enviada al CBU/CVU</Text>
            <Text fontWeight='600'>{data?.external_account}</Text>
          </Flex>
        )}
        {data?.concept && (
          <Flex p={4} justifyContent='space-between' alignItems='center'>
            <Text>Concepto</Text>
            <Text fontWeight='600'>{data?.concept}</Text>
          </Flex>
        )}
      </Box>
      <Box mt={4}>
        <Link as={NextLink} href='/dashboard'>
          <Button width='100%'>Volver al dashboard</Button>
        </Link>
      </Box>
    </Container>
  )
}

export default TransactionDetail
