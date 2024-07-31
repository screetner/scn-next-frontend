import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {auth, signIn} from "@/lib/auth"
import { redirect } from "next/navigation"

export async function SignInForm() {
    const session = await auth()

    if (session) {
        redirect("/")
    }

    async function signInAction(formData: FormData) {
        'use server'

        const username = formData.get('username') as string
        const password = formData.get('password') as string

        const result = await signIn('credentials', {
            username,
            password,
            redirect: false,
        })

        if (result?.error) {
            console.error(result.error)
            return
        }

        redirect('/dashboard')
    }

    return (
        <form action={signInAction}>
            <div className="grid gap-2">
                <div className="grid gap-1">
                    <Label className="sr-only" htmlFor="username">
                        Username
                    </Label>
                    <Input
                        id="username"
                        name="username"
                        placeholder="Username"
                        type="text"
                        autoCapitalize="none"
                        autoComplete="username"
                        autoCorrect="off"
                        required
                    />
                </div>
                <div className="grid gap-1">
                    <Label className="sr-only" htmlFor="password">
                        Password
                    </Label>
                    <Input
                        id="password"
                        name="password"
                        placeholder="Password"
                        type="password"
                        autoCapitalize="none"
                        autoComplete="current-password"
                        required
                    />
                </div>
                <Button type="submit">
                    Sign In
                </Button>
            </div>
        </form>
    )
}