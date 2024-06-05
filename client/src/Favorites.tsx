import { useEffect, useState } from "react";
import Characters, { CardInfo, ImgCont, ScrollContainer } from "./Characters";
import { CharCard } from "./Characters";
import { Character, FavoriteLocation } from "./utils/charTypes";
import { useJwt } from './TokenContex';
import { Location } from "./utils/charTypes";
import { FavoriteChars } from "./utils/charTypes";
import { LocationCard, LocationInfo } from "./Locations";
import head from "./assets/mortHead.png"
import portal from "./assets/portal.png"
import styled from "styled-components";
import { CharImg } from "./Characters";
import DeleteModal from "./DeleteModal";
import FavModal from "./FavModal";
import { Tag } from "./DeleteModal";

const RickAndMortyButton = styled.div /*style*/`
  background-color: #61dafb;
  border: none;
  border-radius: 5px;
  color: #000;
  padding: 10px 20px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
  position:relative;

height:10rem;
width:30%;
  &:hover {
    background-color: #00bfff;
  }
`;

const FavImage = styled(CharImg) /*style*/ `
width:50%;
`
const TagInput = styled (Tag) /*style*/ `
font-size: 1.3rem;
font-weight: 130;
position: absolute;
bottom: -.1%;
left: 25%;
margin-bottom: 1rem;
width: 50%;
background: rgb(255,255,255,.8);
`



const Favorites = () => {
    const { parsedJwt } = useJwt()
    const [favorites, setFavorites] = useState<FavoriteLocation[]>()
    const [favoriteChars, setFavoriteChars] = useState<FavoriteChars[]>()
    const [locations, setLocations] = useState<Location[]>([])
    const [buttonVisible, setButtonVisible] = useState<boolean>(true)
    const [characters,setChars] = useState<Character[]>([])
    const [modalOpen,setModalOpen] = useState<boolean>(false)
    const [selectedFav, setSelectedFav] = useState<string>("")
    const [selectedFav_id, setSelectedFav_id] = useState<string>("")
    const[selectedType, setSelectedType] = useState<string>("")
    const [searcBarText, setSearchBarText] = useState<string>("")
    const [favCharsByTag, setCharsByTag] = useState<any[]>([])

    async function fetchUserFavorites(userId: string): Promise<FavoriteLocation[]> {
        const response = await fetch(`https://rick-and-morty-backend-889d8aa11dad.herokuapp.com/exam/api/favorites/user-favs-location?user_id=${userId}`);

        if (!response.ok) {
            throw new Error('Bad response');
        }

        const data: FavoriteLocation[] = await response.json();
        return data;
    
    }

    const fetchUserFavoriteChars = async (userId: string): Promise<FavoriteChars[]> => {
        const response = await fetch(`https://rick-and-morty-backend-889d8aa11dad.herokuapp.com/exam/api/favorites/user-favs?user_id=${userId}`);

        if (!response.ok) {
            throw new Error('Bad response');
        }

        const data: FavoriteLocation[] = await response.json();

        return data;
    }

    const modalOpenHnadler = async () =>{

        setModalOpen(true)
    }

    useEffect(() => {
        async function fetchFavorites() {
            try {
                const data = await fetchUserFavorites(parsedJwt?.id);
                setFavorites(data);
            } catch (err) {
                console.log(err)
            }
            
        }

        async function fetchFavoriteChars() {
            try {
                const data = await fetchUserFavoriteChars(parsedJwt?.id);
                setFavoriteChars(data);
            } catch (err) {
                console.log(err)
            }
        }
        fetchFavoriteChars()
        fetchFavorites();
    }, []);

    const setTagInfo = async () =>{
        try{

        }
        catch(err){
            console.log(err);
        }
    } 



    const fetchLocations = async () => {
        try {
            const fetchPromises = favorites?.map(async (fav) => {
                const response = await fetch(`https://rickandmortyapi.com/api/location/${fav?.item_id}`);
                
                if (!response.ok) {
                    console.log("Bad response from server");
                    return null;
                }
    
                const location = await response?.json();
                location.favorite_id = fav.favorite_id;
                return location;
            });
            if (fetchPromises) {
                const location = await Promise.all(fetchPromises as any);
                const validLocations = location?.filter(location => location !== null);
                setLocations((prevLocations) => [...prevLocations, ...validLocations]);
                console.log(validLocations)
            }
    
        } catch (err) {
            console.log(err);
        }
    };
    const fetchCharacters = async () => {
        try {
            const fetchPromises = favoriteChars?.map(async (fav) => {
                const response = await fetch(`https://rickandmortyapi.com/api/character/${fav?.item_id}`);
                if (!response.ok) {
                    console.log("Bad response from server");
                    return null;
                }
    
                const character = await response?.json();
                character.favorite_id = fav.favorite_id;
                console.log(character)
                return character;
            });
            if (fetchPromises) {
                const characters = await Promise.all(fetchPromises as any);
                const validCharacters = characters?.filter(character => character !== null);
                setChars((prevCharacters) => [...prevCharacters, ...validCharacters]);
                console.log(validCharacters);
            }
        } catch (err) {
            console.log(err);
        }
    };
    const fetchCharactersBytag = async () => {
        try {
            const fetchPromises = favoriteChars?.map(async (fav) => {
                const response = await fetch(`https://rickandmortyapi.com/api/character/${fav?.item_id}`);
                if (!response.ok) {
                    console.log("Bad response from server");
                    return null;
                }
    
                const character = await response?.json();
                character.favorite_id = fav.favorite_id;
                console.log(character)
                return character;
            });
            if (fetchPromises) {
                const characters = await Promise.all(fetchPromises as any);
                const validCharacters = characters?.filter(character => character !== null);
                setChars((prevCharacters) => [...prevCharacters, ...validCharacters]);
                console.log(validCharacters);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const selectedFavHandler = async (selected:string, selectedFav:string) => {
        setSelectedFav(selected)
        setSelectedFav_id(selectedFav)
        updateURLWithSearchParam('favorite_id', selectedFav);
    }
    const updateURLWithSearchParam = (paramName: string, paramValue: string) => {
        const url = new URL(window.location.href);
        url.searchParams.set(paramName, paramValue);
        window.history.pushState({}, '', url.toString());
    }

    const fetchFavoriteTag = async (userId: string) => {
        try {
            const response = await fetch(`/search-character-tags?user_id=${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const data = await response.json();
            return data; // Return the data
        } catch (error) {
            console.error('Error:', error);
            return null; // Return null or handle error appropriately
        }
    }

    

   

    useEffect(() => {
        fetchUserFavorites(parsedJwt?.id)
        // setButtonVisible(true)
        // setButtonVisible(false)
        // if (buttonVisible===false){
        //  //fetchLocations(); 
        // fetchCharacters()
        // // setButtonVisible(false)
        // }

    }, [favoriteChars])

    return (
        <ScrollContainer>
            {buttonVisible && (
                <RickAndMortyButton
                     onClick={() => { fetchLocations(), fetchCharacters(),setButtonVisible(false) }}
                >
                    <FavImage
                        src={head}
                    ></FavImage>
                    <TagInput
                    ></TagInput>
                    {/* <h1
                        style={{ fontSize: "1.3rem", fontWeight: "130", position: "absolute", bottom: "-5%", left: "28%" }}
                    >Click To see your favorites</h1> */}
                </RickAndMortyButton>
            )}
            {locations?.map((fav) => (
                <LocationCard
                onClick={() => {
                    modalOpenHnadler().then(() => {
                      selectedFavHandler(fav?.id.toString(), fav?.favorite_id.toString()
                    );
                    });
                  }}
                    key={fav?.id}
                    height="26rem"
                >
                    <LocationInfo>
                        <h1 className="nameText margins">Dimension: {fav?.dimension}</h1>
                        <h1 className="speciesText margins">name: {fav?.name}</h1>
                        <h1 className="originText margins">type: {fav?.type}</h1>
                    </LocationInfo>
                    <ImgCont>
                        <CharImg
                            src={portal}
                        />
                    </ImgCont>
                </LocationCard>
            ))}
            {characters?.map((fav) => (
                <CharCard id="char-card"
                onClick={() => {
                    modalOpenHnadler().then(() => {
                      selectedFavHandler(fav?.id.toString(), fav?.favorite_id.toString());
                    });
                  }}
                height="26rem"
                 key={fav?.id}
                >
                    <ImgCont>
                        <CharImg
                            src={fav?.image}
                        />
                    </ImgCont>
                    <CardInfo>
                        <h1 className="nameText margins">Name: {fav?.name}</h1>
                        <h1 className="speciesText margins">Species: {fav?.species}</h1>
                        <h1 className="originText margins">Origin: {fav?.origin.name}</h1>
                    </CardInfo>
                </CharCard>
            ))}
            {modalOpen &&(
            <DeleteModal
            item_id={selectedFav}
            closeModal={()=>{setModalOpen(false)}}
            >

            </DeleteModal>
            )}
        </ScrollContainer>
    )
}

export default Favorites