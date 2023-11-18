import UserObject from "./UserObject";

export default interface UserState {
    user: null | UserObject;
    authReady: boolean;
}