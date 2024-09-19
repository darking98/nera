'use client'
import React from 'react'
import {
  Center,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Flex,
  Text,
  Box
} from '@chakra-ui/react'
import Register from './components/Register'
import Login from './components/Login'
import logo from '@/src/assets/nera-logo.webp'
import Image from 'next/image'
const LoginContainer = () => {
  return (
    <Flex height='100vh'>
      <Center width='100%' background='blackNera' flexDirection='column'>
        <Box mb={4}>
          <Image
            alt='Logo de Nera'
            width='50'
            height='50'
            src={
              'https://static.wixstatic.com/media/2ed052_d2109625ec3640c9a7ac220d026aff77%7Emv2.png/v1/fill/w_192%2Ch_192%2Clg_1%2Cusm_0.66_1.00_0.01/2ed052_d2109625ec3640c9a7ac220d026aff77%7Emv2.png'
            }
          />
        </Box>
        <Tabs>
          <TabList>
            <Tab _selected={{ borderBottom: '2px solid #0DAB4E' }} width='100%'>
              Login
            </Tab>
            <Tab _selected={{ borderBottom: '2px solid #0DAB4E' }} width='100%'>
              Registro
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel px={0}>
              <Login />
            </TabPanel>
            <TabPanel px={0}>
              <Register />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Center>
      <Center
        background='blackNera'
        p={8}
        width='100%'
        display={{ base: 'none', md: 'flex' }}
      >
        <Center
          background='white'
          width='100%'
          height='100%'
          borderRadius='2xl'
          flexDirection='column'
        >
          <Image alt='Logo de Nera' src={logo} />
          <Text mt={2} fontSize='xl' fontWeight='600' color='primary'>
            Potenciá tu negocio agro.
          </Text>
        </Center>
      </Center>
    </Flex>
  )
}

export default LoginContainer
