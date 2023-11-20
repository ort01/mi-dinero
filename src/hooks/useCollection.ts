import { useEffect, useRef, useState } from "react"
import { db } from "../firebase/config"
import { Query, collection, onSnapshot, query, where, orderBy, OrderByDirection } from "firebase/firestore"
import TransactionDoc from "../interfaces/TransactionDoc"
import { WhereFilterOp } from "firebase/firestore"

//--------------------- subscribing to a real time data from a firestore collection --------------------

export const useCollection = (colName: string, _query?: [string, WhereFilterOp, unknown?], _orderBy?: [string, OrderByDirection]) => {
    const [documents, setDocuments] = useState<TransactionDoc[] | null>(null)
    const [error, setError] = useState<null | string>(null)

    const queryRef = useRef(_query).current //if we dont use a ref -> infitine loop in useEffect; _query is an array and is "different" on every function call
    const orderByRef = useRef(_orderBy).current

    useEffect(() => {
        let colRef: Query = collection(db, colName)

        if (queryRef) {
            colRef = query(colRef, where(...queryRef))
        }

        if (orderByRef) {
            colRef = query(colRef, orderBy(...orderByRef))
        }

        const unsub = onSnapshot(colRef, (snapshot) => {

            if (!snapshot.empty) {
                const results: TransactionDoc[] = []

                const res = snapshot.docs // storing data from the snapshot; getting array of documents that are on the snapshot of collection

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

    }, [colName, queryRef, orderByRef])

    return { documents, error }
}