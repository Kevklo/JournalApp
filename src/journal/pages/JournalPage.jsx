import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconButton } from "@mui/material";
import { AddOutlined } from "@mui/icons-material";
import { startNewNote } from "../../store/journal/thunks";
import { JournalLayout } from "../layout/JournalLayout"
import { NothingSelectedView, NoteView} from './../views'


export const JournalPage = () => {

  const { isSaving: saving, active } = useSelector(state => state.journal);
  const isSaving = useMemo(() => saving, [ saving ]);
  const nothingSelected = useMemo(() => active == null, [ active ])

  const dispatch = useDispatch(); 
  
  const onClickNewNote = () => {
    dispatch( startNewNote() );
  }

  return (
    <JournalLayout>
      
      {
        nothingSelected ? <NothingSelectedView/>
        : <NoteView/>
      }
      <IconButton
        disabled={ isSaving }
        onClick={ onClickNewNote }
        size="large"
        sx={{
          color: 'white',
          backgroundColor: 'tertiary.main',
          ':hover': {backgroundColor: 'tertiary.main', opacity: 0.9},
          position: 'fixed',
          right: 50,
          bottom: 50,
        }}
      >
        <AddOutlined sx={{ fontSize: 30 }}/>
      </IconButton>

    </JournalLayout>
  )
}
