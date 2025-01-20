import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import './index.css'
import { Navigate, createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from './login'
import App from './App'
import SignUp from './SignUp';
import UserInfo from './userInfo'
import Cookies from 'js-cookie'
import Error from './Error'



function login() {
  if (!(!Cookies.get('userInfo') || !Cookies.get('token'))) {
    return <Navigate to="/app"  replace />
  } else {
    return <Navigate to="./login" replace />
  }
}
const router = createBrowserRouter([
  {
    path: "/",
    element: login()
  },
  {
    path: "/login",
    element: <>
    <Login />
  </>
  },
  {
    path: "/App",
    element: <App />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/user-info",
    element: <UserInfo />,
  },
  {
    path: "/error",
    element: <Error />,
  }
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)