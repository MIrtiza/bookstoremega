import axios from "axios"


export const getProductData = async ()=>{
    try{
        const response = await axios.get("https://api.npoint.io/7546f5d5279e464305bb");
        if(response?.data){
            return response.data;
        }
    }catch(error){
        console.log(error)
    }
    return null
}