import { useReducer, useState, useEffect } from "react"
//firebase
import { db, timestamp } from "../firebase/config"
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore"
//ts
import FirestoreAction from "../interfaces/Action"
import TransactionDoc from "../interfaces/TransactionDoc"
import DocState from "../interfaces/DocState"


const initialState = {
    document: undefined,
    error: undefined,
    loading: false,
    success: undefined
}

const firestoreReducer = (state: DocState, action: FirestoreAction) => {
    switch (action.type) {
        case 'LOADING':
            return { ...state, document: undefined, loading: true, error: undefined, success: false } as DocState
        case 'ERROR':
            return { ...state, document: undefined, loading: false, error: action.error?.message, success: false } as DocState
        case 'ADD_DOC':
            return { ...state, document: action.payload, loading: false, error: undefined, success: true } as DocState
        case 'DELETE_DOC':
            return { ...state, loading: false, error: undefined, success: true } as DocState
        default:
            return state
    }
}

// -------------------- updating, adding, deleteing documents in a collection----------------

export const useFirestore = (colName: string) => {
    const [cancelled, setCancelled] = useState<boolean>(false)
    const [firestoreState, dispatch] = useReducer(firestoreReducer, initialState)

    //-----collection reference------
    const colRef = collection(db, colName)
    //-------------------------------

    //----dispatch if not cancelled------
    const dispatchIfNotCancelled = (actionObject: FirestoreAction) => {
        if (!cancelled) {
            dispatch(actionObject)
        }
    }
    //------------------------------------


    //add document to collection
    const addDocument = async (doc: TransactionDoc) => {
        dispatch({ type: 'LOADING' })

        try {
            const createdAt = timestamp() //creating a timestamp

            const addedDoc = await addDoc(colRef, { ...doc, createdAt })
            dispatchIfNotCancelled({ type: 'ADD_DOC', payload: addedDoc })

        } catch (err) {
            dispatchIfNotCancelled({ type: 'ERROR', error: (err as Error) })
        }

    }

    //delete document from collection
    const deleteDocument = async (docId: string) => {
        dispatch({ type: 'LOADING' })

        try {

            const docRef = doc(db, colName, docId)
            await deleteDoc(docRef)
            dispatchIfNotCancelled({ type: "DELETE_DOC" })

        } catch (err) {
            dispatchIfNotCancelled({ type: 'ERROR', error: (err as Error) })
        }
    }

    // cleanup function
    useEffect(() => {
        setCancelled(false)
        return () => { setCancelled(true) }
    }, [])


    return { addDocument, deleteDocument, firestoreState }
}