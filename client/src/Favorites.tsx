import { useEffect, useState } from "react";
import { ScrollContainer } from "./Characters";
import { CharCard } from "./Characters";
import { FavoriteLocation } from "./utils/charTypes";
import { useJwt } from './TokenContex';
import { Location } from "./utils/charTypes";
import { FavoriteChars } from "./utils/charTypes";
import { LocationCard } from "./Locations";


const Favorites = () => {
const {parsedJwt} = useJwt()
    const [favorites, setFavorites] = useState<FavoriteLocation[]>()
    const [favoriteChars, setFavoriteChars] = useState<FavoriteChars[]>()
    const [locations, setLocations] = useState<Location[]>([])

    async function fetchUserFavorites(userId: string):Promise<FavoriteLocation[]> {
        const response = await fetch(`http://localhost:3001/exam/api/favorites/user-favs-location?user_id=${userId}`);
    
    if (!response.ok) {
        throw new Error('Bad response');
    }

    const data: FavoriteLocation[] = await response.json();

    return data;
    }

    const fetchUserFavoriteChars = async (userId:string):Promise<FavoriteChars[]> => {
        const response = await fetch(`http://localhost:3001/exam/api/favorites/user-favs?user_id=${userId}`);
    
    if (!response.ok) {
        throw new Error('Bad response');
    }

    const data: FavoriteLocation[] = await response.json();

    return data;
    }

    useEffect(() => {
        async function fetchFavorites() {
            try {
                const data = await fetchUserFavorites(parsedJwt?.id);
                console.log(data)
                setFavorites(data);
            } catch (err) {
               console.log(err)
            }
        }

        async function fetchFavoriteChars (){
            try {
                const data = await fetchUserFavoriteChars(parsedJwt?.id);
                console.log(data)
                setFavoriteChars(data);
            } catch (err) {
               console.log(err)
            }
        }
        fetchFavoriteChars()
        fetchFavorites();
    }, []);

    const fetchLocations = async () => {
        try {
            const fetchPromises = favorites?.map(async (fav) => {
                const response = await fetch(`https://rickandmortyapi.com/api/location/${fav?.item_id}`);
                if (!response.ok) {
                    console.log("Bad response from server");
                    return null;
                }
                
                const location = await response.json();
                return location;
            });
    
            const locations = await Promise.all(fetchPromises as any);
            const validLocations = locations.filter(location => location !== null);
            setLocations((prevLocations) => [...prevLocations, ...validLocations]);
            console.log(validLocations)
    
        } catch (err) {
            console.log(err);
        }
    };
    
    const fetchCharacters = async () =>{
        try {
            const fetchPromises = favoriteChars?.map(async (fav) => {
                const response = await fetch(`https://rickandmortyapi.com/api/character/${fav?.item_id}`);
                if (!response.ok) {
                    console.log("Bad response from server");
                    return null;
                }
                
                const location = await response.json();
                return location;
            });
    
            const chars = await Promise.all(fetchPromises as any);
            const validChars = chars.filter(location => location !== null);
            setLocations((prevLocations) => [...prevLocations, ...validChars]);
            console.log(validChars)
    
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(()=>{
        fetchUserFavorites(parsedJwt?.id)
        fetchLocations(); 
        fetchCharacters()
        
    },[])

    return (
        <ScrollContainer>

            {locations?.map((fav)=>(
            <LocationCard
            key={fav?.id}
            height="25rem"
            >
            <p> Hola</p>
            </LocationCard>
            ))}

        </ScrollContainer>
    )
}

export default Favorites