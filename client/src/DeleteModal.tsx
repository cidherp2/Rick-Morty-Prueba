import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useJwt } from './TokenContex';


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



interface ModalProps {
    item_id: string
    closeModal ():void
  }

const DeleteModal:React.FC<ModalProps>  = (props) =>{

    const  deleteFavorite = async (favoriteId: string): Promise<void> => {
        try {
            const response = await fetch(`https://rick-and-morty-backend-889d8aa11dad.herokuapp.com/exam/api/favorites//delete-fav-char/${favoriteId}`, {
                method: 'DELETE',
            });
    
            if (response.ok) {
                console.log('Favorite deleted successfully');
            } else {
                console.error('Failed to delete favorite');
            }
        } catch (error) {
            console.error('Error deleting favorite:', error);
        }
    }

    return(
<ModalOverlay 

>
      <ModalContent>
        <h2>Delete from favorites</h2>
        <Cerrar
        onClick={props.closeModal}
        >X</Cerrar>
        <button 
    
        onClick={()=>{if(props?.item_id){
            deleteFavorite(props?.item_id).then(props.closeModal)
        }}}
        style={{background:"#e74c3c", color:"white",height:"8rem"}}
        type='button'
        >Delete From Favorites</button>
      </ModalContent>
    </ModalOverlay>

    )
}

export default DeleteModal