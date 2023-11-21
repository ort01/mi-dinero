export default interface TransactionDoc {
    id?: string
    uid?: string | undefined
    name: string
    amount: number | string
}