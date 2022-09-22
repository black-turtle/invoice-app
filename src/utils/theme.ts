import { createTheme } from '@mui/material/styles'

// Create a theme instance.
const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#264653',
        },
        secondary: {
            main: '#19857b',
        },
        error: {
            main: '#ef233c',
        },
        success: {
            main: '#19857b',
        },
    },
})

export default theme
