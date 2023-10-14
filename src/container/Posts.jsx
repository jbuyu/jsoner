import { Box, Button, HStack, Heading, VStack, useDisclosure, Text } from "@chakra-ui/react"
import { PostsTable } from "./PostsTable"
import { CreatePostModal } from "../components/CreatePostModal"
import { useFetchPosts } from "../hooks"


function Posts() {
  const allPosts = useFetchPosts()
  const { isOpen, onOpen, onClose } = useDisclosure()


  if (allPosts?.isLoading) {
    return (
      <Text>
        Loading Posts.....
      </Text>
    )
  }

  return (
    <VStack>
      <Heading>Posts</Heading>
      <HStack justifyContent="space-between" alignItems="flex-start">
        <PostsTable allPosts={allPosts} />
        <Box marginTop={12} >
          <Button onClick={onOpen} colorScheme="green" >
            Create a new Post
          </Button>
        </Box>
        <CreatePostModal
          isOpen={isOpen}
          onClose={onClose}
        />
      </HStack>
    </VStack>
  )
}

export default Posts