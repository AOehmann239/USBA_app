import React, {useState, useEffect} from 'react'
import { getOneimport React, {useState, useEffect} from 'react'
import { getOneExpense, updateExpense, removeExpense } from '../../api/expenses'
import { useParams, useNavigate } from 'react-router-dom'
import { Spinner, Container, Card, Button } from 'react-bootstrap'
import {showExpenseSuccess, showExpenseFailure} from '../shared/AutoDismissAlert/messages'
import EditExpenseModal from './EditExpenseModal'

const cardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
}

const ShowExpense = (props) => {

    const [expense, setExpense] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)
    const [updated, setUpdated] = useState(false)
    const {user, msgAlert} = props
    const { id } = useParams()
    const navigate = useNavigate()
    console.log('id in showExpense', id)
    // empty dependency array in useEffect to act like component did mount
    useEffect(() => {
        getOneExpense(id)
            .then(res => setExpense(res.data.expense))
            .then(() => {
                msgAlert({
                    heading: 'Here is the expense!',
                    message: showExpenseSuccess,
                    variant: 'success',
                })
            })
            .catch(() => {
                msgAlert({
                    heading: 'No expense found',
                    message: showExpenseFailure,
                    variant: 'danger',
                })
            })
    }, [updated])

    const removeTheExpense = () => {
        removeExpense(user, expense.id)
            .then(() => {
                msgAlert({
                    heading: 'expense politely removed!',
                    message: 'theyre gone',
                    variant: 'success',
                })
            })
            .then(() => {navigate(`/`)})
            .catch(() => {
                msgAlert({
                    heading: 'something went wrong',
                    message: 'that aint it',
                    variant: 'danger',
                })
            })
    }

    }

    if (!expense) {
        return (
            <Container fluid className="justify-content-center">
                <Spinner animation="border" role="status" variant="warning" >
                    <span className="visually-hidden">Loading....</span>
                </Spinner>
            </Container>
        )
    }

    return (
        <>
            <Container className="fluid">
                <Card>
                    <Card.Header>{expense.vendor}</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <small>Amount: {expense.amount}</small><br/>
                            <small>Vendor: {expense.vendor}</small><br/>
                            <small>Description: {expense.description}</small><br/>
                            <small>Date: {expense.date}</small><br/>

                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <Button onClick={() => setModalOpen(true)} className="m-2" variant="warning">
                            Edit Expense
                        </Button>
                        <Button onClick={() => removeTheExpense()}className="m-2" variant="danger">
                            Delete Expense
                        </Button>

                    </Card.Footer>
                </Card>
            </Container>
            
            <EditExpenseModal 
                expense={expense}
                show={modalOpen}
                user={user}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
                updateExpense={updateExpense}
                handleClose={() => setModalOpen(false)}
            />
        </>
    )
}

export default ShowExpense
