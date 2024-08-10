"use server"

import { Location } from "@/types/map";
import axios from "@/lib/axios";
import {CatchAxiosError} from "@/utils/CatchAxiosError";
import {GetGeolocation} from "@/types/geolocation";

export const patchGeolocationOrganizationBorder = async (locations: Location[]) => {
    try {
        await axios.patch("/geolocation/organization-border", locations);
    } catch (error: any) {
        CatchAxiosError(error);
    }
}

export const getGeolocationOrganizationBorder = async () => {
    try{
        const {data} = await axios.get<GetGeolocation>('/geolocation')
        return data
    } catch (err : any){
        CatchAxiosError(err);
    }
}