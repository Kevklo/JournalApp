import { CircularProgress, Grid2, Typography } from "@mui/material"
import cirnoGif from '../assets/cirno.gif'

export const CheckingAuth = () => {
  return (
  <Grid2
    container
    spacing={0}
    direction="column"
    sx={{
      alignItems:"center",
      justifyContent:"center",
      minHeight: '100vh', backgroundColor: 'primary.main', padding: 4
  }}>
  
      <img src={cirnoGif} alt="cirno loading"
        style={{
          width: "20%",  // Reduce el ancho al 50%
          height: "auto", // Mantiene la proporción original
          marginBottom: '3%',
      }} />
      <CircularProgress color="tertiary"/>
      <Typography color="tertiary">
        Now Loading...
      </Typography>

  </Grid2>
  )
}
