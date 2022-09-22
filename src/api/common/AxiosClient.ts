import axios, { AxiosInstance } from 'axios'

class AxiosClient {
    private getNewInstance = (token: string | null) => {
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            ...(token && { 'x-access-token': token }),
        }

        return axios.create({
            baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
            headers: headers,
        })
    }

    injectToken = (token: string | null) => {
        this.instance = this.getNewInstance(token)
    }

    public instance: AxiosInstance = this.getNewInstance(null)
}
const axiosClient = new AxiosClient()
export default axiosClient
