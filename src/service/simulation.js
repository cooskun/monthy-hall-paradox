import axios from 'axios'

const baseURL = 'http://localhost:3001/simulations'

export const getAll = () => axios.get(baseURL)

export const create = newSimulation => axios.post(baseURL, newSimulation)
