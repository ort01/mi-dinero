import { useEffect, useState } from "react"
import { auth } from "../firebase/config"
import { useAuthContext } from "./useAuthContext"
import { signInWithEmailAndPassword } from "firebase/auth"

export const useLogin = () => {
    const [isCancelled, setIsCancelled] = useState<boolean>(false)
    const [error, setError] = useState<null | string>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const { dispatch } = useAuthContext()

    const login = async (email: string, password: string) => {
        setError(null)
        setLoading(true)

        try {
            const res = await signInWithEmailAndPassword(auth, email, password)

            dispatch({ type: "LOGIN", payload: res.user })

            if (!isCancelled) {
                setError(null)
                setLoading(false)
            }
        }
        catch (err) {
            if (!isCancelled) {
                setError((err as Error).message)
                setLoading(false)
            }
        }

    }

    useEffect(() => {
        setIsCancelled(false)
        return () => setIsCancelled(true)
    }, [])

    return { login, error, loading }

}