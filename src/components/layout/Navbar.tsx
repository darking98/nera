'use client'
import React from 'react'
import { navbarItems } from '@/src/app/dashboard/utils/utils'
import { Box, Flex, Text, Button, Link } from '@chakra-ui/react'
import NextLink from 'next/link'
import Image from 'next/image'
import logo from '@/src/assets/nera-logo.webp'
import ProfileMenu from './ProfileMenu'
import { usePathname } from 'next/navigation'
const Navbar = () => {
  const path = usePathname()
  return (
    <Flex
      background='white'
      color='black'
      alignItems='center'
      justifyContent='space-between'
      pb={2}
    >
      <Link as={NextLink} href='/dashboard'>
        <Box width='150px'>
          <Image alt='Logo de Nera' src={logo} />
        </Box>
      </Link>
      <Flex alignItems='center' display={{ base: 'none', md: 'flex' }}>
        {navbarItems.map((item, key) => (
          <Link as={NextLink} key={item.name} href={item.path}>
            <Button
              variant={path === item.path ? 'navbar-current' : 'navbar'}
              mr={key !== navbarItems.length - 1 && 2}
            >
              <Text>{item.name}</Text>
            </Button>
          </Link>
        ))}
      </Flex>
      <Flex width='150px' justifyContent='flex-end'>
        <ProfileMenu />
      </Flex>
    </Flex>
  )
}

export default Navbar
