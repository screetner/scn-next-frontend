import {TypographyH2} from "@/components/typography/TypographyH2";
import {auth} from "@/auth"

export default async function Dashboard(){
    const session = await auth()
    return (
        <div>
            <TypographyH2 text={"Dashboard"}/>
            <pre>{JSON.stringify(session, null, 2)}</pre>
        </div>
    )
}