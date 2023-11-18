import { useState } from "react"
import { auth } from "../firebase/config"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { useAuthContext } from "./useAuthContext"




export const useSignup = () => {

    const [error, setError] = useState<null | string>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const { dispatch } = useAuthContext()

    const signup = async (email: string, password: string, name: string) => {

        setError(null)
        setLoading(true)

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password)
            console.log(res);


            if (!res) {
                throw new Error("Could not complete signup")
            }

            //add display name to user
            await updateProfile(res.user, {
                displayName: name
            })

            //dispatch login action
            dispatch({ type: "LOGIN", payload: res.user })

            setLoading(false)
            setError(null)


        } catch (err) {
            console.log((err as Error).message);
            setError((err as Error).message)
            setLoading(false)
        }

    }

    return { signup, error, loading }
}


