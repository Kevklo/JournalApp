import { createTheme } from '@mui/material';
import { red } from '@mui/material/colors';

export const purpleTheme = createTheme({
    palette: {
        primary: {
            main: '#393E46'
        },
        secondary: {
            main: '#222831'
        },
        tertiary: {
          main: '#00ADB5',
          disabled: '#80C8CC'
        },
        error: {
            main: red.A400
        }
    }
})