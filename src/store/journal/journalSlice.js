import { createSlice } from '@reduxjs/toolkit'

export const journalSlice = createSlice({
    name: 'name',
    initialState: {
      isSaving: false,
      messageSaved: '',
      notes: [],
      active: null,
      // active: {
      //   id: '',
      //   title: '',
      //   body: '',
      //   date: '',
      //   imageUrls: [], // https://foto1.jpg, 
      // }
    },
    reducers: {
      addNewEmptyNote: (state, action ) => { 
        state.notes.push( action.payload );
        state.isSaving = false;
      },
      setActiveNote: (state, action ) => {
        state.active = action.payload;
        state.messageSaved = '';
      },
      setNotes: (state, action ) => {
        state.notes = action.payload;
      },
      setSaving: ( state) => {
        state.isSaving = true;
        state.messageSaved = '';
      },
      updateNote: (state, action) => {
        state.isSaving = false;
        state.notes = state.notes.map((note) => {
          return (note.id == action.payload.id) ? action.payload : note;
        })
        
        state.messageSaved = `La nota '${action.payload.title}' ha sido actualizada correctamente`
      },
      deleteNoteById: (state, action ) => {
        state.active = null;
        const index = state.notes.findIndex(note => note.id === action.payload);
        state.notes.splice(index, 1);
      },
      clearNotesLogout: (state) => {
        state.isSaving = false;
        state.messageSaved = '';
        state.notes = [];
        state.active = null;
      },
      setPhotosToActiveNote: (state, action) => {
        if( state.active.imageUrls ){
          state.active.imageUrls = [ ...state.active.imageUrls, ...action.payload ];
        } else {
          state.active.imageUrls = [ ...action.payload ];
        }
        state.isSaving = false;
      }
  }
})

export const { 
  addNewEmptyNote,
  clearNotesLogout,
  deleteNoteById,
  setActiveNote,
  setNotes,
  setPhotosToActiveNote,
  setSaving,
  updateNote, 
} = journalSlice.actions; 

