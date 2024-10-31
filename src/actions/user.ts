'use server'

import { PasswordChangeSchema } from '@/schemas/PasswordChange'
import { CatchAxiosError } from '@/utils/CatchAxiosError'
import axios from '@/lib/axios'

export const changePassword = async (data: PasswordChangeSchema) => {
  try{
    await axios.patch('/user/change-password', {
      oldPassword: data.currentPassword,
      newPassword: data.password,
    })
  }catch(e){
    throw CatchAxiosError(e)
  }
}