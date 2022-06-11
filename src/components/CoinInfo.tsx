import React from 'react'
import './CoinInfo.css'

type Props = {
  name: string;
  image: string;
  symbol: string;
  price: number;
  volume: number;
  priceChange: number;
  marketcap: number;
}

const CoinInfo: React.FC<Props> = ({name, image, symbol, price, volume, priceChange, marketcap}) => {
  return (
    <div className='coin-cointainer'>
        <div className="coin-row">
            <div className="coin">
                <img src={image} alt='crypt' />
                <h1>{name}</h1>
                <p className="coin-symbol">{symbol}</p>
            </div>
            <div className="coin-data">
                <p className="coin-price">${price}</p>
                {/* displays commas */}
                <p className="coin-volume">${volume.toLocaleString()}</p>
                {priceChange < 0 ? (
                  <p className="coin-percent red">{priceChange.toFixed(2)}%</p>
                  ):(
                  <p className="coin-percent green">{priceChange.toFixed(2)}%</p>
                  )}
                  <p className="coin-marketcap">
                    Mkt Cap: ${marketcap.toLocaleString()}
                  </p>
            </div>
        </div>
    </div>
  )
}

export default CoinInfo