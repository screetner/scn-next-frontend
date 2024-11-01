'use server'

import { PasswordChangeSchema } from '@/schemas/PasswordChange'
import { CatchAxiosError } from '@/utils/CatchAxiosError'
import axios from '@/lib/axios'
import apiEndpoints from '@/config/apiEndpoints'

export const changePassword = async (data: PasswordChangeSchema) => {
  try{
    await axios.patch(`${apiEndpoints.user.changePassword}`, {
      oldPassword: data.currentPassword,
      newPassword: data.password,
    })
  }catch(e){
    throw CatchAxiosError(e)
  }
}