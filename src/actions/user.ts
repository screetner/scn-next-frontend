'use server'

import { PasswordChangeSchema } from '@/schemas/PasswordChange'
import axios from '@/lib/axios'
import apiEndpoints from '@/config/apiEndpoints'
import { createServerAction, ServerActionError } from '@/utils/action-utils'

export const changePassword = createServerAction<void,[PasswordChangeSchema]>(
  async (data) => {
    try{
      await axios.patch(`${apiEndpoints.user.changePassword}`, {
        oldPassword: data.currentPassword,
        newPassword: data.password,
      })
    }catch(e : any){
      throw new ServerActionError(e.response.data.message)
    }
  }
)