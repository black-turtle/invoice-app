import { CircularProgress } from '@mui/material'

interface ProgressProps {
    // containerStyles?: Record<string, string>
    // progressProps?: Record<string, string>
    fullScreen?: boolean
}

const fullPageStyles = {
    container: {
        height: '100vh',
    },
    progressProps: {
        size: '10vmin',
    },
}

const Loader = ({ fullScreen: isFullPage }: ProgressProps) => {
    return (
        <div
            className="flex-center-container"
            style={isFullPage ? fullPageStyles.container : undefined}
        >
            <CircularProgress
                {...(isFullPage && fullPageStyles.progressProps)}
            />
        </div>
    )
}

export default Loader
