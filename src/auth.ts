import { AuthRepository } from '@/repository/auth'
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { InvalidLoginError } from '@/utils/custom'
import { shouldRefreshToken } from '@/utils/helper'
import { redirect } from '@/i18n/routing'
import apiEndpoints from '@/config/apiEndpoints'

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
              orgName: response.user.orgName,
              accessTokenExpiry: response.user.accessTokenExpiry,
              refreshToken: response.user.refreshToken,
              isOwner: response.user.isOwner,
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
      try {
        if (user && account) {
          token.user = user
        }

        if (token.user) {
          const shouldRefresh = shouldRefreshToken(
            // @ts-ignore
            new Date(token.user.accessTokenExpiry),
            10,
          )

          if (shouldRefresh) {
            const res = await fetch(`${apiEndpoints.auth.refresh}`, {
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
          }
        }
        return token
      } catch (e) {
        await signOut()
        redirect('/')
        return token
      }
    },
    async session({ session, token }) {
      session.user = token.user as any
      return session
    },
  },
})
