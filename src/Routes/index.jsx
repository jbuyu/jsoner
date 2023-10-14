import { createBrowserRouter } from "react-router-dom";
import { Post } from "../container/Post";
import { App } from "../App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/post/:id",
    element: <Post />
  }

])

export default router;