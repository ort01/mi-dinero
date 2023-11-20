import TransactionDoc from "../interfaces/TransactionDoc"
import styles from "./TransactionList.module.scss"

export default function TransactionList({ documents }: { documents: TransactionDoc[] }) {
    return (
        <>
            <ul className={styles["transaction-list"]}>
                {documents.map((transaction) => (
                    <li key={transaction.id}>
                        <p className={styles["transaction-list__name"]}>{transaction.name}</p>
                        <p className={styles["transaction-list__amount"]}>{transaction.amount}$</p>
                    </li>
                ))}
            </ul>
        </>
    )
}
