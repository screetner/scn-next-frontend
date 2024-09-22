import { actionResponse } from '@/types/reponse'
import axios from '@/lib/axios'
import { CatchAxiosError } from '@/utils/CatchAxiosError'

export async function checkRegisterToken(
  token: string,
): Promise<actionResponse<boolean>> {
  try {
    await new Promise(resolve => setTimeout(resolve, 2000))
    // await axios.get<boolean>('/register/check', {
    //   headers: {
    //     AuthorizationRegister: `Bearer ${token}`,
    //   },
    // })
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
      '/register',
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
