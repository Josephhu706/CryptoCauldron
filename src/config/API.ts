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

export type SingleCoin={
additional_notices: Array<any>
asset_platform_id: any
block_time_in_minutes: number
categories: Array<any>
coingecko_rank: number
coingecko_score: number
community_data: any
community_score: number
country_origin: string
description: any
developer_data: any
developer_score: number
genesis_date: string
hashing_algorithm: string
id: string
image: any
last_updated: string
links: any
liquidity_score: number
localization: any
market_cap_rank: number
market_data: any
name: string
platforms: any
public_interest_score: number
public_interest_stats: any
public_notice: any
sentiment_votes_down_percentage: number
sentiment_votes_up_percentage: number
status_updates: Array<any>
symbol: string
tickers: any
}

export type Timeline = {
    label: string,
    value: number,

}


export const fetchCrypto = async ()=>{
    //put page not found 
    const endpoint = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=aud&order=market_cap_desc&per_page=100&page=1&sparkline=false`;
    const {data} = await axios.get(endpoint)
    console.log(data)
    return data

}

export const fetchCoin = async (id:string|undefined) => {
    const endpoint = `https://api.coingecko.com/api/v3/coins/${id}`
    const {data} = await axios.get(endpoint)
    console.log(data)
    return data
}

export const fetchHistory = async (id:string, days:number = 365) => {
    const endpoint = `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=aud&days=${days}`
    const {data} = await axios.get(endpoint)
    console.log(data.prices)
    console.log('history fetched')
    return data.prices
}
