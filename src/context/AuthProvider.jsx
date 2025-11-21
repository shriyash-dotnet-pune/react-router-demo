import React, { useState } from "react";
import { UserAuthContext } from "./AuthContext";

export const AuthProvider = ({children})=> {
    const [isAuthorized, setIsAuthorized] = useState(false)
    const [user,setUser] = useState({})

    const contextValue = {
        isAuthorized,
        setIsAuthorized,
        user,
        setUser
    }

    return (
        <UserAuthContext.Provider value={contextValue}>
            {children}
        </UserAuthContext.Provider>
    )
}
