import { useDispatch } from 'react-redux'
import { Grid2, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { TurnedInNot } from '@mui/icons-material'
import { setActiveNote } from '../../store/journal'

export const NoteList = ({ notes }) => {
  
  const dispatch = useDispatch()

  const onClickNote = (e, note) => {
    e.preventDefault();
    dispatch( setActiveNote(note) );
  }

  const newTitle = ( note ) => {
    return note.title.length > 17 
    ? note.title.substring(0, 17) + '...'
    : note.title;
  }

  return (
    <List>
    {
      notes.map(note => (
        <ListItem key={ note.id } disablePadding>
          <ListItemButton onClick={ (e) => onClickNote(e, note) }>
            <ListItemIcon>
              <TurnedInNot />
            </ListItemIcon>
            <Grid2 container sx={{ flexGrow: 1 }}>
              <ListItemText primary={newTitle( note )}/>
              <ListItemText secondary={note.body}/>
            </Grid2>
          </ListItemButton>
        </ListItem>
      ))
    }
  </List>
  )
}
