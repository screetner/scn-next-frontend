import axios from "@/lib/axios";
import {CatchAxiosError} from "@/utils/CatchAxiosError";
import {AssetResponse} from "@/types/dashboard";


export async function getAssets(){
    try{
        const {data} = await axios.get<AssetResponse>('assets/orgId')
        return data
    }catch (err){
        CatchAxiosError(err)
    }
}