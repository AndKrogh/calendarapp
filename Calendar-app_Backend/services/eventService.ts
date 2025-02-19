import firestoreDB from "../config/firestore";
import { collection, getDocs, doc, deleteDoc, updateDoc, addDoc } from "firebase/firestore";

interface Event {
    id?: string;
    name: string;
    date: string;
}

const getAllEvents = async ():Promise<Event[]> => {
    const collectionRef = collection(firestoreDB, "events");
    const docSnap = await getDocs(collectionRef);
    return docSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Event));
};

const addEvent = async (name: string, date: string): Promise<Event> => {
    const collectionRef = collection(firestoreDB, "events");
    const docRef = await addDoc(collectionRef, { name, date });
    return { id: docRef.id, name, date } as Event;
};

const deleteEvent = async (id: string): Promise<void> => {
    const eventDoc = doc(firestoreDB, "events", id);
    await deleteDoc(eventDoc);
};

const updateEvent = async (id: string, updatedData: Partial<Event>): Promise<void> => {
    const eventDoc = doc(firestoreDB, "events", id);
    await updateDoc(eventDoc, updatedData);
};

export default {
    getAllEvents,
    addEvent,
    deleteEvent,
    updateEvent
};
