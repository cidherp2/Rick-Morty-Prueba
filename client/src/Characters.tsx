import styled from "styled-components";
import { useEffect, useState, useCallback } from "react";
import { Character } from "./utils/charTypes";
import { ApiResponse } from "./utils/charTypes";
import FavModal from "./FavModal";


export const ScrollContainer = styled.div /*style*/ `
margin-top: 2rem;
width:100vw;
height:100vh ;
display:flex;
flex-direction:row;
flex-wrap:wrap;
gap:1rem;
justify-content:center;
`
export const CharCard = styled.div<{height:string}> /*style*/ `
width:20%;
height:${props => (props.height)} ;
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
font-size:.8rem;
}
.margins{
margin:none !important;
}

`
export const ImgCont = styled.div /*style*/ `
width:90%;
height:70%;
overflow: hidden; 
border-radius:2rem;
:hover{
opacity: .9;

}
`
export const CardInfo = styled.div /*style*/ `
width:100%;
height:50%;
display:flex;
flex-direction:column;
justify-content:center;
align-items:flex-start;
padding-left:1rem;
gap:1;
`
export const CharImg = styled.img /*style*/`
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
    const [current_page, setCurrent_page] = useState<number>(1)
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);
    const [modalOpen, setModalOpen] = useState<boolean>(false)
    const [selectedCharacter, setSelectedCharacter] = useState<Character>([]as any)
    const url = `https://rickandmortyapi.com/api/character?page=${current_page}`


      const useBottomScrollDetection = (callback: () => void): void => {
        useEffect(() => {
          const isBottom = (): boolean => {
            return (window.innerHeight + window.scrollY) >= document.body.offsetHeight;
          };
      
          const handleScroll = () => {
            if (isBottom()) {
              callback();
            }
          };
      
          window.addEventListener('scroll', handleScroll);
          return () => window.removeEventListener('scroll', handleScroll);
        }, [callback]);
      };
      

      const fetchCharacters = useCallback(async (url:string) => {
        try {
          setLoading(true);
          const response = await fetch(`${url}`);
          if (!response.ok) {
            console.log("Bad response from server");
            setLoading(false);
            return;
          }
          
          const characters = await response.json();
          const moreCharacters = characters?.results;
    
          setChars((prevCharacters) => [...prevCharacters, ...moreCharacters]);
    
          if (!characters.info.next) {
            setHasMore(false);
          }
        } catch (err) {
          console.log(err);
        } finally {
          setLoading(false);
        }
      }, []);

      useBottomScrollDetection(() => {
        if (!loading && hasMore) {
          setCurrent_page((prevPage) => prevPage + 1);
        }
      });

      useEffect(() => {
        fetchCharacters(url);
      }, [current_page]);

      const closeModal = () =>{
        setModalOpen(false)
      }
      const openModal =() =>{
        setModalOpen(true)
      }
    
      const handleCharacterSelection = (location:Character) =>{
        setSelectedCharacter(location)
      }
    

        return (
            <ScrollContainer id="container">
                {chars?.map((char) => (
                    <CharCard id="char-card"
                    height="26rem"
                    onClick={()=>{openModal(),handleCharacterSelection(char)}}
                    //   key={char.id}
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
                {modalOpen && (
          <FavModal
          select="Character"
          item_id={selectedCharacter?.id.toString()}
          type={`Species: ${selectedCharacter?.species}`}
          name={`Name: ${selectedCharacter?.name}`}
          dimension={`Status: ${selectedCharacter?.status}`}
          closeModal={closeModal}
          ></FavModal>
        )}
            </ScrollContainer>
        )
    }

export default Characters