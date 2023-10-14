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
import { useEditPost } from '../hooks'



export const PostEditModal = ({ isOpen, onClose, id, userId, title, body }) => {
  const toast = useToast()
  const editPostMutation = useEditPost({});
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => {
    const post = {
      id,
      userId,
      ...data
    }
    // console.log('payload', payload)
    editPostMutation?.mutate(post)

    if (editPostMutation?.isSuccess) {
      toast({
        title: "Post Edited!",
        description: "Post Successfully Edited!",
        status: "success",
        position: "top-right"
      })
    }
    if (editPostMutation?.isError) {
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
                  defaultValue={title}
                  {...register("title")}
                  type='text'
                />
              </FormControl>
              <FormControl>
                <FormLabel>Body</FormLabel>
                <Textarea
                  defaultValue={body}
                  isRequired
                  {...register("body")}
                // type='text'
                />
              </FormControl>
              <HStack justifyContent="flex-end" marginTop={4} >
                <Button isDisabled={editPostMutation?.isLoading} size="sm" variant='outline' onClick={onClose} mr={2} >
                  Cancel
                </Button>
                <Button isLoading={editPostMutation?.isLoading} type='submit' size="sm" px={4} colorScheme='green'>
                  Edit
                </Button>
              </HStack>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}