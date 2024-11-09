
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AuthLayout from '../Layout/Auth.layout'

const AuthHoc= ({Component, ...rest}) => {
  return (
    <Routes>
        <Route {...rest} Component={(props) => (
            <AuthLayout>
                <Component {...props} />
            </AuthLayout>
        )} />
    </Routes>
  )
}

export default AuthHoc;