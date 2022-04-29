import React, { useState, useEffect } from 'react'
import { getAllExpenses } from '../../api/expenses'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {indexExpensesSuccess, indexExpensesFailure} from '../shared/AutoDismissAlert/messages'

// I'm going to declare a style object
// this will be used to corral my cards
// we can use basic CSS, but we have to use JS syntax
const cardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
}

const IndexExpenses = (props) => {
    const [expenses, setExpenses] = useState(null)

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

    let expenseCards

    if (expenses.length > 0) {
        expenseCards = expenses.map(expense => (
            // one method of styling, usually reserved for a single style
            // we can use inline, just like in html
            <Card key={expense.id} style={{ width: '30%' }} className="m-2">
                <Card.Header>{expense.fullTitle}</Card.Header>
                <Card.Body>
                    <Card.Text>
                        <Link to={`/expenses/${expense.id}`}>View {expense.name}</Link>
                    </Card.Text>
                </Card.Body>
            </Card>
        ))
    }

    return (
        <>
            <h3>All the expenses</h3>
            <div style={cardContainerLayout}>
                {expenseCards}
            </div>
        </>
    )
}

export default IndexExpenses