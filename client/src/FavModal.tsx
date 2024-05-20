import React from 'react';
import styled from 'styled-components';

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
`;

const Cerrar = styled.button /*style*/ `
  position: absolute;
  top: 0;
  right: 0;
  margin-top: 1rem;
  margin-right: 1rem;
  background-color: #e74c3c;
`;

const FavModal = () =>{
    return(
<ModalOverlay >
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <h2>a</h2>
        <p>a</p>
        <p>Precio: </p>
        <Cerrar>X</Cerrar>
        <button >Añadir a Favoritos</button>
      </ModalContent>
    </ModalOverlay>

    )
}

export default FavModal