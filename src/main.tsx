import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '../src/App'
import '../src/index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
// import { BrowserRouter as Router } from 'react-router-dom';

import { createBrowserRouter, RouterProvider } from "react-router-dom"

export const router = createBrowserRouter([
  // match everything with "*"
  { path: "*", element: <App /> }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>,
)
