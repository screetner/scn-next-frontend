import {TypographyH2} from "@/components/typography/TypographyH2";
import {auth} from "@/auth"

export default async function Dashboard(){
    const session = await auth()
    console.log(session)
    return (
        <div>
            <TypographyH2 text={"Dashboard"}/>
        </div>
    )
}