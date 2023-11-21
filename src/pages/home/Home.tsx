import styles from "./Home.module.scss"
//components
import TransactionForm from "../../components/TransactionForm"
import TransactionList from "../../components/TransactionList"
//hooks
import { useAuthContext } from "../../hooks/useAuthContext"
import { useCollection } from "../../hooks/useCollection"


export default function Home() {

    const { user } = useAuthContext()
    const { documents, error } = useCollection(
        'transactions',
        ["uid", "==", user?.uid],
        ["createdAt", "desc"]
    )


    const sum = () => {
        const pricesArray = documents?.map((document) => Number(document.amount))

        const sum = pricesArray?.reduce((accumulator, value) => {
            return (accumulator + value);
        }, 0);

        return sum
    }



    return (
        <>
            <div className={styles["home"]}>
                <div className={styles["home__content"]}>
                    {documents &&
                        <div className={styles["home__content--sum"]}>
                            <p>Total expenses:</p>
                            <span>{sum()} €</span>
                        </div>
                    }
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
