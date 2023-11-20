import React, { useEffect, useState } from 'react'
import styles from "./TransactionForm.module.scss"
import { useFirestore } from '../hooks/useFirestore'



export default function TransactionForm({ uid }: { uid: string | undefined }) {
    const [name, setName] = useState<string>("")
    const [amount, setAmount] = useState<string>("")
    // const [transaction, setTransaction] = useState<boolean>(false)

    //hooks
    const { addDocument, firestoreState } = useFirestore('transactions')


    //functions
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        addDocument({
            uid,
            name,
            amount
        });
    }

    //reset the form fields; cant be in handle submit bc it wouldnt wait for addDocument function to finish
    useEffect(() => {
        if (firestoreState.success) {
            setName('')
            setAmount('')
        }
    }, [firestoreState])




    // style={{ borderRadius: transaction ? "15px 15px 0px 0px" : "15px" }}
    return (
        <div className={styles['transaction-form']}>
            <h3 >Add Transaction</h3>

            <form onSubmit={handleSubmit}>
                <label>
                    <span>Name</span>
                    <input
                        type="text"
                        required
                        onChange={(e) => { setName(e.target.value) }}
                        value={name}
                    />
                </label>
                <label>
                    <span>Amount</span>
                    <input
                        type="number"
                        required
                        onChange={(e) => { setAmount(e.target.value) }}
                        value={amount}
                    />
                </label>
                <button>+</button>
            </form>
        </div>
    )
}
