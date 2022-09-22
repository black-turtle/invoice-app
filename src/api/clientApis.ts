import { gql } from 'graphql-request'
import ApiEndPoints from './common/ApiEndPoints'
import axiosClient from './common/AxiosClient'
import graphQlClient from './common/GraphQlClient'

export interface CompanyDetails {
    name: string
    address: string
    vatNumber: string
    regNumber: string
    iban?: string
    swift?: string
}

export interface ClientData {
    id: string
    name: string
    email: string
    // password: string
    // avatar?: string
    companyDetails?: CompanyDetails
}

export type ClientListData = ClientData & {
    invoicesCount: number
    totalBilled: number
    user_id: string
}

interface ClientsListDto {
    clients: ClientListData[]
    total: number
}

export interface LoadClientsProps {
    sort?: string
    sortBy?: string
    offset?: number
    limit?: number
}

export const loadClientsGraphQl = async (props?: LoadClientsProps) => {
    const GQL_QUERY = gql`
        query getClients(
            $sort: ClientListSortSchema
            $limit: Int
            $offset: Int
        ) {
            clients(sort: $sort, limit: $limit, offset: $offset) {
                results {
                    id
                    name
                    companyDetails {
                        name
                    }
                    invoicesCount
                    totalBilled
                }
                total
            }
        }
    `

    const variables = {
        sort: props?.sortBy
            ? { [props?.sortBy]: props?.sort }
            : { creation: 'asc' },
        limit: Number(props?.limit) ?? 10,
        offset: Number(props?.offset) ?? 0,
    }
    const data = await graphQlClient.executeQuery(GQL_QUERY, variables)

    return {
        clients: data.clients.results,
        total: data.clients.total,
    } as ClientsListDto
}

export const getClient = async (params?: { id: string }) => {
    const response = await axiosClient.instance.get(
        ApiEndPoints.clients.getClient.replace(':id', params!.id),
    )
    return response.data
}

export interface ClientNameDto {
    id: string
    companyName: string
}

export const getAllClientNames = async () => {
    const response = await axiosClient.instance.get(
        ApiEndPoints.clients.getClientNames,
    )

    // extract client companyNames so that it can be used in comboBox
    return response.data.clients as ClientNameDto[]
}

interface CreateOrUpdateClientResponse {
    success: string
    client: ClientData
}

export const createClientGraphQl = async (params?: ClientData) => {
    const GQL_QUERY = gql`
        mutation addClientQuery(
            $email: String!
            $name: String!
            $companyDetails: CompanyDetails
        ) {
            addClient(
                email: $email
                name: $name
                companyDetails: $companyDetails
            ) {
                id
                name
                email
                companyDetails {
                    name
                    address
                    vatNumber
                    regNumber
                    iban
                    swift
                }
            }
        }
    `

    const variables = {
        email: params?.email,
        name: params?.name,
        companyDetails: {
            name: params?.companyDetails?.name,
            address: params?.companyDetails?.address,
            vatNumber: params?.companyDetails?.vatNumber,
            regNumber: params?.companyDetails?.regNumber,
            iban: params?.companyDetails?.iban,
            swift: params?.companyDetails?.swift,
        },
    }
    const data = await graphQlClient.executeQuery(GQL_QUERY, variables)

    return {
        success: 'true',
        client: data.addClient as ClientData,
    } as CreateOrUpdateClientResponse
}

export const updateClient = async (params?: ClientData) => {
    const response = await axiosClient.instance.put(
        ApiEndPoints.clients.updateClient,
        params,
    )
    return response.data as CreateOrUpdateClientResponse
}
