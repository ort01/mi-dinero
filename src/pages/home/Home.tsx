import styles from "./Home.module.scss"
//components
import TransactionForm from "../../components/TransactionForm"
import { useAuthContext } from "../../hooks/useAuthContext"

export default function Home() {

    const { user } = useAuthContext()

    return (
        <>
            <div className={styles["home"]}>
                <div className={styles["home__content"]}>
                    transactionlist
                </div>
                <div className={styles["home__sidebar"]}>
                    <TransactionForm uid={user?.uid} />
                </div>
            </div>

        </>
    )
}
