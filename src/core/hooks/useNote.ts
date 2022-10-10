import {useCallback, useState} from 'react';
import {getData, storeData} from '../../utils/native';
import {NotesStore} from '../const';

export enum NoteType {
  Text = 1,
  Voice = 2,
}

export interface Note {
  type: NoteType;
  id: number;
  title: string;
  content: string;
  contentHtml: string;
  createTime: number;
  audio?: {
    url: string;
    duration: number;
  };
}

const useNote = () => {
  const [status, setStatus] = useState({
    initialized: false,
    loading: false,
  });
  const [notes, setNotes] = useState<Note[]>([]);

  const getNotes = useCallback(async () => {
    setStatus(prev => ({
      ...prev,
      loading: true,
    }));
    const newNotes = await getData(NotesStore, true);
    console.log('开始获取notes....');
    if (newNotes) {
      setNotes(newNotes);
    }
    setStatus(prev => ({
      ...prev,
      loading: false,
      initialized: true,
    }));
  }, []);

  const shareNote = useCallback(() => {}, []);

  const saveNote = useCallback(
    (payload: Note) => {
      try {
        const {id, ...rest} = payload;
        const index = notes.findIndex(data => data.id === id);
        let newNotes;
        if (index >= 0) {
          newNotes = [
            ...notes.slice(0, index),
            {
              ...notes[index],
              ...rest,
            },
            ...notes.slice(index + 1),
          ];
        } else {
          newNotes = [{...payload}, ...notes];
        }
        setNotes(newNotes);
        storeData(NotesStore, JSON.stringify(newNotes));
      } catch (e) {
        console.log('saveNote怎么catch了呢', e.message);
      }
    },
    [notes],
  );

  const removeNote = useCallback(
    (id: number) => {
      const index = notes.findIndex(data => data.id === id);
      if (index >= 0) {
        const newNotes = notes.splice(index);
        setNotes(newNotes);
        storeData(NotesStore, JSON.stringify(newNotes));
      }
    },
    [notes],
  );

  return {
    notes,
    status,
    getNotes,
    saveNote,
    shareNote,
    removeNote,
  };
};

export default useNote;
