import { useCallback, useState } from 'react'
import { handleApiErrors } from '../utils/ErrorUtils'

enum AsyncState {
    INITIAL,
    PENDING,
    SUCCESS,
    ERROR,
}

const useAsync = <T, P>(asyncFunction: (params?: P) => Promise<T>) => {
    const [status, setStatus] = useState<AsyncState>(AsyncState.INITIAL)
    const [data, setData] = useState<T | null>(null)
    const [error, setError] = useState<Error | null>(null)

    // useCallback ensures the below useEffect is not called
    // on every render, but only if asyncFunction changes.
    const execute = useCallback(
        async (props?: P) => {
            setStatus(AsyncState.PENDING)
            // setData(null)
            // setError(null)

            try {
                const ret = await asyncFunction(props)
                setStatus(AsyncState.SUCCESS)
                setData(ret)
                setError(null)
                return ret
            } catch (error) {
                handleApiErrors(error as Error)

                setStatus(AsyncState.ERROR)
                setData(null)
                setError(error as Error)
            }
        },
        [asyncFunction],
    )

    return { status, data, error, execute }
}

export { AsyncState, useAsync }
