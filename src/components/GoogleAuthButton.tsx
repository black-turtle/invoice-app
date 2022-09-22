import { Box, Button } from '@mui/material'
import { grey } from '@mui/material/colors'
import Google from '../assets/images/social-google.svg'

interface IProps {
    text: string
    onClickAction: () => void
}

const GoogleAuthButton = (props: IProps) => {
    return (
        <Button
            disableElevation
            fullWidth
            onClick={props.onClickAction}
            size="large"
            variant="outlined"
            sx={{
                backgroundColor: grey[50],
                borderColor: grey[100],
            }}
        >
            <Box sx={{ mr: 2, width: 20, height: 20 }}>
                <Google />
            </Box>
            {props.text}
        </Button>
    )
}

export default GoogleAuthButton
