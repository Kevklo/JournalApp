import { collection, getDocs } from "firebase/firestore";
import { FirebaseDB } from "../firebase/config";

export const loadNotes = async ( uid = '' ) => {
  if( !uid ) throw new Error('Error, UID not found');

  const collectionRef = collection( FirebaseDB, `id-user-${uid}/journal/notes` )
  const docs = await getDocs( collectionRef )

  const notes = []

  docs.forEach(doc => {
    notes.push({ id: doc.id, ...doc.data() });
  });

  return notes;
} 