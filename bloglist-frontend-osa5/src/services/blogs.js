import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const likesComparator = (a, b) => (
  b.likes - a.likes
)

const getAll = () => {
  return axios
    .get(baseUrl)
    .then(response => response.data.sort(likesComparator))
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const create = async (newObject) => {
  const config = {
    headers: { 'Authorization': token }
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const remove = async (id) => {
  const config = {
    headers: { 'Authorization': token }
  }

  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default { getAll, setToken, create, update, remove }