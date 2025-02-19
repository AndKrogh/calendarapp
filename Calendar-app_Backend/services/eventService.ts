const { firestoreDB } = require("../config/firestore");
const { collection, getDocs, doc, deleteDoc, updateDoc, addDoc } = require("firebase/firestore");

const getAllEvents = async () => {
    const collectionRef = collection(firestoreDB, "events");
    const docSnap = await getDocs(collectionRef);
    return docSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

const addEvent = async (name, date) => {
    const collectionRef = collection(firestoreDB, "events");
    const docRef = await addDoc(collectionRef, { name, date });
    return { id: docRef.id, name, date };
};

const deleteEvent = async (id) => {
    const eventDoc = doc(firestoreDB, "events", id);
    await deleteDoc(eventDoc);
};

const updateEvent = async (id, updatedData) => {
    const eventDoc = doc(firestoreDB, "events", id);
    await updateDoc(eventDoc, updatedData);
};

module.exports = {
    getAllEvents,
    addEvent,
    deleteEvent,
    updateEvent
};
