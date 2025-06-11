import { Link, Outlet } from "react-router";

import './App.css'

function App() {
  return (
    <>
        <nav>
            <Link to="/bartekus.com/">Home</Link>
            {" | "}
            <Link to="/bartekus.com/contact">Contact</Link>
        </nav>

        <Outlet />
    </>
  )
}

export default App
