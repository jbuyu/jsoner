import { useParams } from "react-router-dom"
import { useFetchPost } from "../hooks"
import { Box, Button, HStack, Heading, Stack, StackDivider, Text, useDisclosure } from "@chakra-ui/react"
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { PostEditModal } from "../components/PostEditModal"

export const Post = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { id } = useParams()
  const fetchedPost = useFetchPost(id)
  const postDetails = fetchedPost?.data?.data

  if (fetchedPost?.isLoading) {
    return (
      <Text>Loading Post....</Text>
    )
  }

  //fns

  return (
    <HStack justifyContent="center" minHeight="100vh" border="1px" >

      <Card maxWidth={"50%"}>
        <CardHeader>
          <Heading size='md'>Post</Heading>
        </CardHeader>

        <CardBody>
          <Stack divider={<StackDivider />} spacing='4'>
            <Box>
              <Heading size='xs' textTransform='uppercase'>
                ID
              </Heading>
              <Text pt='2' fontSize='sm'>
                {postDetails?.id}
              </Text>
            </Box>
            <Box>
              <Heading size='xs' textTransform='uppercase'>
                Title
              </Heading>
              <Text pt='2' fontSize='sm'>
                {postDetails?.title}
              </Text>
            </Box>
            <Box>
              <Heading size='xs' textTransform='uppercase'>
                Body
              </Heading>
              <Text pt='2' fontSize='sm'>
                {postDetails?.body}
              </Text>
            </Box>
          </Stack>
        </CardBody>
        <CardFooter justifyContent="flex-end" >
          <Button onClick={onOpen} variant="outline">Edit</Button>
        </CardFooter>
      </Card>
      <PostEditModal
        onClose={onClose}
        isOpen={isOpen}
        userId={postDetails?.userId}
        id={postDetails?.id}
        title={postDetails?.title}
        body={postDetails?.body}
      />
    </HStack>

  )
}