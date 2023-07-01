
import React from 'react';
 


import { useState } from 'react'
import { Router } from './containers/Router'
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import { Config } from './containers/Config';

function App() {
  const [count, setCount] = useState(0)


  return (
    <div style={{ fontFamily: 'Roboto, sans-serif' }}>
      <Config />

    </div>

      
  )
}

export default App