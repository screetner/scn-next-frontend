import {AuthRepository} from "@/repository/auth";
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import {TSignInResponse} from "@/types/auth";
import {InvalidLoginError} from "@/utils/custom";

export const { handlers, signIn, signOut, auth } = NextAuth({
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
                            accessTokenExpiry: response.user.accessTokenExpiry
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
        async jwt({ token, user }) {
            if(user) {
                token.user = user
            }

            // @ts-ignore
            const exp = new Date(token.user.accessTokenExpiry);
            const shouldRefreshTime = Math.round(exp.getTime() - (60 * 60 * 1000) - Date.now());
            if (shouldRefreshTime < 0) {
                await signOut();
                // token.user.accessToken = await AuthRepository.refreshToken(token.user.accessToken);
            }
            return token;
        },
        async session({ session, token }) {
            // @ts-ignore
            session.user = token.user as TSignInResponse["user"];
            return session;
        },
    },
})