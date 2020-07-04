import axios from 'axios'

 const instance = axios.create({
    baseURL: 'https://burger-92fde.firebaseio.com/'
})

export default instance