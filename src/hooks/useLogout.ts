import { useEffect, useState } from "react"
import { auth } from "../firebase/config"
import { useAuthContext } from "./useAuthContext"
import { signOut } from "firebase/auth"

export const useLogout = () => {
    const [isCancelled, setIsCanselled] = useState<boolean>(false)
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

            if (!isCancelled) {
                setLoading(false)
                setError(null)
            }

        } catch (err) {
            if (!isCancelled) {
                setError((err as Error).message)
                setLoading(false)
            }
        }
    }

    //cleanup function
    useEffect(() => {
        return () => setIsCanselled(true) //whenever the component unmounts this function will be called
    }, [])


    return { logout, error, loading }
}