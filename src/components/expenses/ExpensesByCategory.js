import React, { useState, useEffect } from 'react'
import {useTable, useSortBy } from 'react-table'
import { getAllExpenses } from '../../api/expenses'
import { Card, Table, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {indexExpensesSuccess, indexExpensesFailure} from '../shared/AutoDismissAlert/messages'

// I'm going to declare a style object
// this will be used to corral my cards
// we can use basic CSS, but we have to use JS syntax


const ExpensesByCategory = (props) => {
    const [expenses, setExpenses] = useState(null)
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

    if (!expenses) {
        return <p>loading...</p>
    } else if (expenses.length === 0) {
        return <p>no expenses yet, go add some</p>
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
    //initializing the totals at 0, setting up the variables
    let rentTableItems
    let transpoTableItems
    let groceryTableItems
    let necessaryTableItems
    let unnecessaryTableItems
    let otherTableItems
    let investmentTableItems
    let totalRentExp = 0
    let totalTranspExp = 0
    let totalGroceryExp = 0
    let totalUnnecessaryExp = 0
    let totalNecessaryExp = 0
    let totalOtherExp = 0
    let totalInvestExp = 0
    //getting the individual totals per category 
    expenses.forEach(expense => {
        if (expense.category === "Rent/Utilities/Phone"){
            totalRentExp += expense.amount
            rentTableItems = expenses.map(expense => (
                // one method of styling, usually reserved for a single style
                // we can use inline, just like in html
                    <tr key={expense.id}>
                        <td>{formatDate(new Date(expense.date))}</td>
                        <td>{expense.vendor}</td>
                        <td>${expense.amount}</td>
                        <td><Link to={`/expenses/${expense._id}`}>More info</Link></td>
                    </tr> 
            ))
            console.log(rentTableItems, "These are the rent items")
        }
        if (expense.category === "Car/Transportation/Gas"){
            totalTranspExp += expense.amount
            transpoTableItems = expenses.map(expense => (
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
        if (expense.category === "Groceries"){
            totalGroceryExp += expense.amount
            groceryTableItems = expenses.map(expense => (
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
        if (expense.category === "Personal Necessary"){
            totalNecessaryExp += expense.amount
            necessaryTableItems = expenses.map(expense => (
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
        if (expense.category === "Personal Unnecessary"){
            totalUnnecessaryExp += expense.amount
            unnecessaryTableItems = expenses.map(expense => (
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
        if (expense.category === "Other"){
            totalOtherExp += expense.amount
            otherTableItems = expenses.map(expense => (
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
        if (expense.category === "Investment"){
            totalInvestExp += expense.amount
            investmentTableItems = expenses.map(expense => (
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
    })
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
            <h3 className='page-title'>Expenses by Category</h3>
            <h4>Rent/Utilities/Phone</h4><div>Total: ${totalRentExp}</div>
            <Table striped bordered hover variant="dark" id='rentTable'>
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
                    {rentTableItems}
                </tbody>
            </Table>
                
            <h4>Car/Transportation/Gas</h4><div>Total: ${totalTranspExp}</div>
            <Table striped bordered hover variant="dark" id='rentTable'>
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
                    {transpoTableItems}
                </tbody>
            </Table>
                
            <h4>Groceries</h4><div>Total: ${totalGroceryExp}</div>
            <Table striped bordered hover variant="dark" id='rentTable'>
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
                    {groceryTableItems}
                </tbody>
            </Table>
                
            <h4>Personal Necessary</h4><div>Total: ${totalNecessaryExp}</div>
            <Table striped bordered hover variant="dark" id='rentTable'>
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
                    {necessaryTableItems}
                </tbody>
            </Table>
                
            <h4>Personal Unnecessary</h4><div>Total: ${totalUnnecessaryExp}</div>
            <Table striped bordered hover variant="dark" id='rentTable'>
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
                    {unnecessaryTableItems}
                </tbody>
            </Table>
                
            <h4>Investment</h4><div>Total: ${totalInvestExp}</div>
            <Table striped bordered hover variant="dark" id='rentTable'>
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
                    {investmentTableItems}
                </tbody>
            </Table>
                
            <h4>Other</h4><div>Total: ${totalOtherExp}</div>
            <Table striped bordered hover variant="dark" id='rentTable'>
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
                    {otherTableItems}
                </tbody>
            </Table>
                

        
        </>
    )
}

export default ExpensesByCategory

 