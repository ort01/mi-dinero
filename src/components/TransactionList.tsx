import TransactionDoc from "../interfaces/TransactionDoc"
import styles from "./TransactionList.module.scss"
import { useFirestore } from "../hooks/useFirestore"
import deleteIcon from "../assets/delete.svg"

export default function TransactionList({ documents }: { documents: TransactionDoc[] }) {

    const { deleteDocument } = useFirestore("transactions")


    return (
        <>
            <ul className={styles["transaction-list"]}>
                {documents.map((transaction) => (
                    <li key={transaction.id}>
                        <p className={styles["transaction-list__name"]}>{transaction.name}</p>
                        <p className={styles["transaction-list__amount"]}>{transaction.amount} €</p>
                        <button className={styles["transaction-list__delete-btn"]} onClick={() => deleteDocument(transaction.id as string)}>
                            <img src={deleteIcon} alt="delete-icon" />
                        </button>
                    </li>
                ))}
            </ul>
        </>
    )
}
