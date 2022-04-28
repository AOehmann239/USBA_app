import apiUrl from '../apiConfig'
import axios from 'axios'

export const getAllExpenses = () => {
    return axios(`${apiUrl}/expenses`)
}

// show function 
export const getOneExpense = (expenseId) => {
    return axios(`${apiUrl}/expenses/${expenseId}`)
}

// post -> create 
export const createExpense = (user, newExpense) => {
    return axios({
        url: `${apiUrl}/expenses`,
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: {expense: newExpense}
    })
}

// PATCH -> update function
export const updateExpense = (user, updatedExpense) => {
    console.log('user', user)
    console.log('this is newExpense', updatedExpense)
    return axios({
        url: `${apiUrl}/expenses/${updatedExpense._id}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { expense: updatedExpense }
    })
}

// DELETE -> remove function
export const removeExpense = (user, expenseId) => {
    console.log('user', user)
    return axios({
        url: `${apiUrl}/expenses/${expenseId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}

