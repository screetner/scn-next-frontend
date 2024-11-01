import axios from '@/lib/axios';
import { TSignInResponse } from '@/types/auth';
import apiEndpoints from '@/config/apiEndpoints'
export class AuthRepository {
  static async signIn(username: string, password: string) {
    const { data } = await axios.post<TSignInResponse>(`${apiEndpoints.auth.signIn}`, {
      username,
      password,
    });
    return data;
  }
}
