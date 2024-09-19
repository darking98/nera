import React from 'react'
import { Flex, Text, Center, Box, Link } from '@chakra-ui/react'
import { PiHandWithdraw, PiHandDeposit } from 'react-icons/pi'
import { GrTransaction } from 'react-icons/gr'
import {
  formatCurrency,
  formatDate,
  truncateString
} from '@/src/utils/functions'
import { useGetUser } from '@/src/hooks/useGetUser'
import { TransactionsResponse } from '@/src/types'
import NextLink from 'next/link'
const TransactionItem = ({ data }: { data: TransactionsResponse }) => {
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
    <Link as={NextLink} href={`/dashboard/transacciones/${data?.id}/`}>
      <Flex
        p={4}
        alignItems='center'
        justifyContent='space-between'
        _hover={{ background: 'gray.600' }}
        transition='100ms ease-in-out'
      >
        <Flex alignItems='center'>
          <Center
            borderRadius='50%'
            height='45px'
            width='45px'
            color='white'
            background='grayNera'
            fontSize='2xl'
          >
            {data?.type === 'deposit' ? (
              <PiHandDeposit />
            ) : data?.type === 'withdraw' ? (
              <PiHandWithdraw />
            ) : (
              data?.type === 'transfer' && <GrTransaction />
            )}
          </Center>
          <Box ml={2}>
            <Text fontWeight='600'>
              {isTransferRecieved
                ? truncateString(data?.account_id?.name, 30)
                : isTransferSent
                ? truncateString(data?.to_account_id?.name, 30)
                : truncateString(data?.account_id?.name, 30)}
            </Text>
            {data?.concept && (
              <Text fontSize='sm'>{truncateString(data?.concept)}</Text>
            )}
            <Text fontSize='sm' opacity='0.8'>
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
          </Box>
        </Flex>
        <Flex flexDirection='column' alignItems='flex-end'>
          <Text
            fontWeight='600'
            fontSize='lg'
            color={isIncome ? 'green.400' : isEgress && 'red.400'}
          >
            {isIncome ? '+' : isEgress && '-'} ${formatCurrency(data?.amount)}
          </Text>
          <Text fontSize='sm' opacity='0.8'>
            {formatDate(data?.created_at)}
          </Text>
        </Flex>
      </Flex>
    </Link>
  )
}

export default TransactionItem
