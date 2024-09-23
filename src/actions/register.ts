'use server'

import { actionResponse } from '@/types/reponse'
import axios from '@/lib/axios'
import { CatchAxiosError } from '@/utils/CatchAxiosError'
import apiEndpoints from '@/config/apiEndpoints'
import { CheckRegisterTokenResponse } from '@/types/register'
import dayjs from 'dayjs'

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

export async function registerUser(
  token: string,
  username: string,
  password: string,
): Promise<void> {
  try {
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
  } catch (e) {
    CatchAxiosError(e)
  }
}
