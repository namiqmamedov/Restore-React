import { Fragment } from 'react'
import ReactDOM from 'react-dom/client'
import App from '../src/App'
import '../src/index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Provider } from 'react-redux';
import { store } from './store/configureStore';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export const router = createBrowserRouter([
  // match everything with "*"
  { path: "*", element: <App /> }
])


ReactDOM.createRoot(document.getElementById('root')!).render(
  <Fragment>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
  </Fragment>,
)
