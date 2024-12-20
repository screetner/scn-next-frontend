'use server'

import { actionResponse } from '@/types/reponse'
import axios from '@/lib/axios'
import apiEndpoints from '@/config/apiEndpoints'
import { CheckRegisterTokenResponse } from '@/types/register'
import dayjs from 'dayjs'
import { createServerAction } from '@/utils/action-utils'

export async function checkRegisterToken(
  token: string,
): Promise<actionResponse<string | null>> {
  try {
    const { data } = await axios.get<CheckRegisterTokenResponse>(
      `${apiEndpoints.register.checkRegisterToken}`,
      {
        headers: {
          AuthorizationRegister: `Bearer ${token}`,
        },
      },
    )
    return {
      data: dayjs(data.exp * 1000).format('DD MMMM YYYY HH:mm'),
      error: null,
    }
  } catch (error) {
    return {
      data: null,
      error: 'Failed to check register token. Please try again.',
    }
  }
}

export const registerUser = createServerAction<void, [string, string, string]>(
  async (token, username, password) => {
    await axios.post(
      `${apiEndpoints.register.registerUser}`,
      {
        username,
        password,
      },
      {
        headers: {
          AuthorizationRegister: `Bearer ${token}`,
        },
      },
    )
  },
)

