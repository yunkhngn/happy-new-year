import {
    collection,
    addDoc,
    onSnapshot,
    query,
    orderBy,
    serverTimestamp,
    type Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';

export interface Wish {
    id: string;
    name: string;
    message: string;
    createdAt: Timestamp | null;
}

const wishesCollection = collection(db, 'wishes');

export function subscribeToWishes(callback: (wishes: Wish[]) => void) {
    const q = query(wishesCollection, orderBy('createdAt', 'desc'));

    return onSnapshot(q, (snapshot) => {
        const wishes: Wish[] = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as Wish[];
        callback(wishes);
    });
}

export async function addWish(name: string, message: string) {
    await addDoc(wishesCollection, {
        name,
        message,
        createdAt: serverTimestamp(),
    });
}
