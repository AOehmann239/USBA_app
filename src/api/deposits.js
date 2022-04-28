import apiUrl from '../apiConfig'
import axios from 'axios'

export const getAllDeposits = () => {
    return axios(`${apiUrl}/deposits`)
}

// show function 
export const getOneDeposit = (depositId) => {
    return axios(`${apiUrl}/deposits/${depositId}`)
}

// post -> create 
export const createDeposit = (user, newDeposit) => {
    return axios({
        url: `${apiUrl}/deposits`,
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: {deposit: newDeposit}
    })
}

// PATCH -> update function
export const updateDeposit = (user, updatedDeposit) => {
    console.log('user', user)
    console.log('this is newDeposit', updatedDeposit)
    return axios({
        url: `${apiUrl}/deposits/${updatedDeposit._id}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { deposit: updatedDeposit }
    })
}

// DELETE -> remove function
export const removeDeposit = (user, depositId) => {
    console.log('user', user)
    return axios({
        url: `${apiUrl}/deposits/${depositId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}

