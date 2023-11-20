import styles from "./Home.module.scss"
//components
import TransactionForm from "../../components/TransactionForm"
import TransactionList from "../../components/TransactionList"
//hooks
import { useAuthContext } from "../../hooks/useAuthContext"
import { useCollection } from "../../hooks/useCollection"

export default function Home() {

    const { user } = useAuthContext()
    const { documents, error } = useCollection('transactions')

    return (
        <>
            <div className={styles["home"]}>
                <div className={styles["home__content"]}>
                    {error && <div>{error}</div>}
                    {documents && <TransactionList documents={documents} />}
                </div>
                <div className={styles["home__sidebar"]}>
                    {user && <TransactionForm uid={user.uid} />}
                </div>
            </div>

        </>
    )
}
