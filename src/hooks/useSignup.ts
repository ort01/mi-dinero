import { useEffect, useState } from "react"
import { auth } from "../firebase/config"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { useAuthContext } from "./useAuthContext"




export const useSignup = () => {
    const [isCancelled, setIsCancelled] = useState<boolean>(false)
    const [error, setError] = useState<null | string>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const { dispatch } = useAuthContext()

    const signup = async (email: string, password: string, name: string) => {

        setError(null)
        setLoading(true)

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password)

            if (!res) {
                throw new Error("Could not complete signup")
            }

            //add display name to user
            await updateProfile(res.user, {
                displayName: name
            })

            //dispatch login action
            dispatch({ type: "LOGIN", payload: res.user })

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

    //cleanup function; when updating the local state (error, loading) in async function
    // if the component that uses useSignup(async) unmountes while waiting for response the state which is used in that components cant be changed
    // therefore we only change the state while the components is mounted (while isCancelled is false)
    useEffect(() => {
        setIsCancelled(false)
        return () => setIsCancelled(true) //whenever the component unmounts this return function will be called
    }, [])

    return { signup, error, loading }
}


