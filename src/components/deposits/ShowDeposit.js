import React, {useState, useEffect} from 'react'
import { getOneDeposit, updateDeposit, removeDeposit } from '../../api/deposits'
import { useParams, useNavigate } from 'react-router-dom'
import { Spinner, Container, Card, Button } from 'react-bootstrap'
import {showDepositSuccess, showDepositFailure} from '../shared/AutoDismissAlert/messages'
import EditDepositModal from './EditDepositModal'

const cardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
}

const ShowDeposit = (props) => {

    const [deposit, setDeposit] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)
    const [updated, setUpdated] = useState(false)
    const {user, msgAlert} = props
    const { id } = useParams()
    const navigate = useNavigate()
    console.log('id in showDeposit', id)
    // empty dependency array in useEffect to act like component did mount
    useEffect(() => {
        getOneDeposit(id)
            .then(res => setDeposit(res.data.deposit))
            .then(() => {
                msgAlert({
                    heading: 'Here is the deposit!',
                    message: showDepositSuccess,
                    variant: 'success',
                })
            })
            .catch(() => {
                msgAlert({
                    heading: 'No deposit found',
                    message: showDepositFailure,
                    variant: 'danger',
                })
            })
    }, [updated])

    const removeTheDeposit = () => {
        removeDeposit(user, deposit.id)
            .then(() => {
                msgAlert({
                    heading: 'deposit politely removed!',
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



    if (!deposit) {
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
                    <Card.Body>
                        <Card.Text>
                            <small>Amount: {deposit.amount}</small><br/>
                            <small>Description: {deposit.description}</small><br/>

                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <Button onClick={() => setModalOpen(true)} className="m-2" variant="warning">
                            Edit Deposit
                        </Button>
                        <Button onClick={() => removeTheDeposit()}className="m-2" variant="danger">
                            Delete Deposit
                        </Button>

                    </Card.Footer>
                </Card>
            </Container>
            <EditDepositModal 
                deposit={deposit}
                show={modalOpen}
                user={user}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
                updateDeposit={updateDeposit}
                handleClose={() => setModalOpen(false)}
            />
        </>
    )
}

export default ShowDeposit