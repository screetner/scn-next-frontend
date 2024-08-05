import { auth } from "@/auth"

export default async function Dashboard() {
    const session = await auth()
    return (
        <div className="h-full w-full overflow-auto">
            <pre className="w-full whitespace-pre-wrap break-words">
                {JSON.stringify(session, null, 2)}
            </pre>
        </div>
    )
}