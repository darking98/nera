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
const Withdraw = ({ onClose, refetchBalance, balance }: IBalanceModals) => {
  const [isLoading, startTransition] = useTransition()
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
    cbu_cvu: z
      .string()
      .min(22, 'El CBU/CVU debe tener 22 caracteres')
      .max(22, 'El CBU/CVU debe tener 22 caracteres')
  })

  const methods = useForm({
    resolver: zodResolver(withdrawSchema),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit'
  })

  const action = methods.handleSubmit(async (data) => {
    const { amount, cbu_cvu } = data
    startTransition(async () => {
      const request = await handleRequest(() =>
        createTransaction({
          amount,
          to: cbu_cvu,
          type: 'withdraw'
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

  const canSubmitForm = methods.watch('amount') && methods.watch('cbu_cvu')
  return (
    <Box>
      <FormProvider {...methods}>
        <form onSubmit={action}>
          <Box mb={4}>
            <Text fontSize='lg' fontWeight='600'>
              Retirar dinero de tu cuenta a un CBU/CVU
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
              Monto máximo a retirar: ${formatCurrency(balance)} ARS
            </Text>
          </Box>
          <Box mb={2}>
            <Input name='cbu_cvu' label='CBU/CVU' type='number' />
          </Box>
          <Flex mt={4} justifyContent='flex-end'>
            <Button
              variant='transparent'
              isLoading={isLoading}
              loadingText='Retirando dinero...'
              type='submit'
              isDisabled={!canSubmitForm}
            >
              Retirar dinero
            </Button>
          </Flex>
        </form>
      </FormProvider>
    </Box>
  )
}

export default Withdraw
