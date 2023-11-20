import TransactionDoc from "./TransactionDoc"

export default interface DocState {
    document?: null | TransactionDoc,
    error?: null | Error,
    loading: boolean,
    success?: null | boolean
}