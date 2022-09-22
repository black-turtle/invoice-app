import { AxiosError } from 'axios'
import { deleteCookie, setCookie } from 'cookies-next'
import { GetServerSideProps } from 'next'
import { unstable_getServerSession } from 'next-auth/next'
import { authOptions } from '../../pages/api/auth/[...nextauth]'
import { loginApi, registerApi } from '../api/authApi'
import axiosClient from '../api/common/AxiosClient'
import { getCurrentUserInfo } from '../api/userApi'
import {
    COOKIE_AUTH_TOKEN_KEY,
    COOKIE_USER_AVATAR,
} from '../stores/useAuthStore'

const redirectTo = (url: string) => {
    return {
        redirect: {
            destination: url,
            permanent: false,
        },
    }
}

const handleWithTokenCase = async (req: any, res: any, token: string) => {
    if (token) {
        try {
            axiosClient.injectToken(token)
            const user = await getCurrentUserInfo()

            return user.companyDetails
                ? redirectTo('/')
                : redirectTo('/company-details')
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.data === 'Invalid Token') {
                    deleteCookie(COOKIE_AUTH_TOKEN_KEY, { req, res })
                    deleteCookie(COOKIE_USER_AVATAR, { req, res })
                    return redirectTo('/login')
                }
            } else {
                redirectTo('/500')
            }
        }
    }
    return {
        props: {},
    }
}

const loginUsingGoogle: any = async (
    session: Awaited<ReturnType<typeof unstable_getServerSession>>,
) => {
    try {
        const apiResponse = await loginApi({
            email: session?.user?.email as string,
            password: 'dummyPassword',
        })
        return apiResponse.token
    } catch (error) {
        if (error instanceof AxiosError) {
            if (error.response?.data === 'Invalid Credentials') {
                // user login failed, assuming new user
                // Register user first
                const registerRes = await registerUsingGoogle(session)

                // Now try to re-login
                if (registerRes.user_id) {
                    return await loginUsingGoogle(session)
                }
            }
        } else {
            redirectTo('/500')
        }
    }
    return null
}

const registerUsingGoogle = async (
    session: Awaited<ReturnType<typeof unstable_getServerSession>>,
) => {
    // Note: Ideally, We should handle google authentication logic in actual backend
    // But I wanted to test it via next-auth. So I am using it in this hacky way.
    const apiResponse = await registerApi({
        name: session?.user?.name as string,
        email: session?.user?.email as string,
        password: 'dummyPassword',
        confirmPassword: 'dummyPassword',
    })
    return apiResponse
}

const clearGoogleAuthSessionCookies = (req: any, res: any) => {
    for (let name in req.cookies) {
        if (name.startsWith('_ga') || name.startsWith('next-auth')) {
            deleteCookie(name, {
                req,
                res,
            })
        }
    }
}
const isGoogleAuthRequired =
    process.env.NEXT_PUBLIC_ENABLE_GOOGLE_AUTH === 'true'

export const serverSideNoAuthGuard: GetServerSideProps = async ({
    req,
    res,
}) => {
    // if token present, validate and redirect to appropriate page
    const token = req.cookies[COOKIE_AUTH_TOKEN_KEY]
    if (token) {
        return handleWithTokenCase(req, res, token)
    }

    // if google authentication session data present
    // login using session data
    if (isGoogleAuthRequired) {
        const session = await unstable_getServerSession(req, res, authOptions)
        const googleAuthToken = session && (await loginUsingGoogle(session))
        if (googleAuthToken) {
            // clear the session data and save authToken in cookie
            clearGoogleAuthSessionCookies(req, res)

            setCookie(COOKIE_AUTH_TOKEN_KEY, googleAuthToken, {
                req,
                res,
            })
            setCookie(COOKIE_USER_AVATAR, session.user?.image, {
                req,
                res,
            })

            return await handleWithTokenCase(req, res, googleAuthToken)
        }
    }

    return {
        props: {},
    }
}
