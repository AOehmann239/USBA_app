import React, { useState, useEffect } from 'react';
import {
  getOneDeposit,
  updateDeposit,
  removeDeposit,
} from '../../api/deposits';
import { createFavorite, getAllFavorites } from '../../api/favorites';
import { Spinner, Container, Card, Button } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom';
import EditDepositModal from './EditDepositModal';

const cardContainerLayout = {
  display: 'flex',
  justifyContent: 'center',
  flexFlow: 'row wrap',
};

const ShowDeposit = (props) => {
  const [deposit, setDeposit] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [hidden, setHidden] = useState(false)
  // const [favoriteArray, setFavoriteArray]  = useState([])
  const { user, msgAlert } = props;
  const { id } = useParams();
  const navigate = useNavigate();
  // console.log('id in showDeposit', deposit._id);
  useEffect(() => {
    getOneDeposit(id)
      .then((res) => {
        setDeposit(res.data.deposit)
        console.log(res.data.deposit)
        isFavorite()
      })
      .then(() => {
        msgAlert({
          heading: 'Here is the deposit!',
          variant: 'success',
        });
      })
      .catch(() => {
        msgAlert({
          heading: 'No deposit found',
          variant: 'danger',
        });
      });
  }, [updated]);

  const removeTheDeposit = () => {
    removeDeposit(user, deposit._id)
      .then(() => {
        msgAlert({
          heading: 'deposit politely removed!',
          message: "they're gone",
          variant: 'success',
        });
      })
      .then(() => {
        navigate(`/`);
      })
      .catch(() => {
        msgAlert({
          heading: 'something went wrong',
          message: 'that aint it',
          variant: 'danger',
        });
      });
  };

console.log('IS THE HIDDEN CHANGING TO TRUE???: ', hidden)

  //let reviews

  if (!deposit) {
    return <span style = {{backgroundColor: "#ff990083" , height: "100%"}}>Loading...</span>;
  }
  // console.log('USER', user)
  // console.log('DEPOSIT', deposit)
  try{
  
  const productOwnerId = product
  console.log('Product Owner Id', productOwnerId)
            // check to see if there is a user signed in and if the product has an owner
            if(user && product.owner._id){
              // check to see if the user id matches the product owner's ID & display conditional 'edit' and 'delete' buttons
              if (user._id === product.owner._id){
                return (
                <body className='col-sm-10 col-md-8 mx-auto mt-5' style = {{backgroundColor: "rgb(255 153 0 / 0%)", height: "100%"}}>  
                        <h1>{product.name}</h1>
                        <img
                          src={`${product.image}`}
                          alt=""
                          style={{ height: '200px' }}
                          class="img-thumbnail"
                        />
                        <p>Description: {product.description}</p>
                        <p>Price: {product.price}</p>
                        <p>Category: {product.category}</p>
                        <small>Available: {product.available ? 'yes' : 'no'}</small> <br/>
                        <button style={{ borderRadius:'30px'}} onClick={() => removeTheProduct()}>Delete Product</button>
                        <button style={{ borderRadius:'30px'}}onClick={() => setModalOpen(true)}>Edit Product</button>
                        <button style={{ borderRadius:'30px'}}onClick={() => setReviewModalOpen(true)}>Give a Product Review?</button>
                        <button style={{ borderRadius:'30px', display: hidden ? 'none' : 'block'}} onClick={() => addFavorite()}>Add to Favorites</button>              
                      <p> {reviewCards}</p> 
                 
                    <EditProductModal
                      product={product}
                      show={modalOpen}
                      user={user}
                      msgAlert={msgAlert}
                      // triggerRefresh={() => setUpdated((prev) => !prev)}
                      updateProduct={updateProduct}
                      handleClose={() => setModalOpen(false)}
                    />
                    <CreateReviewModal
                    product={product}
                    show={reviewModalOpen}
                    user={user}
                    msgAlert={msgAlert}
                    triggerRefresh={() => setUpdated(prev => !prev)}
                    handleClose={() => setReviewModalOpen(false)}
                    
                    />
                  </body>
                
                )
              }
            }
  } catch(error){
    console.log('ERROR:', error)
  }

  if(user){
    return (
      <body className='col-lg-10 col-md-8 mx-auto mt-5' style = {{backgroundColor: "rgb(255 153 0 / 0%)", height: "100%"}}> 
        <h1>{product.name}</h1>
        <img
          src={`${product.image}`}
          alt=""
          style={{ height: '200px' }}
          class="img-thumbnail"
        />
        <p>Description: {product.description}</p>
        <p>Price: {product.price}</p>
        <p>Category: {product.category}</p>
        <small>Available: {product.available ? 'yes' : 'no'}</small>
        <button style={{ borderRadius:'30px', display: hidden ? 'none' : 'block'}} onClick={() => addFavorite()}>Add to Favorites</button> 
        <button onClick={() => setReviewModalOpen(true)}>Give a Product Review?</button> 
        <p> {reviewCards}</p> 
        <EditProductModal
          product={product}
          show={modalOpen}
          user={user}
          msgAlert={msgAlert}
          triggerRefresh={() => setUpdated((prev) => !prev)}
          updateProduct={updateProduct}
          handleClose={() => setModalOpen(false)}
        />
         <CreateReviewModal
          product={product}
          show={reviewModalOpen}
          user={user}
          msgAlert={msgAlert}
          triggerRefresh={() => setUpdated(prev => !prev)}
          handleClose={() => setReviewModalOpen(false)}
          />
      </body>
    )

  }

    return (
      <>
        <h1>{product.name}</h1>
        <img
          src={`${product.image}`}
          alt=""
          style={{ height: '200px' }}
          class="img-thumbnail"
        />
        <p>Description: {product.description}</p>
        <p>Price: {product.price}</p>
        <p>Category: {product.category}</p>
        <small>Available: {product.available ? 'yes' : 'no'}</small>
        <button onClick={() => setReviewModalOpen(true)}>Give a Product Review?</button>
        <p> {reviewCards}</p> 
        <EditProductModal
          product={product}
          show={modalOpen}
          user={user}
          msgAlert={msgAlert}
          triggerRefresh={() => setUpdated((prev) => !prev)}
          updateProduct={updateProduct}
          handleClose={() => setModalOpen(false)}
        />
         <CreateReviewModal
          product={product}
          show={reviewModalOpen}
          user={user}
          msgAlert={msgAlert}
          triggerRefresh={() => setUpdated(prev => !prev)}
          handleClose={() => setReviewModalOpen(false)}
          />
      </>
    );
  };


export default ShowProduct;