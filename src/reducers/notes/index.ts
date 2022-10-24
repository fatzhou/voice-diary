import AsyncStorage from '@react-native-community/async-storage';
import {createSlice} from '@reduxjs/toolkit';
import {Note} from '~/api/note';
import type {RootState} from '~/store';

const NoteStorage = 'NoteStorage';

// Define a type for the slice state
interface NotesState {
  notes: Note[];
  loading: boolean;
  initialized: boolean;
}

// Define the initial state using that type
const initialState: NotesState = {
  notes: [],
  loading: false,
  initialized: false,
};

export const notesSlice = createSlice({
  name: 'notes',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    add: (state, data) => {
      const {payload} = data;
      const newState = {
        ...state,
        notes: [payload, ...state.notes],
      };
      try {
        AsyncStorage.setItem(NoteStorage, JSON.stringify(newState.notes));
      } catch (e) {}
      return newState;
    },
    update: (state, data) => {
      const {payload} = data;
      const {id} = payload;
      const index = state.notes.findIndex(note => note.id === id);
      if (index >= 0) {
        const newState = {
          ...state,
          notes: [
            ...state.notes.slice(0, index),
            {
              ...state.notes[index],
              ...payload,
            },
            ...state.notes.slice(index + 1),
          ],
        };
        try {
          AsyncStorage.setItem(NoteStorage, JSON.stringify(newState.notes));
        } catch (e) {}
        return newState;
      }
      return state;
    },
    remove: (state, data) => {
      const {
        payload: {id},
      } = data;
      const index = state.notes.findIndex(note => note.id === id);
      if (index >= 0) {
        const newState = {
          ...state,
          notes: [
            ...state.notes.slice(0, index),
            ...state.notes.slice(index + 1),
          ],
        };
        try {
          AsyncStorage.setItem(NoteStorage, JSON.stringify(newState.notes));
        } catch (e) {}
        return newState;
      }
      return state;
    },
    reset: () => {
      return {
        ...initialState,
      };
    },
  },
});

export const {update} = notesSlice.actions;
export const {reset} = notesSlice.actions;
export const {add} = notesSlice.actions;
export const {remove} = notesSlice.actions;

// \Other code such as selectors can use the imported `RootState` type
export const selectNotes = (state: RootState) => state.notesReducer.notes;

export default notesSlice.reducer;
