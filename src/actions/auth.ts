"use server"
import {InvalidLoginError} from "@/utils/custom";
import {signIn} from "@/auth";

export async function authenticate(username: string, password: string) {
    try {
        const res = await signIn("credentials", {
            username: username,
            password: password,
            redirect: false,
        })

        if(res.error){
            return {error: res.error}
        }
        return res
    } catch (error : any) {
        console.log("action error", error)
        if (error instanceof InvalidLoginError) {
            return {error: error.code}
        }
        throw new Error("An error occurred while trying to authenticate")
    }
}