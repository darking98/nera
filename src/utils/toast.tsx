import { createStandaloneToast } from '@chakra-ui/toast'
import type { CreateStandaloneToastReturn, ToastId } from '@chakra-ui/react'
import { Box, Text, Button, Center, Flex } from '@chakra-ui/react'
import {
  IoCheckmark,
  IoWarningOutline,
  IoInformationCircleOutline,
  IoClose
} from 'react-icons/io5'
import { MdErrorOutline } from 'react-icons/md'

interface Colors {
  success: string
  error: string
  warning: string
  info: string
}

const colors: Colors = {
  success: 'primary',
  error: 'red.500',
  warning: 'yellow.500',
  info: 'blue.500'
}

interface Icons {
  success: JSX.Element
  error: JSX.Element
  warning: JSX.Element
  info: JSX.Element
}

const icons: Icons = {
  success: <IoCheckmark />,
  error: <MdErrorOutline />,
  warning: <IoWarningOutline />,
  info: <IoInformationCircleOutline />
}

interface ToastProps {
  title?: string
  text?: string
  status: 'success' | 'error' | 'warning' | 'info'
  duration?: number
  isClosable?: boolean
}

class ToastInstance {
  toast: CreateStandaloneToastReturn
  toastId: ToastId
  constructor() {
    this.toast = createStandaloneToast()
  }

  fire({ title, text, status, duration }: ToastProps) {
    console.log(colors[status])

    this.toastId = this.toast.toast({
      position: 'bottom',
      duration,
      render: () => (
        <Box
          p={1}
          position='relative'
          color='white'
          bg='blackNera'
          borderRadius='8px'
        >
          <Flex
            borderTop={`4px solid`}
            borderColor={colors[status]}
            borderTopRadius='3px'
            p={2}
            alignItems='center'
          >
            <Center
              color={colors[status as keyof Colors]}
              borderRadius='50%'
              background='grayNera'
              height='50px'
              width='50px'
              mr={2}
              fontSize='xl'
            >
              {icons[status as keyof Icons]}
            </Center>
            <Box fontSize='sm' flex='1' mr={2}>
              <Text fontWeight='bold'>{title}</Text>
              <Text>{text}</Text>
            </Box>
            <Button variant='icon' border={0} onClick={() => this.close()}>
              <IoClose />
            </Button>
          </Flex>
        </Box>
      )
    })
  }
  close() {
    this.toast.toast.close(this.toastId)
  }
}

export const handleToast = ({
  title,
  text,
  status = 'info',
  duration = 6000,
  ...rest
}: ToastProps) => {
  const Toast = new ToastInstance()
  Toast.fire({ title, text, status, duration, ...rest })
}