import { Outlet } from "react-router-dom"
import Navbar from "./components/Navbar/Navbar"
import axios from "axios"

import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useEffect } from "react"
import { restoreUser } from "./store/userSlice"
import { useDispatch } from "react-redux"

axios.defaults.baseURL = "http://localhost:4000/api"

axios.interceptors.request.use((config) => {
    if (localStorage.hasOwnProperty("sm_token")) {
        config.headers.authorization = localStorage.getItem("sm_token")
    }
    return config
})

function AppLayout() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(restoreUser(JSON.parse(localStorage.getItem("sm_user"))))
    }, [])

    return (
        <div className="container mx-auto">
            <Navbar />
            <Outlet />
            <ToastContainer />
        </div>
    )
}

export default AppLayout
