import React, { useState, useEffect } from 'react'
import { getAllDeposits } from '../../api/deposits'
import { Table, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {indexDepositsSuccess, indexDepositsFailure} from '../shared/AutoDismissAlert/messages'

// I'm going to declare a style object
// this will be used to corral my cards
// we can use basic CSS, but we have to use JS syntax
const cardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
}

const IndexDeposits = (props) => {
    const [deposits, setDeposits] = useState(null)

    const {user, msgAlert} = props

    useEffect(() => {
        getAllDeposits()
            .then(res => {
                setDeposits(res.data.deposits)
            })
            .then(() => {
                msgAlert({
                    heading: 'Found some deposits!',
                    message: indexDepositsSuccess,
                    variant: 'success',
                })
            })
            .catch(() => {
                msgAlert({
                    heading: 'No deposits?!!',
                    message: indexDepositsFailure,
                    variant: 'danger',
                })
            })
    }, [])

    if (!deposits) {
        return <p>loading...</p>
    } else if (deposits.length === 0) {
        return <p>no deposits yet, go add some</p>
    }
    const padTo2Digits = (num) => {
        return num.toString().padStart(2, '0')
    }
        
    const formatDate = (date) => {
        return [
            padTo2Digits(date.getMonth() + 1),
            padTo2Digits(date.getDate()),
            date.getFullYear(),
        ].join('/');
    }
    let depositTableItems
    let totalDeposits = 0
    deposits.forEach(deposit => {
        totalDeposits += deposit.amount
    })
    if (deposits.length > 0) {
        depositTableItems = deposits.map(deposit => (
            // one method of styling, usually reserved for a single style
            // we can use inline, just like in html
                <tr key={deposit.id}>
                    <td>{formatDate(new Date(deposit.date))}</td>
                    <td>{deposit.description}</td>
                    <td>${deposit.amount}</td>
                    <td><Link to={`/deposits/${deposit._id}`}>More info</Link></td>
                </tr>
            
        ))
    }
    return (
        <>
            <h3 className='page-title'>All My Deposits</h3>
            <Table striped bordered hover variant="dark" id='myTable'>
                <thead>
                    <tr>
                        <th>Date</th>
                        {/* tried to make an onclick to sort by vendor name, not working */}
                        {/* onClick={()=>sorting('vendor') */}
                        <th>Description</th>
                        <th>Amount</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {depositTableItems}
                </tbody>
            </Table>
            
            
            <div>Total: ${totalDeposits}</div>
        </>
    )
}

export default IndexDeposits