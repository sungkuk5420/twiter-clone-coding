import {createBrowserRouter,RouterProvider} from "react-router-dom" 
import Home from "./router/home"
import Profile from "./router/profile"
import Layout from "./components/layout"
import Login from "./router/login"
import CreateAccount from "./router/create-account"
import { createGlobalStyle } from "styled-components"
import reset from "styled-reset"

const router = createBrowserRouter ([
  {
    path : "/",
    element:<Layout/>,
    children : [
      {
        path : "",
        element: <Home/>,
      },
      {
        path : "profile",
        element: <Profile/>,
      }
    ]
  },
  {
    path: "/login",
    element:<Login/>
  },
  {
    path: "/create-account",
    element:<CreateAccount/>
  },
])

const GlobalStyles = createGlobalStyle`
  ${reset};
  *{
    box-sizing : border-box;
  }
  body{
    background-color: black;
    color: white;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
  }
`

function App() {
  return (
    <>
    <GlobalStyles/>
    <RouterProvider router={router}/>
     </>
  )
}

export default App
