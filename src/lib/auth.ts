import { AuthRepository } from "@/repository/auth";
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            authorize: async ({ username, password }) => {
                const response = await AuthRepository.signIn(username, password)
                if (response.user && response.token) {
                    return {
                        id: response.user.username,
                        name: response.user.username,
                        email: response.user.email,
                        role: response.user.roleName,
                        token: response.token
                    }
                }
                return null
            }
        })
    ],
    callbacks: {
        async jwt({ token, account }) {
            if (account) {
                token.accessToken = account?.access_token
                token.id = account.id
            }
            return token
        }
    },
})