import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useJwt } from './TokenContex';
import { useNavigate } from 'react-router-dom';


const ModalOverlay = styled.div /*style*/ `
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div /*style*/ `
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  color: black;
  position: relative;
  width:25%;
  height:15rem;
`;

const Cerrar = styled.button /*style*/ `
  position: absolute;
  top: 0;
  right: 0;
  margin-top: 1rem;
  margin-right: 1rem;
  background-color: #e74c3c;
`;

interface ModalProps{
  name: string,
  dimension:string,
  type: string,
  item_id: string
  closeModal ():void
  select:string
}

const FavModal:React.FC<ModalProps> = (props) =>{
  const navigate = useNavigate()
  const { parsedJwt } = useJwt();
  const [tokenId, setTokenId] = useState<string>(parsedJwt?.id)
  const addFavoriteLocation = async (userId:string, itemId:string,select:string) => {
    try {
        const response = await fetch(`https://rick-and-morty-backend-889d8aa11dad.herokuapp.com/exam/api/favorites/add-favorite-${select}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
          },
            body: JSON.stringify({ user_id: userId, item_id: itemId })
        });

        const data = await response.json();
        if (response.ok) {
            console.log('Favorite added successfully:', data);
        } else {
            console.error('Error adding favorite:', data);
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

useEffect(()=>{
  setTokenId(parsedJwt)
  
},[])


    return(
<ModalOverlay 

>
      <ModalContent>
        <h2>{props.name}</h2>
        <p>{props.dimension}</p>
        <p> {props.type}</p>
        <Cerrar
        onClick={props.closeModal}
        >X</Cerrar>
        <button 
       onClick={() => {
        if (tokenId) {
          addFavoriteLocation(tokenId, props?.item_id, props?.select).then(props.closeModal);
      
        } else {
          console.error('User ID is not available');
        }
      }}
        type='button'
        >Add To Favorites</button>
      </ModalContent>
    </ModalOverlay>

    )
}

export default FavModal