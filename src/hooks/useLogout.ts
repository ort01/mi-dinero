import { useState } from "react"
import { auth } from "../firebase/config"
import { useAuthContext } from "./useAuthContext"
import { signOut } from "firebase/auth"

export const useLogout = () => {
    const [error, setError] = useState<null | string>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const { dispatch } = useAuthContext()


    const logout = async () => {
        setError(null)
        setLoading(true)


        try {
            //sign user out
            await signOut(auth)
            // dispatch logout action
            dispatch({ type: "LOGOUT", payload: null })

            setLoading(false)
            setError(null)

        } catch (err) {
            setError((err as Error).message)
            setLoading(false)
        }
    }




    return { logout, error, loading }
}