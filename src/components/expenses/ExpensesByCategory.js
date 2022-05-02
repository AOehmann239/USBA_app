// import React, { useState, useEffect } from 'react'
// import { getAllExpenses } from '../../api/expenses'
// import { Card, Table, Button } from 'react-bootstrap'
// import { Link } from 'react-router-dom'
// import {indexExpensesSuccess, indexExpensesFailure} from '../shared/AutoDismissAlert/messages'

// // I'm going to declare a style object
// // this will be used to corral my cards
// // we can use basic CSS, but we have to use JS syntax


// const ExpensesByCategory = (props) => {
//     const [expenses, setExpenses] = useState(null)

//     const {user, msgAlert} = props

//     useEffect(() => {
//         getAllExpenses()
//             .then(res => {
//                 setExpenses(res.data.expenses)
//             })
//             .then(() => {
//                 msgAlert({
//                     heading: 'Found some expenses!',
//                     message: indexExpensesSuccess,
//                     variant: 'success',
//                 })
//             })
//             .catch(() => {
//                 msgAlert({
//                     heading: 'No expenses?!!',
//                     message: indexExpensesFailure,
//                     variant: 'danger',
//                 })
//             })
//     }, [])

//     if (!expenses) {
//         return <p>loading...</p>
//     } else if (expenses.length === 0) {
//         return <p>no expenses yet, go add some</p>
//     }
//         const padTo2Digits = (num) => {
//             return num.toString().padStart(2, '0')
//         }
        
//         const formatDate = (date) => {
//             return [
//                 padTo2Digits(date.getMonth() + 1),
//                 padTo2Digits(date.getDate()),
//                 date.getFullYear(),
//             ].join('/');
//         }
//         let expenseTableItems

//         if (expenses.length > 0) {
//             expenses.forEach(expense => {
//               if expense.category ===  "rent/utilities/phone"
//                 expenseTableItems = expenses.map(expense => (
//                     // one method of styling, usually reserved for a single style
//                     // we can use inline, just like in html
//                         <th>Rent/Utilities/Phone Expenses</th>
//                         <tr>
//                             <td>{formatDate(new Date(expense.date))}</td>
//                             <td>{expense.vendor}</td>
//                             <td>${expense.amount}</td>
//                             <td><Link to={`/expenses/${expense._id}`}>More info</Link></td>
//                         </tr>
//                 ))
//                 if expense.category ===  "car/transportation/gas"
//                 expenseTableItems = expenses.map(expense => (
//                     // one method of styling, usually reserved for a single style
//                     // we can use inline, just like in html
//                         <th>Rent/Utilities/Phone Expenses</th>
//                         <tr>
//                             <td>{formatDate(new Date(expense.date))}</td>
//                             <td>{expense.vendor}</td>
//                             <td>${expense.amount}</td>
//                         </tr>
//                 ))
//                 if expense.category ===  "groceries"
//                 expenseTableItems = expenses.map(expense => (
//                     // one method of styling, usually reserved for a single style
//                     // we can use inline, just like in html
//                         <th>Grocery Expenses</th>
//                         <tr>
//                             <td>{formatDate(new Date(expense.date))}</td>
//                             <td>{expense.vendor}</td>
//                             <td>${expense.amount}</td>
//                         </tr>
//                 ))
//                 if expense.category ===  "personal necessary"
//                 expenseTableItems = expenses.map(expense => (
//                     // one method of styling, usually reserved for a single style
//                     // we can use inline, just like in html
//                         <th>Personal Necessary Expenses</th>
//                         <tr>
//                             <td>{formatDate(new Date(expense.date))}</td>
//                             <td>{expense.vendor}</td>
//                             <td>${expense.amount}</td>
//                         </tr>
//                 ))
//                 if expense.category ===  "personal unnecessary"
//                 expenseTableItems = expenses.map(expense => (
//                     // one method of styling, usually reserved for a single style
//                     // we can use inline, just like in html
//                         <th>Personal Unnecessary Expenses</th>
//                         <tr>
//                             <td>{formatDate(new Date(expense.date))}</td>
//                             <td>{expense.vendor}</td>
//                             <td>${expense.amount}</td>
//                         </tr>
//                 ))
//                 if expense.category ===  "other"
//                 expenseTableItems = expenses.map(expense => (
//                     // one method of styling, usually reserved for a single style
//                     // we can use inline, just like in html
//                         <th>Other Expenses</th>
//                         <tr>
//                             <td>{formatDate(new Date(expense.date))}</td>
//                             <td>{expense.vendor}</td>
//                             <td>${expense.amount}</td>
//                         </tr>
//                 ))
//                 if expense.category ===  "investment"
//                 expenseTableItems = expenses.map(expense => (
//                     // one method of styling, usually reserved for a single style
//                     // we can use inline, just like in html
//                         <th>Investment Expenses</th>
//                         <tr>
//                             <td>{formatDate(new Date(expense.date))}</td>
//                             <td>{expense.vendor}</td>
//                             <td>${expense.amount}</td>
//                         </tr>
//                 ))
//             }
//         )}

//     return (
//         <>
//             <h3 className='page-title'>All the expenses</h3>
//             <Table striped bordered hover variant="dark">
//                 <thead>
//                     <tr>
//                         <th>Date</th>
//                         <th>Vendor</th>
//                         <th>Amount</th>
//                         <th></th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {expenseTableItems}
//                 </tbody>
//             </Table>
//             <Link to="/expensesByCategory">
//   				<Button className='app-select-button' id='button3'>Breakdown By Category</Button>
// 			</Link>
//         </>
//     )
// }

// export default ExpensesByCategory

 