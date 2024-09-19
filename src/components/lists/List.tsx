import React, { ChangeEvent } from 'react'
import { Flex, Button, Divider, Text, Select, Box } from '@chakra-ui/react'
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io'

interface IList {
  data: React.ReactNode[]
  isLoading: boolean
  count?: number
  page?: number
  pageSize?: number
  setPage?: (page: number) => void
  setPageSize?: (size: number) => void
  emptyState?: string | React.ReactNode
  loadingText?: string | React.ReactNode
}

const List = ({
  data,
  isLoading,
  page,
  count,
  pageSize,
  setPage,
  setPageSize,
  emptyState = 'No hay transacciones',
  loadingText = 'Cargando...'
}: IList) => {
  const totalPages = Math.ceil(count / pageSize)

  const handlePage = (page: number) => {
    setPage(page)
  }

  const handleNextPage = () => {
    if (page + 1 > totalPages) return
    setPage(page + 1)
  }

  const handlePrevPage = () => {
    if (page - 1 === 0) return
    setPage(page - 1)
  }

  const handlePageSize = (event: ChangeEvent<HTMLSelectElement>) => {
    setPageSize(parseInt(event.target.value))
  }
  return (
    <Flex flexDirection='column'>
      {isLoading ? (
        <Flex pb={4} justifyContent='center' alignItems='center'>
          <Text>{loadingText}</Text>
        </Flex>
      ) : data?.length === 0 ? (
        <Flex pb={4} justifyContent='center' alignItems='center'>
          <Text>{emptyState}</Text>
        </Flex>
      ) : (
        data
      )}
      {/* Pagination */}
      <Divider />
      {!isLoading && count && (
        <Flex px={4} pt={4} alignItems='center' justifyContent='space-between'>
          <Box>
            <Select value={pageSize} onChange={handlePageSize}>
              <option value='10'>10</option>
              <option value='20'>20</option>
              <option value='30'>30</option>
              <option value='40'>40</option>
              <option value='50'>50</option>
            </Select>
          </Box>
          <Flex flex='1' justifyContent='center'>
            {page - 1 !== 0 && (
              <Button
                onClick={handlePrevPage}
                fontWeight='normal'
                variant='transparent'
                fontSize='sm'
                alignItems='center'
                color='gray'
              >
                <IoIosArrowBack />
                <Text ml={1}>Anterior</Text>
              </Button>
            )}

            {Array.from({ length: totalPages }, (_, index) => (
              <Button
                variant='transparent'
                key={index + 1}
                onClick={() => handlePage(index + 1)}
                outline={page === index + 1 ? '1px solid white' : null}
                color={page === index + 1 ? 'white' : 'gray'}
                fontSize='sm'
                mr={{ base: 0, md: 2 }}
              >
                {index + 1}
              </Button>
            ))}
            {page + 1 <= totalPages && (
              <Button
                onClick={handleNextPage}
                fontWeight='normal'
                variant='transparent'
                fontSize='sm'
                alignItems='center'
                color='gray'
              >
                <Text mr={1}>Siguiente</Text>
                <IoIosArrowForward />
              </Button>
            )}
          </Flex>
        </Flex>
      )}
    </Flex>
  )
}

export default List
