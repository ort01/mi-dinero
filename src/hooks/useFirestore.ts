import { useReducer, useState, useEffect } from "react"
//firebase
import { db, timestamp } from "../firebase/config"
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore"
//ts
import FirestoreAction from "../interfaces/Action"
import TransactionDoc from "../interfaces/TransactionDoc"
import DocState from "../interfaces/DocState"


const initialState = {
    document: null,
    error: null,
    loading: false,
    success: null
}

const firestoreReducer = (state: DocState, action: FirestoreAction) => {
    switch (action.type) {
        case 'LOADING':
            return { ...state, document: null, loading: true, error: null, success: false } as DocState
        case 'ERROR':
            return { ...state, document: null, loading: false, error: action.error?.message, success: false } as DocState
        case 'ADD_DOC':
            return { ...state, document: action.payload, loading: false, error: null, success: true } as DocState
        default:
            return state
    }
}


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
            const createdAt = timestamp()
            console.log(createdAt);

            const addedDoc = await addDoc(colRef, { ...doc, createdAt })
            dispatchIfNotCancelled({ type: 'ADD_DOC', payload: addedDoc })

        } catch (err) {
            dispatchIfNotCancelled({ type: 'ERROR', error: (err as Error) })
        }

    }



    //delete document from collection
    const deleteDocument = async (docId: string) => {
        dispatch({ type: 'LOADING' })

        const docRef = doc(db, colName, docId)
        await deleteDoc(docRef)
    }

    useEffect(() => {
        setCancelled(false)
        return () => { setCancelled(true) }
    }, [])


    return { addDocument, deleteDocument, firestoreState }
}