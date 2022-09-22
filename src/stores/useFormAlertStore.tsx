import create from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { HttpStatus, MessageType } from './useNotificationStore'

interface StoreValues {
    type: MessageType
    httpCode: HttpStatus
    message: string | null
}

interface StoreActions {
    reset: () => void
    setData: (type: MessageType, message: string, code: HttpStatus) => void
    // setCodeAndMessage: (code: number, msg: string) => void
    // setNotification: (type: MessageType, message: string) => void
}

interface Store extends StoreValues, StoreActions {}

const defaultValues: StoreValues = {
    type: MessageType.INFO,
    httpCode: HttpStatus.IGNORE,
    message: null,
}

export const useFormAlertStore = create<Store>()(
    devtools(
        immer((set, get) => ({
            ...defaultValues,

            reset: () => set(defaultValues),

            setData: (type: MessageType, message: string, code: HttpStatus) => {
                set((state) => {
                    state.message = message
                    state.type = type
                    state.httpCode = code
                })
            },
        })),
        { name: 'useFormAlertStore' },
    ),
)
