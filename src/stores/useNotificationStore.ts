import create from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

export enum MessageType {
    ERROR = 'error',
    SUCCESS = 'success',
    WARNING = 'warning',
    INFO = 'info',
}

export enum HttpStatus {
    IGNORE = -1,
    OK = 200,
    INVALID_TOKEN = 401,
    NETWORK_ERROR = 503,
}

interface StoreValues {
    type: MessageType
    httpCode: HttpStatus
    message: string | null
}

interface StoreActions {
    reset: () => void
    setData: (type: MessageType, message: string, code: HttpStatus) => void
}

interface Store extends StoreValues, StoreActions {}

const defaultValues: StoreValues = {
    type: MessageType.INFO,
    httpCode: HttpStatus.IGNORE,
    message: null,
}

export const useNotificationStore = create<Store>()(
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
        { name: 'NotificationStore' },
    ),
)
