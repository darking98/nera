import React from 'react'
import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Divider,
  Box
} from '@chakra-ui/react'
const Modal = ({
  isOpen,
  onClose,
  title,
  content
}: {
  isOpen: boolean
  onClose: () => void
  title: string
  content: React.ReactNode | string
}) => {
  return (
    <ChakraModal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent background='blackNera'>
        <ModalHeader p={4}>{title}</ModalHeader>
        <Divider />
        <ModalCloseButton />
        <ModalBody px={4} py={6}>
          {content}
        </ModalBody>
        <Box pb={6}>
          <Divider />
        </Box>
      </ModalContent>
    </ChakraModal>
  )
}

export default Modal
