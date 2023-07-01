import React from 'react'
import { useRoutes } from 'react-router-dom'
import { Router } from './Router'

export const Config = () => {
    const router=useRoutes(Router())
  return router
}
