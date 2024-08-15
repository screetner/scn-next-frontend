// @ts-nocheck

import {AuthRepository} from "@/repository/auth";
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import {TSignInResponse} from "@/types/auth";
import {InvalidLoginError} from "@/utils/custom";
import axios from "@/lib/axios";
import {shouldRefreshToken} from "@/utils/helper";
import * as action from "@/actions"

export const { handlers, signIn, signOut, auth} = NextAuth({
    providers: [
        Credentials({
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            authorize: async ({ username, password }) => {
                try{
                    // @ts-ignore
                    const response = await AuthRepository.signIn(username, password)
                    if (response.user) {
                        return {
                            username: response.user.username,
                            roleName: response.user.roleName,
                            email: response.user.email,
                            accessToken: response.user.accessToken,
                            organization_name: response.user.orgName,
                            accessTokenExpiry: response.user.accessTokenExpiry,
                            refreshToken: response.user.refreshToken,
                        }
                    }
                    return null
                }catch(e : any){
                    throw new InvalidLoginError(e.response.data || "An error occurred while trying to authenticate")
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user, trigger, session }) {
            if (user) {
                token.user = user;
            }

            if (trigger === "update" && session?.user) {
                token.user = session.user;
            }

            if (token.user) {
                // @ts-ignore
                const shouldRefresh = shouldRefreshToken(new Date(token.user.accessTokenExpiry), 10);
                if (shouldRefresh) {
                    try {
                        const newToken = await action.reFreshToken();
                        token.user = {
                            ...token.user,
                            accessToken: newToken?.accessToken,
                            accessTokenExpiry: newToken?.accessTokenExpiry,
                        };
                    } catch (error) {
                        console.error("Failed to refresh token:", error);
                        // You might want to handle this error, e.g., by signing out the user
                        // return { ...token, error: "RefreshAccessTokenError" };
                    }
                }
            }

            return token;
        },
        async session({ session, token }) {
            session.user = token.user as TSignInResponse["user"];

            axios.defaults.headers.common["Authorization"] = `Bearer ${token.user.accessToken}`;
            axios.defaults.headers.common["AuthorizationRefresh"] = `Bearer ${token.user.refreshToken}`;

            return session;
        },
    },
    session: {
        strategy: "jwt",
    },
})