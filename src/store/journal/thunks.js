import { collection, deleteDoc, doc, setDoc } from "firebase/firestore";
import { FirebaseDB } from "../../firebase/config";
import { addNewEmptyNote, deleteNoteById, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from "./journalSlice";
import { loadNotes } from './../../helpers/loadNotes';
import { fileUpload } from "../../helpers/fileUpload";

export const startNewNote = () => {
  return async( dispatch, getState ) => {
    
    try{

      dispatch( setSaving() );
  
      const { uid } = getState().auth;
  
      const newNote = {
        title: '',
        body: '',
        date: new Date().getTime(),
      }
      
      const newDoc = doc( collection( FirebaseDB, `id-user-${uid}/journal/notes` ) );
      await setDoc( newDoc, newNote);
      newNote.id = newDoc.id;
      
      dispatch( addNewEmptyNote( newNote ))
      dispatch( setActiveNote(   newNote ))
    } 
    catch( error ) {
      return {
        ok: false,
        errorMessage: error.message
       }
    }
  }
}

export const startLoadingNotes = () => {
  return async( dispatch, getState ) => {

    const { uid } = getState().auth;
    if(!uid) throw new Error(`Error, UID not found`);
    const notes = await loadNotes(uid);
    dispatch( setNotes( notes ) );

  }
}

export const StartSavingNote = () => {
  return async( dispatch, getState ) => {

    dispatch( setSaving() )
    const { uid } = getState().auth;
    const { active:note } = getState().journal;
    
    const noteToFireStore = { ...note };
    delete noteToFireStore.id;

    const docRef = doc( FirebaseDB, `id-user-${ uid }/journal/notes/${ note.id }`);
    await setDoc(docRef, noteToFireStore, { merge: true})
    dispatch( updateNote( note ))

  }
}

export const startUploadingFiles = ( files = [] ) => {
  return async(dispatch) => {
    dispatch( setSaving() );
    
    const fileUploadPromises = [];
    for ( const file of files ) {
      fileUploadPromises.push( fileUpload( file ) )
  }
    const photosUrls = await Promise.all( fileUploadPromises );
    
    dispatch( setPhotosToActiveNote(photosUrls) );

  }
}

export const startDeletingNote = () => {
  return async( dispatch, getState ) => {
    
    const { uid } = getState().auth;
    const { active: note } = getState().journal;

    const docRef = doc(FirebaseDB, `id-user-${uid}/journal/notes/${ note.id }`);
    await deleteDoc(docRef)

    dispatch( deleteNoteById(note.id) );
  }
}