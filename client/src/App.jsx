import { useState } from 'react'

import {
  Routes,
  Route,
  Link,
  NavLink,

} from "react-router-dom";
import Company from './components/Company'
import Detail from './components/Detail'
import Timvieclam from './components/Timvieclam';
function App() {
  const [count, setCount] = useState(0)

  return (
    
      // <Company/>
      <Routes>
          <Route exact path="/"  element={<Company/>} />
          <Route path="/detail/:id" element={<Detail></Detail>} />
          <Route path="/timvieclam/:id" element={<Timvieclam></Timvieclam>} />
      </Routes>
  )
}

export default App
