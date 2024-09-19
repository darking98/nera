'use client'
import React, { useEffect } from 'react'
import { Box, Text, Flex, Button, Grid, useDisclosure } from '@chakra-ui/react'
import argentinaFlag from '@/src/assets/argentina.svg'
import Image from 'next/image'
import { PiHandWithdraw, PiHandDeposit } from 'react-icons/pi'
import { GrTransaction } from 'react-icons/gr'
import Modal from '@/src/components/modals/Modal'
import Withdraw from './Withdraw'
import Deposit from './Deposit'
import Transfer from './Transfer'
import { useGetBalance } from '@/src/hooks/useGetBalance'
import { formatCurrency } from '@/src/utils/functions'

const Balance = () => {
  const { balance, refetch: refetchBalance } = useGetBalance()

  useEffect(() => {
    if (balance === undefined) refetchBalance()
  }, [])

  const {
    isOpen: isOpenWithdraw,
    onClose: onCloseWithdraw,
    onOpen: onOpenWithdraw
  } = useDisclosure()
  const {
    isOpen: isOpenDeposit,
    onClose: onCloseDeposit,
    onOpen: onOpenDeposit
  } = useDisclosure()

  const {
    isOpen: isOpenTransfer,
    onClose: onCloseTransfer,
    onOpen: onOpenTransfer
  } = useDisclosure()

  const items = [
    {
      text: 'Retirar',
      icon: <PiHandWithdraw />,
      onClick: onOpenWithdraw
    },
    {
      text: 'Depositar',
      icon: <PiHandDeposit />,
      onClick: onOpenDeposit
    },
    {
      text: 'Transferir',
      icon: <GrTransaction />,
      onClick: onOpenTransfer
    }
  ]

  return (
    <>
      {/* Modals */}
      <Modal
        title='Retiro'
        content={
          <Withdraw
            onClose={onCloseWithdraw}
            refetchBalance={refetchBalance}
            balance={balance}
          />
        }
        isOpen={isOpenWithdraw}
        onClose={onCloseWithdraw}
      />
      <Modal
        title='Depósito'
        content={
          <Deposit onClose={onCloseDeposit} refetchBalance={refetchBalance} />
        }
        isOpen={isOpenDeposit}
        onClose={onCloseDeposit}
      />
      <Modal
        title='Transferencia'
        content={
          <Transfer
            onClose={onCloseTransfer}
            refetchBalance={refetchBalance}
            balance={balance}
          />
        }
        isOpen={isOpenTransfer}
        onClose={onCloseTransfer}
      />
      <Box
        height='fit-content'
        p={{ base: 2, md: 8 }}
        width='100%'
        border='1px solid #5A5A5A'
        borderRadius='xl'
      >
        <Grid gridTemplateColumns='50px 1fr'>
          <Box alignSelf='center' justifySelf='center'>
            <Image alt='Bandera de Argentina' src={argentinaFlag} />
          </Box>
          <Box>
            <Text fontSize='lg'>Balance total</Text>
            <Text fontSize='2xl' fontWeight='bold'>
              ${formatCurrency(balance)} ARS
            </Text>
          </Box>
          <Grid
            gridTemplateColumns='repeat(3,1fr)'
            gridColumn='2'
            justifyItems='self-start'
            mt={4}
          >
            {items.map((el) => (
              <Flex
                key={el.text}
                mr={6}
                flexDirection='column'
                alignItems='center'
              >
                <Button
                  flexDirection='column'
                  alignItems='center'
                  height='40px'
                  width='40px'
                  background='grayNera'
                  color='white'
                  fontSize='xl'
                  borderRadius='50%'
                  mb={1}
                  {...el}
                >
                  <Box>{el.icon}</Box>
                </Button>
                <Text>{el.text}</Text>
              </Flex>
            ))}
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default Balance
