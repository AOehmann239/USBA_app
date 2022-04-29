import React, { useState } from 'react'
import {Modal} from 'react-bootstrap'
import DepositForm from '../shared/DepositForm'

const EditDepositModal = (props) => {
    const { user, show, handleClose, updateDeposit, msgAlert, triggerRefresh } = props
    const [deposit, setDeposit] = useState(props.deposit)

    const handleChange = (e) => {
        // e === event
        e.persist()

        setDeposit(prevDeposit => {
            const name = e.target.name
            let value = e.target.value
            console.log('etarget type', e.target.type)
            console.log('this is e.target checked', e.target.checked)

            if (e.target.type === 'number') {
                value = parseInt(e.target.value)
            }

            const updatedValue = { [name]: value }

            console.log('prevDeposit', prevDeposit)
            console.log('updatedValue', updatedValue)

            return {...prevDeposit, ...updatedValue}
        })
    }

    const handleSubmit = (e) => {
        // e === event
        e.preventDefault()

        console.log('the deposit to submit', deposit)
        updateDeposit(user, deposit)
            // if create is successful, we should navigate to the show page
            .then(() => handleClose())
            // then we send a success message
            .then(() =>
                msgAlert({
                    heading: 'Deposit Updated! Success!',
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
        console.log('this is the deposit', deposit)
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
                <DepositForm 
                    deposit={deposit}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    heading="Edit deposit!"
                />
            </Modal.Body>
        </Modal>
    )
}
    
export default EditDepositModal