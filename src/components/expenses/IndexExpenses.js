import React, { useState, useEffect } from 'react'
import { getAllExpenses } from '../../api/expenses'
import { getAllDeposits } from '../../api/deposits'
import { Table, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {indexExpensesSuccess, indexExpensesFailure, indexDepositsFailure, indexDepositsSuccess} from '../shared/AutoDismissAlert/messages'

const IndexExpenses = (props) => {
    const [expenses, setExpenses] = useState(null)
    const [deposits, setDeposits] = useState(null)
    const [order, setorder] = useState('ASC')
    const {user, msgAlert} = props

    useEffect(() => {
        getAllExpenses()
            .then(res => {
                setExpenses(res.data.expenses)
            })
            .then(() => {
                msgAlert({
                    heading: 'Found some expenses!',
                    message: indexExpensesSuccess,
                    variant: 'success',
                })
            })
            .catch(() => {
                msgAlert({
                    heading: 'No expenses?!!',
                    message: indexExpensesFailure,
                    variant: 'danger',
                })
            })
    }, [])
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
    if (!expenses) {
        return <p>loading...</p>
    } else if (expenses.length === 0) {
        return <p>no expenses yet, go add some</p>
    }
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
    let expenseTableItems
    let totalExpenses = 0
    let totalRentExp = 0
    let totalTranspExp = 0
    let totalGroceryExp = 0
    let totalUnnecessaryExp = 0
    let totalNecessaryExp = 0
    let totalOtherExp = 0
    let totalInvestExp = 0
    let totalDeposits = 0
    let netDinero = 0
   
    expenses.forEach(expense => {
        if (expense.category === "Rent/Utilities/Phone"){
            totalRentExp += expense.amount
        }
        if (expense.category === "Car/Transportation/Gas"){
            totalTranspExp += expense.amount
        }
        if (expense.category === "Groceries"){
            totalGroceryExp += expense.amount
        }
        if (expense.category === "Personal Necessary"){
            totalNecessaryExp += expense.amount
        }
        if (expense.category === "Personal Unnecessary"){
            totalUnnecessaryExp += expense.amount
        }
        if (expense.category === "Other"){
            totalOtherExp += expense.amount
        }
        if (expense.category === "Investment"){
            totalInvestExp += expense.amount
        }
    })
    expenses.forEach(expense => {
        totalExpenses += expense.amount
    })
    deposits.forEach(deposit => {
       totalDeposits += deposit.amount
    })
    if (expenses.length > 0) {
        expenseTableItems = expenses.map(expense => (
            // one method of styling, usually reserved for a single style
            // we can use inline, just like in html
                <tr key={expense.id}>
                    <td>{formatDate(new Date(expense.date))}</td>
                    <td>{expense.vendor}</td>
                    <td>${expense.amount}</td>
                    <td><Link to={`/expenses/${expense._id}`}>More info</Link></td>
                </tr>
            
        ))
    }
        // const sorting = (col) => {
        //     if (order === 'ASC'){
        //         const sorted = [...expenses].sort((a, b) =>
        //             a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1);
        //         getAllExpenses(sorted)
        //         setorder('DSC')
        //     }
        //     if (order === 'DSC'){
        //         const sorted = [...expenses].sort((a, b) =>
        //             a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1)
        //         getAllExpenses(sorted)
        //         setorder('ASC')
        //     }
        // }
    return (
        <>
            <h3 className='page-title'>All the expenses</h3>
            <Table striped bordered hover variant="dark" id='myTable'>
                <thead>
                    <tr>
                        <th>Date</th>
                        {/* tried to make an onclick to sort by vendor name, not working */}
                        {/* onClick={()=>sorting('vendor') */}
                        <th>Vendor</th>
                        <th>Amount</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {expenseTableItems}
                </tbody>
            </Table>
            <Link to="/expensesByCategory">
  				<Button className='app-select-button' id='button3'>Breakdown By Category</Button>
			</Link>
            <div>Total Expenses: ${totalExpenses}</div>
            <div>By Category--</div>
            <div>Rent/Utilities/Phone: ${totalRentExp}</div>
            <div>Car/Transportation/Gas: ${totalTranspExp}</div>
            <div>Groceries: ${totalGroceryExp}</div>
            <div>Personal Necessary: ${totalNecessaryExp}</div>
            <div>Personal Unnecessary: ${totalUnnecessaryExp}</div>
            <div>Other: ${totalOtherExp}</div>
            <div>Investment: ${totalInvestExp}</div>
            <div>Total deposits: ${totalDeposits}</div> 
            <div>Net Dinero: ${totalDeposits-totalExpenses}</div> 
        </>
    )
}

export default IndexExpenses

 