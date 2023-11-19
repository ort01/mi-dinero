import { ReactNode, createContext, useEffect, useReducer } from "react";

//firebase
import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";

//interfaces
import UserState from "../interfaces/UserState";
import UserAction from "../interfaces/UserAction";
import UserObject from "../interfaces/UserObject";


//context
export const AuthContext = createContext<{ user: UserObject | null, authReady: boolean, dispatch: React.Dispatch<UserAction> }>({

    user: null,
    authReady: false,

    dispatch: (action: UserAction) => {
        console.log(`Not implemented dispatch for: ${action}`)
    },
})

//reducer for dispatch
const authReducer = (state: UserState, action: UserAction) => {
    switch (action.type) {
        case "AUTH_READY":
            return { ...state, user: action.payload, authReady: true } as UserState
        case "LOGIN":
            return { ...state, user: action.payload } as UserState
        case "LOGOUT":
            return { ...state, user: action.payload } as UserState
        default:
            return state
    }
}




//context provider; its used in main.tsx
export const AuthContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        authReady: false
    })
    // console.log("auth context state:", state);

    useEffect(() => { //checks if the user is logged in when you first load the page; after that we stop listening for "onAuthStateChanged" by calling unsub()
        const unsub = onAuthStateChanged(auth, (user) => { //we get the user object in callback
            dispatch({ type: "AUTH_READY", payload: user })
            unsub()
        })

    }, [])




    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}