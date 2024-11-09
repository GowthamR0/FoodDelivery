import { useContext } from "react"
import { LoginContext } from "../Context/Context"
import { Outlet } from "react-router-dom"

export default function PrivateRoute() {
    const { user } = useContext(LoginContext)
    return (
        user ? <Outlet /> : <Navigate to="/signin" />
    )
}
