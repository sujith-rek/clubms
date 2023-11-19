import Image from 'next/image'
import { Inter } from 'next/font/google'
import {
  Flex,
  Container,
  Heading,
  Stack,
  Text,
  Button,
} from '@chakra-ui/react'
import Illustration from '@/components/Illustration/Illustration'
import { useRouter } from 'next/router'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter();
  return (
    <>
      <Container maxW={'10xl'}>
        <Stack
          textAlign={'center'}
          align={'center'}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 20, md: 59 }}>
          <Heading
            fontWeight={600}
            fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}>
            Room and Event Booking{' '}
            <Text as={'span'} color={'orange.400'}>
              made easy
            </Text>
          </Heading>
          <Stack spacing={6} direction={'row'}>
            <Button
              rounded={'full'}
              px={6}
              colorScheme={'orange'}
              bg={'orange.400'}
              onClick={() => { router.push('/auth/club/clubLogin') }}
              _hover={{ bg: 'orange.500' }}>
              Club
            </Button>
            <Button
              rounded={'full'}
              px={6}
              colorScheme={'orange'}
              bg={'orange.400'}
              onClick={() => { router.push('/auth/admin/adminLogin') }}
              _hover={{ bg: 'orange.500' }}>
              Admin
            </Button>
            <Button
              rounded={'full'}
              px={6}
              colorScheme={'orange'}
              bg={'orange.400'}
              onClick={() => { router.push('/auth/student/studentLogin') }}
              _hover={{ bg: 'orange.500' }}>
              Student
            </Button>
            <Button
              rounded={'full'}
              px={6}
              colorScheme={'orange'}
              onClick={() => { router.push('/auth/cc/ccLogin') }}
              bg={'orange.400'}
              _hover={{ bg: 'orange.500' }}>
              Cultural Committee
            </Button>
          </Stack>
          <Flex w={'full'}>
            <Illustration height={{ sm: '18rem', lg: '18rem' }} mt={{ base: 12, sm: 16 }} />
          </Flex>
        </Stack>
      </Container>
    </>
  )
}