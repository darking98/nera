import React from 'react'
import { Box, Heading, Flex, Divider, Grid } from '@chakra-ui/react'
import Balance from './components/Balance'
import Transactions from './components/Transactions'

export const metadata = {
  title: 'Dashboard'
}

const Dashboard = () => {
  return (
    <Box>
      <Flex flexDirection='column'>
        <Box mb={2}>
          <Heading>Dashboard</Heading>
        </Box>
        <Divider borderColor='grayNera' />
      </Flex>
      <Grid
        mt={4}
        gap={4}
        gridTemplateColumns={{ base: '1fr', md: '550px 1fr' }}
      >
        <Balance />
        <Transactions />
      </Grid>
    </Box>
  )
}

export default Dashboard
