import {$host} from "./index";

export const CheckJsonReq = async (nameSurname, phone, message, date, email) => {
    const response = await $host.post('/api/test', {nameSurname, phone, message, date, email})
    return response
}