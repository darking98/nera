import React from 'react'
import { Center, Text, Button, Link } from '@chakra-ui/react'
import Image from 'next/image'
import logo from '@/src/assets/nera-logo.webp'
import NextLink from 'next/link'
const NotFound = () => {
  return (
    <Center height='100vh' flexDirection='column' background='blackNera'>
      <Image alt='Logo de Nera' src={logo} />
      <Text my={4}>Lo sentimos, no pudimos encontrar esta página.</Text>
      <Link as={NextLink} href='/dashboard'>
        <Button>Volver</Button>
      </Link>
    </Center>
  )
}

export default NotFound
