import { ReactNode, createContext, useReducer } from "react";
import UserState from "../interfaces/UserState";
import UserAction from "../interfaces/UserAction";
import UserObject from "../interfaces/UserObject";



export const AuthContext = createContext<{ dispatch: React.Dispatch<UserAction>, user: UserObject | null }>({
    dispatch: (action: UserAction) => {
        console.log(`Not implemented dispatch for: ${action}`)
    },
    user: null
})

const authReducer = (state: UserState, action: UserAction) => {
    switch (action.type) {
        case "LOGIN":
            return { ...state, user: action.payload } as UserState
        case "LOGOUT":
            return { ...state, user: action.payload } as UserState
        default:
            return state
    }
}

export const AuthContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })
    console.log("auth context state:", state);




    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}