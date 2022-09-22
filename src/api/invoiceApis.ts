import { ClientData } from './clientApis'
import ApiEndPoints from './common/ApiEndPoints'
import axiosClient from './common/AxiosClient'

export interface InvoiceItem {
    description: string
    price: number
}

export type InvoiceData = {
    id: string
    createdAt: number
    invoice_number: string
    user_id: string
    client_id: string
    date: number
    dueDate: number
    value: number
    projectCode: string
    meta?: {
        items: InvoiceItem[]
    }
}

export type InvoiceWithClientDetails = {
    invoice: InvoiceData
    client: ClientData
}

export interface LoadInvoicesProps {
    sort?: string
    sortBy?: string
    offset?: number
    limit?: number
    clientId?: string
}

export interface LoadInvoicesResponse {
    invoices: InvoiceWithClientDetails[]
    total: number
}

export const loadInvoices = async (props?: LoadInvoicesProps) => {
    const response = await axiosClient.instance.get(
        ApiEndPoints.invoices.getInvoices,
        { params: props },
    )
    return response.data as LoadInvoicesResponse
}

export const getInvoice = async (params?: { id: string }) => {
    const response = await axiosClient.instance.get(
        ApiEndPoints.invoices.getInvoice.replace(':id', params!.id),
    )
    return response.data.invoice as InvoiceData
}

export const createInvoice = async (params?: InvoiceData) => {
    const response = await axiosClient.instance.post(
        ApiEndPoints.invoices.createInvoice,
        params,
    )
    return response.data
}

export const updateInvoice = async (params?: InvoiceData) => {
    const response = await axiosClient.instance.put(
        ApiEndPoints.invoices.updateInvoice,
        params,
    )
    return response.data
}

// export default InvoiceApis
