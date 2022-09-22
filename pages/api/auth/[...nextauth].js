import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
const isGoogleAuthRequired =
    process.env.NEXT_PUBLIC_ENABLE_GOOGLE_AUTH === 'true'

export const authOptions = {
    // Configure one or more authentication providers
    providers: [],
    secret: process.env.JWT_SECRET,
}

if (isGoogleAuthRequired) {
    authOptions.providers = [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ]
}

export default NextAuth(authOptions)
