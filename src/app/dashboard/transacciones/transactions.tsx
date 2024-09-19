'use client'
import React from 'react'
import { useGetTransactions } from '@/src/hooks/useGetTransactions'
import { Box, Heading, Text, Flex, Divider } from '@chakra-ui/react'
import List from '@/src/components/lists/List'
import TransactionItem from './components/TransactionItem'

const Transactions = () => {
  const { transactions, isLoading, setPage, setPageSize, page, pageSize } =
    useGetTransactions()
  return (
    <Box>
      <Box mb={2}>
        <Heading>Transacciones</Heading>
      </Box>
      <Divider borderColor='grayNera' />
      <Box
        mt={4}
        pt={4}
        width='100%'
        border='1px solid #5A5A5A'
        borderRadius='xl'
      >
        <Flex px={4} pb={2} justifyContent='space-between' alignItems='center'>
          <Text fontSize='lg' fontWeight='600'>
            Todas las transacciones
          </Text>
        </Flex>
        <Divider />
        <Box py={4}>
          <List
            isLoading={isLoading}
            data={transactions?.data?.map((el) => (
              <TransactionItem key={el.id} data={el} />
            ))}
            count={transactions?.count}
            setPage={setPage}
            setPageSize={setPageSize}
            page={page}
            pageSize={pageSize}
            emptyState='Todavía no hay transacciones.'
            loadingText='Cargando transacciones...'
          />
        </Box>
      </Box>
    </Box>
  )
}

export default Transactions
