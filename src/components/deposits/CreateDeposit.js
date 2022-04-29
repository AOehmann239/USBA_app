import React, { useState } from 'react'
import { Form, Container, Button } from 'react-bootstrap'
import { createDeposit } from '../../api/deposit'
import {createDepositSuccess, createDepositFailure} from '../shared/AutoDismissAlert/messages'
import { useNavigate } from 'react-router-dom'
import DepositForm from '../shared/DepositForm'

// create deposit renders a form and calls createDeposit function
// maybe redirect(navigate) to the new deposit show page
// props we'll need are user, msgAlert
const CreateDeposit = (props) => {
    const {user, msgAlert} = props
    console.log('user in create', user)
    const navigate = useNavigate()
    // we'll need two states
    const [deposit, setDeposit] = useState({amount: '', description: '',})
    console.log('deposit in create', deposit)
    //  an empty deposit object
    // and a createdId (used to navigate)
    // we'll need handleChange and handleSubmit funcs
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

        createDeposit(user, deposit)
            // if create is successful, we should navigate to the show page
            .then(res => {navigate(`/deposits/${res.data.deposit.id}`)})
            // then we send a success message
            .then(() =>
                msgAlert({
                    heading: 'Deposit Added! Success!',
                    message: createDepositSuccess,
                    variant: 'success',
                }))
            // if there is an error, we'll send an error message
            .catch(() =>
                msgAlert({
                    heading: 'Oh No!',
                    message: createDepositFailure,
                    variant: 'danger',
                }))
        // console.log('this is the deposit', deposit)
    }

    return (
        <DepositForm 
        deposit={deposit}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            heading="Add new deposit!"
        />
    )
}

export default CreateDeposit