import { useDeletePost } from "../hooks"
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  Text,
  useToast,
} from '@chakra-ui/react'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react'
import { useNavigate } from "react-router-dom"

export const PostsTable = ({ allPosts }) => {
  const toast = useToast()
  const navigate = useNavigate()
  const deletePostMutation = useDeletePost()

  //fns
  const deletePost = (id) => {
    deletePostMutation.mutate(id)
    if (deletePostMutation?.isSuccess) {
      toast({
        title: "Post Deleted!",
        description: "Post Successfully Deleted!",
        status: "success",
        position: "top-right"
      })
    }
    if (deletePostMutation?.isError) {
      toast({
        title: "Error!",
        description: "An error occurred",
        status: "error",
        position: "top-right"
      })
    }
  }
  const viewPost = (id) => {
    console.log('view')
    navigate(`/post/${id}`)
  }

  return (
    <TableContainer>
      <Table variant='simple' size={"md"}>
        <TableCaption>Imperial to metric conversion factors</TableCaption>
        <Thead>
          <Tr>
            {/* <Th>ID</Th> */}
            <Th>TITLE</Th>
            <Th>BODY</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {
            allPosts?.data?.data?.map((post) => (
              <Tr key={post?.id} >
                {/* <Td>{post?.id}</Td> */}
                <Td>
                  <Text whiteSpace={"normal"} maxWidth={"400px"} >
                    {post?.title}
                  </Text>
                </Td>
                <Td isTruncated>
                  <Text whiteSpace={"normal"} maxWidth={"500px"} >
                    {post?.body}
                  </Text>
                </Td>
                <Td>
                  <Menu>
                    <MenuButton as={Button}>
                      Actions
                    </MenuButton>
                    <MenuList>
                      <MenuItem onClick={() => deletePost(post?.id)}>Delete</MenuItem>
                      <MenuItem onClick={() => viewPost(post?.id)}>View</MenuItem>
                    </MenuList>
                  </Menu>
                </Td>
              </Tr>
            ))
          }
        </Tbody>
      </Table>
    </TableContainer>
  )
}