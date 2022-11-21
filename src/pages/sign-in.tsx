import { Box } from '@primer/react'
import { Header } from '../components/header'
import { SignIn } from '../features/customer'

export default function SignInPage() {
  return (
    <Box>
      <Header />
      <SignIn />
    </Box>
  )
}
