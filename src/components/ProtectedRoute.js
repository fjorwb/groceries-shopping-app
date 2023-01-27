import React from 'react'

import PropTypes from 'prop-types'

import { Navigate, Outlet } from 'react-router-dom'

export const ProtectedRoute = ({ isAllowed, redirectTo = '/', children }) => {
  if (!isAllowed) {
    return <Navigate to={redirectTo} replace />
  }

  return children || <Outlet />
}

ProtectedRoute.propTypes = {
  isAllowed: PropTypes.bool.isRequired,
  redirectTo: PropTypes.string,
  children: PropTypes.node
}
