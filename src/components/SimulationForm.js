import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  Checkbox,
  FormGroup,
  FormControl,
  FormControlLabel,
  Input,
  InputLabel,
  Button,
} from '@material-ui/core'
import { create } from '../service/simulation'
import async from 'async'
import uniqid from 'uniqid'

const SimulationForm = () => {
  const dispatch = useDispatch()
  const [choosenDoor, setChoosenDoor] = useState(null)
  const [changeDecision, setChangeDecision] = useState(false)
  const [simulationAmount, setSimulationAmount] = useState(0)

  const handleAmountChange = e => setSimulationAmount(Number(e.target.value))

  const handleDoorChange = e => setChoosenDoor(Number(e.target.value))

  const handleSubmit = e => {
    e.preventDefault()

    async.eachSeries(Array(simulationAmount), async () => {
      const firstDecision = choosenDoor - 1
      let finalDecision = firstDecision

      const id = uniqid()
      const car = Math.floor(Math.random() * 3)
      const doors = Array(3)
        .fill(null)
        .map((door, index) => (index === car ? 'car' : 'goat'))

      const eliminate = () => {
        const eliminatedDoor = Math.floor(Math.random() * 3)

        if (eliminatedDoor !== car && eliminatedDoor !== firstDecision) {
          return eliminatedDoor
        }

        return eliminate()
      }

      const eliminatedDoor = eliminate()

      changeDecision &&
        doors.map((door, index) => {
          if (index !== firstDecision && index !== eliminatedDoor) {
            finalDecision = index
          }
        })

      await create({
        id,
        doors,
        firstDecision,
        finalDecision,
        eliminatedDoor,
        won: finalDecision === car,
        decisionChanged: firstDecision !== finalDecision,
      })
        .then(res => {
          dispatch({ type: 'SET_SIMULATIONS', payload: [res.data] })
        })
        .catch(err => console.log(err))
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormGroup>
        <FormControl required>
          <InputLabel htmlFor="simulation-amount">
            Amount of simulations
          </InputLabel>
          <Input
            id="simulation-amount"
            type="number"
            inputProps={{ min: 1 }}
            onChange={handleAmountChange}
          />
        </FormControl>
      </FormGroup>

      <FormGroup>
        <FormControl required>
          <InputLabel htmlFor="simulation-amount">Choosen Door</InputLabel>
          <Input
            id="simulation-amount"
            type="number"
            inputProps={{ min: 1, max: 3 }}
            onChange={handleDoorChange}
          />
        </FormControl>
      </FormGroup>

      <FormGroup>
        <FormControlLabel
          label="Change decision on final"
          control={
            <Checkbox
              color="primary"
              checked={changeDecision}
              onChange={() => setChangeDecision(!changeDecision)}
            />
          }
        />
      </FormGroup>

      <Button type="submit" variant="contained" color="primary">
        Simulate
      </Button>
    </form>
  )
}

export default SimulationForm
