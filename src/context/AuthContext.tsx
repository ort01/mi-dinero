import { ReactNode, createContext, useReducer } from "react";
import UserState from "../interfaces/UserState";
import UserAction from "../interfaces/UserAction";

export const AuthContext = createContext({})

const authReducer = (state: UserState, action: UserAction) => {
    switch (action.type) {
        default:
            return state
    }
}

export const AuthContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )s
}