import { Box, Button, Stack, styled, Typography } from '@mui/material'
import { FaArrowLeft } from 'react-icons/fa'

const StyledStack = styled(Stack)(({ theme }) => ({
    float: 'none',
    display: 'flex',
    justifyContent: 'center',

    [theme.breakpoints.up('lg')]: {
        float: 'right',
    },
}))

const StyledTypography = styled(Typography)(({ theme }) => ({
    float: 'none',
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '1rem',

    [theme.breakpoints.up('lg')]: {
        // float: 'right'
        display: 'inline',
    },
}))

interface TableTitleSectionProps {
    title: string
    buttons: {
        label: string
        dataTestAttr?: string
        onClick: () => void
    }[]
    backButtonAction?: () => void
}
const TableTitleSection = (props: TableTitleSectionProps) => {
    const { title, buttons } = props
    return (
        <Box sx={{ my: '1.5rem' }} data-test="table-title">
            <StyledTypography
                variant="h4"
                sx={{ color: 'primary.main', fontWeight: 'bold' }}
            >
                {title}
            </StyledTypography>

            <StyledStack spacing={2} direction="row">
                {props.backButtonAction && (
                    <Button
                        variant="outlined"
                        startIcon={<FaArrowLeft />}
                        onClick={props.backButtonAction}
                    >
                        Go Back
                    </Button>
                )}
                {buttons.map((button) => (
                    <Button
                        key={button.label}
                        variant="contained"
                        onClick={button.onClick}
                        data-test={button.dataTestAttr}
                    >
                        {button.label}
                    </Button>
                ))}
            </StyledStack>
        </Box>
    )
}

export default TableTitleSection
