'use client'
import React from 'react'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuDivider,
  Avatar,
  Box,
  Text,
  Button,
  Flex,
  Divider,
  Link
} from '@chakra-ui/react'
import { MdOutlineLogout } from 'react-icons/md'
import { useGetUser } from '@/src/hooks/useGetUser'
import { logout } from '@/src/app/dashboard/actions'
import { useRouter } from 'next/navigation'
import { IoChevronDownOutline } from 'react-icons/io5'
import { navbarItems } from '@/src/app/dashboard/utils/utils'
import NextLink from 'next/link'
import { usePathname } from 'next/navigation'
const ProfileMenu = () => {
  const { user } = useGetUser()
  const router = useRouter()
  const path = usePathname()
  const handleLogout = async () => {
    await logout()
    router.push('/login')
  }
  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<IoChevronDownOutline />}
        variant='transparent'
      >
        <Avatar height='35px' width='35px' />
      </MenuButton>
      <MenuList
        borderRadius='xl'
        border='none'
        py={4}
        px={4}
        boxShadow='rgba(0, 0, 0, 0.36) 0px 1px 4px'
      >
        <Box mb={2}>
          <Text>
            Hola, <span style={{ fontWeight: '600' }}>{user?.name}</span>
          </Text>
        </Box>
        <Box my={1}>
          <MenuDivider />
        </Box>
        <Flex display={{ base: 'flex', md: 'none' }} flexDirection='column'>
          {navbarItems.map((item) => (
            <Link key={item.name} as={NextLink} href={item.path} mb={1}>
              <Button
                justifyContent='flex-start'
                width='100%'
                variant={path === item.path ? 'navbar-current' : 'navbar'}
                px={0}
              >
                <Box mr={2}>{item.icon}</Box>
                <Text>{item.name}</Text>
              </Button>
            </Link>
          ))}
        </Flex>
        <Box display={{ base: 'block', md: 'none' }} my={1}>
          <Divider />
        </Box>
        <Button
          onClick={handleLogout}
          justifyContent='flex-start'
          px={0}
          width='100%'
          mt={1}
        >
          <Box mr={2}>
            <MdOutlineLogout />
          </Box>
          <Text>Salir</Text>
        </Button>
      </MenuList>
    </Menu>
  )
}

export default ProfileMenu
