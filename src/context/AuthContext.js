import React from "react";

export const UserAuthContext = React.createContext({
    isAuthorized : false,
    user : {},
    setIsAuthorized : ()=> {},
    setUser : ()=> {}
})