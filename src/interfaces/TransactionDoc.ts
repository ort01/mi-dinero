export default interface TransactionDoc {
    id?: string | undefined
    uid?: string | undefined
    name: string
    amount: number | string
}