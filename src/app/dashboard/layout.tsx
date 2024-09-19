import React from 'react'
import { Box, Flex, Container } from '@chakra-ui/react'
import Navbar from '@/src/components/layout/Navbar'
import {
  QueryClient,
  HydrationBoundary,
  dehydrate
} from '@tanstack/react-query'
import { getUser } from '../actions'
import { getBalance } from './actions'
const Layout = async ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['user'],
    queryFn: getUser
  })
  await queryClient.prefetchQuery({
    queryKey: ['balance'],
    queryFn: getBalance
  })

  const dehydratedState = dehydrate(queryClient)
  return (
    <HydrationBoundary state={dehydratedState}>
      <Flex
        px={{ base: 2, md: 6 }}
        py={2}
        background='white'
        minHeight='100vh'
        flexDirection='column'
      >
        <Navbar />
        <Box
          borderRadius='2xl'
          px={{ base: 2, md: 6 }}
          py={8}
          background='blackNera'
          flex='1'
          height='100%'
        >
          <Container maxW='7xl'>{children}</Container>
        </Box>
      </Flex>
    </HydrationBoundary>
  )
}

export default Layout
