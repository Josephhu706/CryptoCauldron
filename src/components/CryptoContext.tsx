import React, { createContext, useContext, useEffect, useState } from "react";



type Props ={
  children: JSX.Element
}

const CryptoContextValue = createContext<Props | any>(null)

const CryptoContext = ({ children }:Props) => {

    const [user, setUser] = useState<any>(null);
  
    return (
      <CryptoContextValue.Provider value={{user}}>
        {children}
      </CryptoContextValue.Provider>
    );
  };
  
  export default CryptoContext;
  
  
  export const CryptoState = () => {
    let context = useContext(CryptoContextValue)
    return context
};