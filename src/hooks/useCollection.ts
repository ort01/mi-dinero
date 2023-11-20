import { useEffect, useState } from "react"
import { db } from "../firebase/config"
import { collection, onSnapshot } from "firebase/firestore"

//--------------------- subscribing to a real time data from a firestore collection --------------------

export const useCollection = (colName: string) => {
    const [documents, setDocuments] = useState<object[] | null>(null)
    const [error, setError] = useState<Error | null | string>(null)

    useEffect(() => {
        const colRef = collection(db, colName)

        const unsub = onSnapshot(colRef, (snapshot) => {

            if (!snapshot.empty) {
                const results: object[] = []

                const res = snapshot.docs // storing data from the snapshot; getting array of documents that are on the snapshot of collection
                console.log(res);

                res.forEach((doc) => {
                    results.push({ id: doc.id, ...doc.data() })
                })
                setDocuments(results)
                setError(null)

            } else {
                setError("No recipes to load")
            }

        }, (err) => {
            console.log(err);
            setError(err.message)
        })

        return () => unsub() //cleanup function - stops listening for snapshots events and stop updating the state

    }, [colName])

    return { documents, error }
}