import axios from 'axios'

export const getUsers = () => axios.get('https://reqres.in/api/users')
