import { createContext, useState } from "react";

export const StoreContext = createContext()

const StoreContect = ({children}) => {

    const [token, setToken] = useState(false)

  return (
    <StoreContext.Provider value={{token,setToken}}>
        {children}
    </StoreContext.Provider>
  )
}

export default StoreContect