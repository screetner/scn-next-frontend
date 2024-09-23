import { actionResponse } from '@/types/reponse'
import axios from '@/lib/axios'
import { CatchAxiosError } from '@/utils/CatchAxiosError'
import apiEndpoints from '@/config/apiEndpoints'

export async function checkRegisterToken(
  token: string,
): Promise<actionResponse<boolean>> {
  try {
    await axios.get<boolean>(`${apiEndpoints.register.checkRegisterToken}`, {
      headers: {
        AuthorizationRegister: `Bearer ${token}`,
      },
    })
    return {
      data: true,
      error: null,
    }
  } catch (error) {
    return {
      data: false,
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
