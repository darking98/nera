'use client'
import React from 'react'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import theme from '../styles/themes/theme'
const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const customTheme = extendTheme({
    ...theme,
    config: {
      useSystemColorMode: false
    },
    styles: {
      global: () => ({
        body: {
          bg: 'black',
          color: 'white'
        }
      })
    }
  })
  return <ChakraProvider theme={customTheme}>{children}</ChakraProvider>
}

export default ThemeProvider
