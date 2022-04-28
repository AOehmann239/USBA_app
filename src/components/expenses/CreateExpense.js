import React, { useState } from 'react'
import { Form, Container, Button } from 'react-bootstrap'
import { createExpense } from '../../api/expenses'
import {createExpenseSuccess, createExpenseFailure} from '../shared/AutoDismissAlert/messages'
import { useNavigate } from 'react-router-dom'
import ExpenseForm from '../shared/ExpenseForm'

// create expense renders a form and calls createExpense function
// maybe redirect(navigate) to the new expense show page
// props we'll need are user, msgAlert
const CreateExpense = (props) => {
    const {user, msgAlert} = props
    console.log('user in create', user)
    const navigate = useNavigate()
    // we'll need two states
    const [expense, setExpense] = useState({name: '', type: '', age: '', adoptable: false})
    console.log('expense in create', expense)
    //  an empty expense object
    // and a createdId (used to navigate)
    // we'll need handleChange and handleSubmit funcs
    const handleChange = (e) => {
        // e === event
        e.persist()

        setExpense(prevExpense => {
            const name = e.target.name
            let value = e.target.value
            console.log('etarget type', e.target.type)
            console.log('this is e.target checked', e.target.checked)

            if (e.target.type === 'number') {
                value = parseInt(e.target.value)
            }

            const updatedValue = { [name]: value }

            console.log('prevExpense', prevExpense)
            console.log('updatedValue', updatedValue)

            return {...prevExpense, ...updatedValue}
        })
    }

    const handleSubmit = (e) => {
        // e === event
        e.preventDefault()

        createExpense(user, expense)
            // if create is successful, we should navigate to the show page
            .then(res => {navigate(`/expenses/${res.data.expense.id}`)})
            // then we send a success message
            .then(() =>
                msgAlert({
                    heading: 'Expense Added! Success!',
                    message: createExpenseSuccess,
                    variant: 'success',
                }))
            // if there is an error, we'll send an error message
            .catch(() =>
                msgAlert({
                    heading: 'Oh No!',
                    message: createExpenseFailure,
                    variant: 'danger',
                }))
        // console.log('this is the expense', expense)
    }

    return (
        <ExpenseForm 
        expense={expense}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            heading="Add new expense!"
        />
    )
}

export default CreateExpense