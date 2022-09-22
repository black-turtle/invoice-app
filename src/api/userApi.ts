import { ClientData, CompanyDetails } from './clientApis'
import ApiEndPoints from './common/ApiEndPoints'
import axiosClient from './common/AxiosClient'

export const getCurrentUserInfo = async () => {
    const response = await axiosClient.instance.get(
        ApiEndPoints.user.getCurrentUser,
    )
    return response.data as ClientData
}

interface UpdateCompanyDetailResponse {
    success: string
    user: ClientData
}

export const updateCompanyDetails = async (params?: CompanyDetails) => {
    const response = await axiosClient.instance.put(
        ApiEndPoints.user.updateCompanyDetails,
        params,
    )
    return response.data as UpdateCompanyDetailResponse
}
