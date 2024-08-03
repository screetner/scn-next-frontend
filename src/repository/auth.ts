import axios from "@/lib/axios";
import {TSignInResponse} from "@/types/auth";
export class AuthRepository {
    static async signIn(username: string, password: string) {
        const {data} = await axios.post<TSignInResponse>("/auth/login", { username, password });
        return data;
    }
}