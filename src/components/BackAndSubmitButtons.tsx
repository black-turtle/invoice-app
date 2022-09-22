import { LoadingButton } from '@mui/lab'
import { Box, Button, Divider, Stack } from '@mui/material'
import { BiSend } from 'react-icons/bi'
import { FaArrowLeft } from 'react-icons/fa'
import useNavigate from '../hooks/useNavigate'

interface IProps {
    isSubmitting: boolean
    submitButtonText: string
    submitButtonDataTestAttr: string
}

const BackAndSubmitButtons = ({
    isSubmitting,
    submitButtonText,
    submitButtonDataTestAttr,
}: IProps) => {
    const { router } = useNavigate()
    return (
        <Box sx={{ mt: '3rem', mb: 2 }}>
            <Divider />
            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<FaArrowLeft />}
                    onClick={() => router.back()}
                >
                    Go Back
                </Button>

                <LoadingButton
                    type="submit"
                    endIcon={<BiSend />}
                    fullWidth
                    variant="contained"
                    data-test={submitButtonDataTestAttr}
                    loading={isSubmitting}
                    loadingIndicator="Loading..."
                >
                    {submitButtonText}
                </LoadingButton>
            </Stack>
        </Box>
    )
}

export default BackAndSubmitButtons
