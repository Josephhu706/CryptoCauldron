import axios from "axios";

export type Coin = {
    id: string;
    symbol: string;
    name: string;
    image: string;
    current_price: number;
    market_cap: number;
    market_cap_rank: number;
    fully_diluted_valuation: number;
    total_volume: number;
    high_24h: number;
    low_24h: number;
    price_change_24h: number;
    price_change_percentage_24h: number;
    market_cap_change_24h: number;
    market_cap_change_percentage_24h: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    ath: number;
    ath_change_percentage: number;
    ath_date: string;
    atl: number;
    atl_change_percentage: number;
    atl_date: string;
    roi: any;
    last_updated: string;
}


export const fetchCrypto = async ()=>{
    //put page not found 
    const endpoint = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=aud&order=market_cap_desc&per_page=100&page=1&sparkline=false`;
    const {data} = await axios.get(endpoint)
    console.log(data)
    return data

}

export const fetchCoin = async (id:string) => {
    const endpoint = `https://api.coingecko.com/api/v3/coins/${id}`
    const {data} = await axios.get(endpoint)
    console.log(data)
    return data
}

export const fetchHistory = async (id:string, days:number = 365) => {
    const endpoint = `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=aud&days=${days}`
    const {data} = await axios.get(endpoint)
    console.log(data)
    return data
}
