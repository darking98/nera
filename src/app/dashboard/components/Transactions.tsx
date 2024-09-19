'use client'
import React from 'react'
import { Box, Text, Flex, Button, Link, Divider } from '@chakra-ui/react'
import { IoIosArrowForward } from 'react-icons/io'
import { useGetTransactions } from '@/src/hooks/useGetTransactions'
import NextLink from 'next/link'
import List from '@/src/components/lists/List'
import TransactionItem from '../transacciones/components/TransactionItem'
const Transactions = () => {
  const { transactions, isLoading } = useGetTransactions()
  return (
    <Box height='fit-content' pt={4} width='100%' border='1px solid #5A5A5A' borderRadius='xl'>
      <Flex px={4} pb={2} justifyContent='space-between' alignItems='center'>
        <Text fontSize='lg' fontWeight='600'>
          Últimas transacciones
        </Text>
        <Link as={NextLink} href='/dashboard/transacciones'>
          <Button alignItems='center' variant='transparent'>
            <Text mr={1}>Ver todas</Text>
            <IoIosArrowForward />
          </Button>
        </Link>
      </Flex>
      <Divider />
      <Box py={4}>
        <List
          isLoading={isLoading}
          data={transactions?.data?.map((el) => (
            <TransactionItem key={el.id} data={el} />
          ))}
          emptyState='Todavía no hay transacciones.'
        />
      </Box>
    </Box>
  )
}

export default Transactions
