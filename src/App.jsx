import { HStack } from '@chakra-ui/react'
import Posts from './container/Posts'

export const App = () => {

  return (
    <HStack marginTop={4} justifyContent="center" alignItems={"flex-start"}>
      <Posts />
    </HStack>
  )
}