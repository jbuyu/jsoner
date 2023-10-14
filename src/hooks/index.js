import axios from "axios"
import { useMutation, useQuery, useQueryClient } from "react-query"

export const useFetchPosts = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const response = await axios.get("https://jsonplaceholder.typicode.com/posts")
      return response
    }
  })
}

export const useFetchPost = (id) => {
  return useQuery({
    queryKey: ["post"],
    queryFn: async () => {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
      return response
    }
  })
}

export const useCreatePost = (post) => {
  const queryClient = useQueryClient()
  return useMutation(async (post) => {
    const response = await axios.post(`https://jsonplaceholder.typicode.com/posts`, post)
    return response
  }, {
    onError: (error) => {
      console.log('error', error)
    },
    onSuccess: () => {
      queryClient.invalidateQueries("posts")
    }
  })
}

export const useDeletePost = () => {
  const queryClient = useQueryClient()
  return useMutation(async (id) => {
    const response = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
    return response
  }, {
    onError: (error) => {
      console.log('error', error)
    },
    onSuccess: () => {
      queryClient.invalidateQueries("posts")
    }
  })
}

export const useEditPost = (post) => {
  const queryClient = useQueryClient()
  return useMutation(async (post) => {
    const response = await axios.put(`https://jsonplaceholder.typicode.com/posts/${post?.id}`, post)
    return response
  }, {
    onError: (error) => {
      console.log('error', error)
    },
    onSuccess: () => {
      queryClient.invalidateQueries("posts")
    }
  })
}