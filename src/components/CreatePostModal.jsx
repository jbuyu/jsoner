import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  HStack,
  Textarea,
  useToast
} from '@chakra-ui/react'

import {
  FormControl,
  FormLabel,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { useCreatePost } from '../hooks'





export const CreatePostModal = ({ isOpen, onClose }) => {
  const toast = useToast()
  const createPostMutation = useCreatePost({});
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = post => {
    createPostMutation?.mutate(post)

    if (createPostMutation?.isSuccess) {
      toast({
        title: "Post Created!",
        description: "Post Successfully Created!",
        status: "success",
        position: "top-right"
      })
    }
    if (createPostMutation?.isError) {
      toast({
        title: "Error!",
        description: "An error occurred",
        status: "error",
        position: "top-right"
      })
    }
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input
                  isRequired
                  {...register("title")}
                  type='text'
                />
              </FormControl>
              <FormControl>
                <FormLabel>Body</FormLabel>
                <Textarea
                  isRequired
                  {...register("body")}
                // type='text'
                />
              </FormControl>
              <HStack justifyContent="flex-end" marginTop={4} >
                <Button isDisabled={createPostMutation?.isLoading} size="sm" variant='outline' onClick={onClose} mr={2} >
                  Cancel
                </Button>
                <Button isLoading={createPostMutation?.isLoading} type='submit' size="sm" px={4} colorScheme='green'>
                  Create
                </Button>
              </HStack>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}