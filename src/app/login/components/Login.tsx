import React, { useTransition } from 'react'
import Input from '@/src/components/form/Input'
import { Button, Box } from '@chakra-ui/react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FormProvider } from 'react-hook-form'
import { login } from '../actions'
import { useRouter } from 'next/navigation'
import { handleRequest } from '@/src/utils/functions'
const Login = () => {
  const router = useRouter()
  const [isSendingForm, startTransition] = useTransition()
  const registerSchema = z.object({
    account_number: z
      .string()
      .min(10, 'El número de cuenta debe tener 10 dígitos')
      .max(10, 'El número de cuenta debe tener 10 dígitos')
  })

  const methods = useForm({
    resolver: zodResolver(registerSchema),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit'
  })

  const action = methods.handleSubmit(async (data) => {
    const { account_number } = data
    startTransition(async () => {
      const request = await handleRequest(() =>
        login({ accountNumber: account_number })
      )
      if (request?.success) {
        router.push('/dashboard')
      }
    })
  })

  const canSubmit = methods.watch('account_number')

  return (
    <FormProvider {...methods}>
      <form onSubmit={action}>
        <Box mb={2}>
          <Input name='account_number' label='Número de cuenta' type='number' />
        </Box>
        <Button isDisabled={!canSubmit} width='100%' isLoading={isSendingForm} type='submit'>
          Ingresar
        </Button>
      </form>
    </FormProvider>
  )
}

export default Login
