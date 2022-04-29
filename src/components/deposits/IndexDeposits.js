import React, { useState, useEffect } from 'react'
import { getAllDeposits } from '../../api/deposits'
import { Card } from 'react-bootstrap'
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

    let depositCards

    if (deposits.length > 0) {
        depositCards = vs.map(deposit => (
            // one method of styling, usually reserved for a single style
            // we can use inline, just like in html
            <Card key={deposit.id} style={{ width: '30%' }} className="m-2">
                <Card.Header>{deposit.fullTitle}</Card.Header>
                <Card.Body>
                    <Card.Text>
                        <Link to={`/deposits/${deposit.id}`}>View {deposit.name}</Link>
                    </Card.Text>
                </Card.Body>
            </Card>
        ))
    }

    return (
        <>
            <h3>All the deposits</h3>
            <div style={cardContainerLayout}>
                {depositCards}
            </div>
        </>
    )
}

export default IndexDeposits