import { ClientData } from './clientApis'
import ApiEndPoints from './common/ApiEndPoints'
import axiosClient from './common/AxiosClient'

export interface LoginApiParams {
    email: string
    password: string
}

export type LoginApiResponse = ClientData & { token: string }

export const loginApi = async (params?: LoginApiParams) => {
    const response = await axiosClient.instance.post(
        ApiEndPoints.auth.login,
        params,
    )
    return response.data as LoginApiResponse
}
export interface RegisterApiParams {
    name: string
    email: string
    password: string
    confirmPassword: string
}

export interface RegisterApiResponse {
    user_id: string
}

export const registerApi = async (params?: RegisterApiParams) => {
    const response = await axiosClient.instance.post(
        ApiEndPoints.auth.register,
        params,
    )
    return response.data as RegisterApiResponse
}
