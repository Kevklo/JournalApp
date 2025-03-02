import { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeleteOutline, SaveOutlined, UploadOutlined } from "@mui/icons-material"
import { Button, Grid2, IconButton, TextField, Typography } from "@mui/material"
import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.css';
import { ImageGallery } from './../components/ImageGallery';
import { useForm } from './../../hooks/useForm';
import { setActiveNote } from "../../store/journal/journalSlice";
import { StartSavingNote, startUploadingFiles } from "../../store/journal/thunks";
import { startDeletingNote } from "../../store/journal/thunks";

export const NoteView = () => {
  
  const dispatch = useDispatch();
  const { active: activeNote, messageSaved, isSaving } = useSelector(state => state.journal);
  const { body, title, date, onInputChange, formState } = useForm( activeNote );

  const dateString = useMemo(() => {
    const newDate = new Date( date );
    return newDate.toUTCString();
  }, [date])

  useEffect(() =>{
    dispatch( setActiveNote(formState) );
  },[formState])
  
  useEffect(() => {
    if(messageSaved.length > 0){
      Swal.fire('Note actualizada', messageSaved, 'success');
    }
  },[messageSaved])

  const onSaveNote = () => {
    dispatch( StartSavingNote() );
  }

  const onFileInputChange = ({ target }) => {
    if( target.files === 0 ) return;

    dispatch( startUploadingFiles(target.files) )
  }

  const fileInputRef = useRef();

  const onDelete = () => {
    dispatch( startDeletingNote() )
  }

  return (
    <Grid2 container direction='row' 
          sx={{ 
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 1,
            flexGrow: 1
          }}>

      <Grid2>
        <Typography fontSize={39} fontWeight='light'>{ dateString }</Typography>
      </Grid2>

      <Grid2>

        <input 
          type="file" 
          multiple
          ref={ fileInputRef }
          onChange={ onFileInputChange }
          style={{ display: 'none' }}
        />
        <IconButton
          color="tertiary"
          disabled={ isSaving }
          onClick={() => fileInputRef.current.click() }
          sx={{marginRight: 1}}
        >
          <UploadOutlined/>
        </IconButton>

        <Button color="tertiary" sx={{ padding: 2 }}
          onClick={ onSaveNote }
          disabled={ isSaving }
        >
          <SaveOutlined sx={{ fontSize: 30, mr: 1}}/>
          Guardar
        </Button>
      </Grid2>
      
      <Grid2 container
        size={12}
      >
        <TextField
          type="text"
          variant="filled"
          fullWidth
          placeholder="Ingrese su título"
          label="Titulo"
          sx={{ border: 'none', mb:1}}
          name="title"
          value={ title }
          onChange={ onInputChange }
        />
        <TextField
          type="text"
          variant="filled"
          fullWidth
          multiline
          placeholder="¿Qué sucedió hoy?"
          minRows={5}
          sx={{ border: 'none', mb:1}}
          name="body"
          value={ body }
          onChange={ onInputChange }
        />
      </Grid2> 
      <Grid2 container justifyContent='end'>
        <Button
          onClick={ onDelete }
          sx={{ mt: 2}}
          color="error"
        >
          <DeleteOutline/>
        </Button>
      </Grid2>
        <ImageGallery images={ activeNote.imageUrls }/>
      

    </Grid2>
  )
}
