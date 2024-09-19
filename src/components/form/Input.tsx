import React from 'react'
import {
  FormControl,
  Input as ChakraInput,
  FormLabel,
  InputProps,
  Text
} from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'

interface IInput extends InputProps {
  label?: string
}
const Input = ({ label, name, ...rest }: IInput) => {
  const { register, formState } = useFormContext()
  return (
    <FormControl>
      <FormLabel mb={1}>{label}</FormLabel>
      <ChakraInput {...register(name)} name={name} {...rest} />
      {formState.errors[name] && (
        <Text color='red.400' mt={1} fontSize='sm'>
          {formState.errors[name].message as string}
        </Text>
      )}
    </FormControl>
  )
}

export default Input
