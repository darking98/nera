import React, { useTransition } from 'react'
import Input from '@/src/components/form/Input'
import { Button, Box, Flex, Text } from '@chakra-ui/react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FormProvider } from 'react-hook-form'
import { createTransaction } from '../actions'
import { useQueryClient } from '@tanstack/react-query'
import { IBalanceModals } from '@/src/types'
import { formatCurrency, handleRequest } from '@/src/utils/functions'
import { useGetUser } from '@/src/hooks/useGetUser'
const Transfer = ({ onClose, refetchBalance, balance }: IBalanceModals) => {
  const [isLoading, startTransition] = useTransition()
  const { user } = useGetUser()
  const queryClient = useQueryClient()
  const withdrawSchema = z.object({
    amount: z
      .string()
      .min(1, 'Ingresa un monto')
      .transform((val) => parseFloat(val)) // Convertir string a número
      .refine((val) => !isNaN(val) && val <= balance, {
        message: `El monto debe ser un número menor o igual a $${formatCurrency(
          balance
        )} ARS`
      }),
    concept: z.string().min(1, 'Ingresa un concepto'),
    account_number: z
      .string()
      .min(10, 'El número de cuenta debe tener 10 dígitos')
      .max(10, 'El número de cuenta debe tener 10 dígitos')
      .transform((val) => parseFloat(val))
      .refine((val) => val !== user?.account_number, {
        message: 'No podes transferir a tu propia cuenta'
      })
  })

  const methods = useForm({
    resolver: zodResolver(withdrawSchema),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit'
  })

  const action = methods.handleSubmit(async (data) => {
    const { amount, concept, account_number } = data
    startTransition(async () => {
      const request = await handleRequest(() =>
        createTransaction({
          amount,
          type: 'transfer',
          concept,
          to: account_number
        })
      )
      if (request.success) {
        await queryClient.invalidateQueries({ queryKey: ['transactions'] })
        refetchBalance()
        onClose()
      }
    })
  })

  const handleMaxBtn = () => {
    methods.setValue('amount', balance.toString())
  }

  const canSubmitForm =
    methods.watch('amount') &&
    methods.watch('concept') &&
    methods.watch('account_number')
  return (
    <Box>
      <FormProvider {...methods}>
        <form onSubmit={action}>
          <Box mb={4}>
            <Text fontSize='lg' fontWeight='600'>
              Enviar dinero a un número de cuenta de Nera
            </Text>
          </Box>
          <Box mb={2}>
            <Box position='relative'>
              <Input name='amount' label='Monto a retirar' type='number' />
              <Box
                zIndex='1'
                mr={1}
                mt={8}
                position='absolute'
                right={0}
                top={0}
              >
                <Button onClick={handleMaxBtn} size='sm'>
                  MÁX.
                </Button>
              </Box>
            </Box>
            <Text mt={1} fontSize='xs' color='gray.400'>
              Monto máximo a enviar: ${formatCurrency(balance)} ARS
            </Text>
          </Box>
          <Box mb={2}>
            <Input name='concept' label='Concepto' type='text' />
          </Box>
          <Box mb={2}>
            <Input
              name='account_number'
              label='Número de cuenta'
              type='number'
            />
          </Box>
          <Flex mt={4} justifyContent='flex-end'>
            <Button
              variant='transparent'
              isLoading={isLoading}
              isDisabled={!canSubmitForm}
              loadingText='Enviando transacción...'
              type='submit'
            >
              Enviar transacción
            </Button>
          </Flex>
        </form>
      </FormProvider>
    </Box>
  )
}

export default Transfer
