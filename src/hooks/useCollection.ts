import { useEffect, useState } from "react"
import { db } from "../firebase/config"
import { collection, onSnapshot } from "firebase/firestore"
import TransactionDoc from "../interfaces/TransactionDoc"

//--------------------- subscribing to a real time data from a firestore collection --------------------

export const useCollection = (colName: string) => {
    const [documents, setDocuments] = useState<TransactionDoc[] | null>(null)
    const [error, setError] = useState<null | string>(null)

    useEffect(() => {
        const colRef = collection(db, colName)

        const unsub = onSnapshot(colRef, (snapshot) => {

            if (!snapshot.empty) {
                const results: TransactionDoc[] = []

                const res = snapshot.docs // storing data from the snapshot; getting array of documents that are on the snapshot of collection
                console.log(res);

                res.forEach((doc) => {
                    results.push({ id: doc.id, ...doc.data() } as TransactionDoc)
                })
                setDocuments(results)
                setError(null)

            } else {
                setError("Could now fetch data")
            }

        }, (err) => {
            console.log(err);
            setError("Could not fetch data")
        })

        return () => unsub() //cleanup function - stops listening for snapshots events and stop updating the state

    }, [colName])

    return { documents, error }
}