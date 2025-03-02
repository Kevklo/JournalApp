import { Grid2, Typography } from "@mui/material"

export const AuthLayout = ({ children, title }) => {
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
    
        <Grid2
          className="box-shadow"
          size={{ xs:3 }}
          sx={{ backgroundColor: 'white', padding: 3, borderRadius: 2, width: {md: 450}}}
        >
          <Typography variant='h5' sx={{mb: 1}}>{ title}</Typography>

          { children }

        </Grid2>

    </Grid2>
  )
}
