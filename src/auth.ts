import { AuthRepository } from '@/repository/auth'
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { InvalidLoginError } from '@/utils/custom'
import { shouldRefreshToken } from '@/utils/helper'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async ({ username, password }) => {
        try {
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
        } catch (e: any) {
          console.log(e)
          throw new InvalidLoginError(
            e.response.data || 'An error occurred while trying to authenticate',
          )
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (user && account) {
        token.user = user
      }

      if (token.user) {
        const shouldRefresh = shouldRefreshToken(
          // @ts-ignore
          new Date(token.user.accessTokenExpiry),
          0,
        )

        if (shouldRefresh) {
          try {
            const res = await fetch(`${process.env.API_URL}/auth/refresh`, {
              method: 'GET',
              headers: {
                // @ts-ignore
                Authorization: `Bearer ${token.user.refreshToken}`,
                // @ts-ignore
                AuthorizationRefresh: `Bearer ${token.user.refreshToken}`,
              },
            })
            const data = await res.json()
            return {
              ...token,
              user: {
                ...token.user,
                accessToken: data.accessToken,
                accessTokenExpiry: data.accessTokenExpiry,
                refreshToken: data.refreshToken,
              },
            }
          } catch (error) {
            // refresh token failed
            await signOut()
          }
        }
      }

      return token
    },
    async session({ session, token }) {
      session.user = token.user as any
      return session
    },
  },
  // session: {
  //   strategy: 'jwt',
  // },
})
