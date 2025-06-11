import {
    createBrowserRouter,
    RouterProvider,
} from "react-router";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import App from './App.tsx'
import { Home } from "./pages/home.tsx";
import { Contact } from "./pages/contact.tsx";

const router = createBrowserRouter([
    {
        path: "/bartekus.com",
        element: <App />,
        children: [
            {
                path: "/bartekus.com",
                element: <Home />,
            },
            {
                path: "/bartekus.com/contact",
                element: <Contact />,
            },
        ],
    },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <RouterProvider router={router} />
  </StrictMode>,
)
