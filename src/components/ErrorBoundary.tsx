import { Component, ReactElement } from 'react'
import { DynamicServerErrorComponent } from '../utils/commonDynamicComponentUtils'

interface ErrorBoundaryProps {
    children: ReactElement
}

interface ErrorBoundaryStates {
    hasError: boolean
    error?: Error
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryStates> {
    constructor(props: ErrorBoundaryProps) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError(error: unknown) {
        return { hasError: true, error: error }
    }

    componentDidCatch(error: unknown, errorInfo: unknown) {
        this.setState({ hasError: true, error: error as Error })
        console.error(error)
    }

    render() {
        if (this.state.hasError) {
            return (
                <DynamicServerErrorComponent
                    message={`ErrorBoundary: ${this.state.error?.message}`}
                />
            )
        }

        return this.props.children
    }
}

export default ErrorBoundary
