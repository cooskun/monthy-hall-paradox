import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import SimulationForm from './components/SimulationForm'
import SimulationStatistic from './components/SimulationStatistic'
import { getAll } from './service/simulation'
import './App.scss'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    getAll().then(res => {
      dispatch({ type: 'SET_SIMULATIONS', payload: res.data })
    })
  }, [])

  return (
    <div className="App">
      <SimulationForm />
      <SimulationStatistic />
    </div>
  )
}

export default App
