import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, createBrowserRouter, Route, RouterProvider } from 'react-router-dom'
import Insertvalo from './page/Insertvalo.tsx'
import Login from './page/Login.tsx'

const router = createBrowserRouter([
  { path: "/", element: <Insertvalo /> },
  { path: "/login", element: <Login /> },
])


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
