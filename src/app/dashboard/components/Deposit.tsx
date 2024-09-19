import React, { useTransition } from 'react'
import Input from '@/src/components/form/Input'
import { Button, Box, Flex, Text } from '@chakra-ui/react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FormProvider } from 'react-hook-form'
import { createTransaction } from '../actions'
import { useQueryClient } from '@tanstack/react-query'
import { IBalanceModals } from '@/src/types'
import { handleRequest } from '@/src/utils/functions'
const Deposit = ({ onClose, refetchBalance }: IBalanceModals) => {
  const [isLoading, startTransition] = useTransition()
  const queryClient = useQueryClient()
  const depositSchema = z.object({
    amount: z.string().min(1, 'Ingresa un monto')
  })

  const methods = useForm({
    resolver: zodResolver(depositSchema),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit'
  })

  const action = methods.handleSubmit(async (data) => {
    const { amount } = data
    startTransition(async () => {
      const request = await handleRequest(() =>
        createTransaction({
          amount,
          type: 'deposit'
        })
      )
      if (request.success) {
        await queryClient.invalidateQueries({ queryKey: ['transactions'] })
        refetchBalance()
        onClose()
      }
    })
  })

  const canSubmitForm = methods.watch('amount')
  return (
    <Box>
      <FormProvider {...methods}>
        <form onSubmit={action}>
          <Box mb={4}>
            <Text fontSize='lg' fontWeight='600'>
              Depositar dinero en tu cuenta de Nera
            </Text>
          </Box>
          <Box mb={2}>
            <Input name='amount' label='Monto a depositar' type='number' />
          </Box>
          <Flex mt={4} justifyContent='flex-end'>
            <Button
              variant='transparent'
              isLoading={isLoading}
              isDisabled={!canSubmitForm}
              loadingText='Depositando dinero...'
              type='submit'
            >
              Depositar dinero
            </Button>
          </Flex>
        </form>
      </FormProvider>
    </Box>
  )
}

export default Deposit
