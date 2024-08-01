import { AuthRepository } from "@/repository/auth";
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import {TSignInResponse} from "@/types/auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            authorize: async ({ username, password }) => {
                // @ts-ignore
                const response = await AuthRepository.signIn(username, password)
                if (response.user && response.token) {
                    return {
                        username : response.user.username,
                        roleId : response.user.roleId,
                        roleName : response.user.roleName,
                        email : response.user.email,
                        token : response.token,
                        organization_name : response.user.organization_name
                    }
                }
                return null
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.user = user;
            }
            return token;
        },
        async session({ session, token }) {
            // @ts-ignore
            session.user = token.user as TSignInResponse["user"];
            return session;
        }
    }
})