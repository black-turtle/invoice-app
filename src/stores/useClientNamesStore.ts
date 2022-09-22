import create from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { ClientNameDto, getAllClientNames } from '../api/clientApis'
import { ApiExecutorResponse, executeApi } from '../utils/ApiExecutor'

interface StoreValues {
    // clientNamesResponse: null | ClientNameDto[]
    clientNamesApiResponse: ApiExecutorResponse<ClientNameDto[]>
}

interface StoreActions {
    reset: () => void
    loadClientNames: () => Promise<void>
    getCompanyNamesList: () => string[]
    getCompanyName: (clientId?: string) => string
    getClientId: (companyName?: string) => string
}

interface Store extends StoreValues, StoreActions {}

const defaultValues: StoreValues = {
    clientNamesApiResponse: { data: null, error: null },
}

export const useClientNamesStore = create<Store>()(
    devtools(
        immer((set, get) => ({
            ...defaultValues,

            reset: () => set(defaultValues),

            loadClientNames: async () => {
                const response = await executeApi(getAllClientNames)
                set((state) => {
                    state.clientNamesApiResponse = response
                })
            },

            getCompanyNamesList: () => {
                const {
                    clientNamesApiResponse: { data: clientNames },
                } = get()

                return clientNames?.map((client) => client.companyName) ?? []
            },

            getCompanyName: (clientId?: string) => {
                if (!clientId) return ''
                const {
                    clientNamesApiResponse: { data: clientNames },
                } = get()

                return (
                    clientNames?.filter((client) => {
                        return client.id === clientId
                    })[0].companyName ?? ''
                )
            },

            getClientId: (companyName?: string) => {
                if (!companyName) return ''
                const {
                    clientNamesApiResponse: { data: clientNames },
                } = get()

                return (
                    clientNames?.filter((client) => {
                        return client.companyName === companyName
                    })[0].id ?? ''
                )
            },
        })),
        { name: 'ClientNamesStore' },
    ),
)
