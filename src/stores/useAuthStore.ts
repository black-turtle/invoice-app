import { deleteCookie, getCookie, setCookie } from 'cookies-next'
import { signOut } from 'next-auth/react'
import create from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { LoginApiResponse, RegisterApiResponse } from '../api/authApi'
import { ClientData } from '../api/clientApis'
import axiosClient from '../api/common/AxiosClient'
import graphQlClient from '../api/common/GraphQlClient'
import { getCurrentUserInfo } from '../api/userApi'
import { executeApi } from '../utils/ApiExecutor'
import {
    HttpStatus,
    MessageType,
    useNotificationStore,
} from './useNotificationStore'

export const enum AuthState {
    AUTH = 'AUTH',
    NOT_AUTH = 'NOT_AUTH',
}

export const COOKIE_AUTH_TOKEN_KEY = 'AUTH_TOKEN'
export const COOKIE_USER_AVATAR = 'USER_AVATAR'

interface StoreValues {
    authState: AuthState
    token: string | null
    user: ClientData | null
}

interface StoreActions {
    reset: () => void
    loginUsingCookieIfNeeded: () => Promise<ClientData | null>
    login: (
        loginApi: () => Promise<LoginApiResponse>,
    ) => Promise<ClientData | null>

    register: (
        registerApi: () => Promise<RegisterApiResponse>,
    ) => Promise<boolean>

    setUserAndToken: (token: string) => Promise<ClientData | null>
    logout: () => Promise<void>
    updateUser: (user: ClientData | null) => void
}

interface Store extends StoreValues, StoreActions {}

const defaultValues: StoreValues = {
    authState: AuthState.NOT_AUTH,
    token: null,
    user: null,
}

export const useAuthStore = create<Store>()(
    devtools(
        immer((set, get) => ({
            ...defaultValues,

            reset: () => set(defaultValues),

            loginUsingCookieIfNeeded: async () => {
                const { token, setUserAndToken, user } = get()
                if (token && user) return user

                const cookieToken = getCookie(COOKIE_AUTH_TOKEN_KEY) as string
                return cookieToken ? setUserAndToken(cookieToken) : null
            },

            login: async (loginApi: () => Promise<LoginApiResponse>) => {
                const { data, error } = await executeApi(loginApi, true)
                if (data) {
                    const { token, ...user } = data

                    setCookie(COOKIE_AUTH_TOKEN_KEY, token)
                    axiosClient.injectToken(token)
                    graphQlClient.injectToken(token)

                    set((state) => {
                        state.token = token
                        state.user = user
                        state.authState = AuthState.AUTH
                    })

                    useNotificationStore.setState({
                        type: MessageType.SUCCESS,
                        message: 'Login Success!',
                        httpCode: HttpStatus.OK,
                    })
                    return user
                }

                return null
            },

            register: async (
                registerApi: () => Promise<RegisterApiResponse>,
            ) => {
                const { data, error } = await executeApi(registerApi, true)
                if (data) {
                    useNotificationStore.setState({
                        type: MessageType.SUCCESS,
                        message: 'Register Success!',
                        httpCode: HttpStatus.OK,
                    })
                    return true
                }
                return false
            },

            setUserAndToken: async (token: string) => {
                setCookie(COOKIE_AUTH_TOKEN_KEY, token)
                axiosClient.injectToken(token)
                graphQlClient.injectToken(token)

                const response = await executeApi(getCurrentUserInfo)

                set((state) => {
                    state.token = token
                    state.user = response.data
                    state.authState = AuthState.AUTH
                })

                return response.data
            },

            logout: async () => {
                deleteCookie(COOKIE_AUTH_TOKEN_KEY)
                deleteCookie(COOKIE_USER_AVATAR)
                signOut()

                axiosClient.injectToken(null)
                graphQlClient.injectToken(null)

                set((state) => {
                    state.user = null
                    state.token = null
                    state.authState = AuthState.NOT_AUTH
                })
            },

            updateUser: (user: ClientData | null) =>
                set((state) => {
                    state.user = user
                }),
        })),
        { name: 'AuthStore' },
    ),
)
