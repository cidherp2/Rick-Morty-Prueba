import styled from "styled-components";
import { useEffect, useState } from "react";
import { Character } from "./utils/charTypes";

const ScrollContainer = styled.div /*style*/ `
margin-top: 2rem;
width:100vw;
height:100vh ;
display:flex;
flex-direction:row;
flex-wrap:wrap;
gap:1rem;
justify-content:center;
`
const CharCard = styled.div /*style*/ `
width:20%;
height:26rem ;
background:white;
display:flex;
flex-direction:column;
align-items:center;
border-radius:2rem;
font-weight:100;
box-shadow: 0px 4.59475px 4.59475px rgba(0, 0, 0, 0.25);
:hover{
opacity: .9;
cursor: pointer;
}
.nameText{
font-size:.9rem;

}
.speciesText{
font-size:.9rem;
}
.originText{
font-size:.9rem;
}
.margins{
margin:none !important;
}

`
const ImgCont = styled.div /*style*/ `
width:90%;
height:70%;
overflow: hidden; 
border-radius:2rem;
:hover{
opacity: .9;

}
`
const CardInfo = styled.div /*style*/ `
width:100%;
height:50%;
display:flex;
flex-direction:column;
justify-content:center;
align-items:flex-start;
padding-left:1rem;
gap:1;
`
const CharImg = styled.img /*style*/`
    object-fit:cover;
    width: 100%;
    height:auto;
    position: relative;
    transform:scale(1.2);
    object-position:50% 50%;

  `;

const Characters = () => {
    type CharacterArray = {
        Characters: Character | null
      };

    const [chars, setChars] = useState<Character[]>([])
   
    const fetchCharacters = async () => {
        try {
            const response = await fetch("https://rickandmortyapi.com/api/character")
            if (!response.ok) {
                console.log("bad response from server")
            }
            const characters = await response.json()
            setChars(characters.results)
            console.log(characters)
        }
        catch (err) {

        }

    }
    useEffect(() => {
        fetchCharacters()
    }, [])
    return (
        <ScrollContainer id="container">
            {chars?.map((char)=>(
            <CharCard id="char-card"
            key={char?.id}
            >
            <ImgCont>
            <CharImg
            src={char?.image}
            />
            </ImgCont>
            <CardInfo>
            <h1 className="nameText margins">Name: {char?.name}</h1>
            <h1 className="speciesText margins">Species: {char?.species}</h1>
            <h1 className="originText margins">Origin: {char?.origin.name}</h1>
            </CardInfo>
            </CharCard>
            ))}
        </ScrollContainer>
    )
}

export default Characters