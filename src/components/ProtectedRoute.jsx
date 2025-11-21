import React, { useContext } from 'react'
import { UserAuthContext } from '../context/AuthContext'
import { Navigate, useLocation } from 'react-router-dom'

export default function ProtectedRoute({children}) {
    const {isAuthorized} = useContext(UserAuthContext)
    const location = useLocation()

    if(!isAuthorized){
      <Navigate to="/login" replace state={{from : location}} />
    }

    return children
}
