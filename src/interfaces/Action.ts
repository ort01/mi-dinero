// import UserObject from "./UserObject"

export default interface Action {
    type: string,
    payload?: object | null
    error?: Error | null

}