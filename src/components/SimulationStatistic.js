import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import uniqid from 'uniqid'

const SimulationStatistic = () => {
  const simulations = useSelector(state => state)
  const [statistics, setStatistics] = useState([])

  useEffect(() => {
    const all = {
      label: 'All Simulations',
      value: simulations.length,
    }

    const changedDecisions = {
      label: 'Changed Decisions on Final',
      value: simulations.filter(simulation => simulation.decisionChanged)
        .length,
    }

    const winnerAfterDecisionChange = {
      label: 'Winner who Changed Their Decisions on Final',
      value: simulations.filter(
        simulation => simulation.decisionChanged && simulation.won
      ).length,
    }

    const winnerProcentAfterDecisionChange = {
      label: 'Procent of Winners After Decision Change',
      value: `${
        (Number(winnerAfterDecisionChange.value) /
          Number(changedDecisions.value)) *
          100 || 0
      }%`,
    }

    setStatistics([
      all,
      changedDecisions,
      winnerAfterDecisionChange,
      winnerProcentAfterDecisionChange,
    ])
  }, [simulations])

  return (
    <dl key={uniqid()}>
      {statistics.map(statistic => {
        return (
          <React.Fragment key={uniqid()}>
            <dt key={uniqid()}>{statistic.label}</dt>
            <dd key={uniqid()}>{statistic.value}</dd>
          </React.Fragment>
        )
      })}
    </dl>
  )
}

export default SimulationStatistic
