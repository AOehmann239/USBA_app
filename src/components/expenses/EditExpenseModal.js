import React, { useState } from 'react'
import {Modal} from 'react-bootstrap'
import ExpenseForm from '../shared/ExpenseForm'

const EditExpenseModal = (props) => {
    const { user, show, handleClose, updatePet, msgAlert, triggerRefresh } = props
    const [expense, setExpense] = useState(props.expense)

    const handleChange = (e) => {
        // e === event
        e.persist()

        setExpense(prevExpense => {
            const name = e.target.name
            let value = e.target.value
            console.log('etarget type', e.target.type)
            console.log('this is e.target checked', e.target.checked)
            if(name === "adoptable" && e.target.checked){
                value = true
            } else if (name === "adoptable" && !e.target.checked){
                value = false
            }

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

        console.log('the expense to submit', expense)
        updateExpense(user, expense)
            // if create is successful, we should navigate to the show page
            .then(() => handleClose())
            // then we send a success message
            .then(() =>
                msgAlert({
                    heading: 'Expense Updated! Success!',
                    message: 'u did it',
                    variant: 'success',
                }))
            .then(() => triggerRefresh())
            // if there is an error, we'll send an error message
            .catch(() =>
                msgAlert({
                    heading: 'Oh No!',
                    message: 'that aint it',
                    variant: 'danger',
                }))
        console.log('this is the expense', expense)
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
                <ExpenseForm 
                    expense={expense}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    heading="Edit expense!"
                />
            </Modal.Body>
        </Modal>
    )
}
    
export default EditExpenseModal