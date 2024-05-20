import { useCallback, useEffect, useState } from "react";
import { ScrollContainer } from "./Characters"
import styled from "styled-components";
import { CharCard } from "./Characters";
import { CardInfo } from "./Characters";
import { Location } from "./utils/charTypes";
import portal from "./assets/portal.png"
import { ImgCont } from "./Characters";
import { CharImg } from "./Characters";
import FavModal from "./FavModal";

export const LocationCard = styled(CharCard)`

`
export const LocationInfo = styled(CardInfo)`
// `

const Locations = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [current_page, setCurrent_page] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [selectedLocation, setSelectedLocation] = useState<Location>([]as any)
  const url = `https://rickandmortyapi.com/api/location?page=${current_page}`;

  const useBottomScrollDetection = (callback: () => void): void => {
    useEffect(() => {
      const isBottom = (): boolean => {
        return window.innerHeight + window.scrollY >= document.body.offsetHeight;
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

  const fetchLocations = useCallback(async (url: string) => {
    try {
      setLoading(true);
      const response = await fetch(url);
      if (!response.ok) {
        console.log("Bad response from server");
        setLoading(false);
        return;
      }

      const locationsData = await response.json();
      const moreLocations = locationsData?.results;

      console.log(locationsData?.results)
      setLocations((prevLocations) => [...prevLocations, ...moreLocations]);

      if (!locationsData.info.next) {
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
    fetchLocations(url);
  }, [current_page]);

  const closeModal = () =>{
    setModalOpen(false)
  }
  const openModal =() =>{
    setModalOpen(true)
  }

  const handleLocationSelection = (location:Location) =>{
    setSelectedLocation(location)
  }

  return (
    <ScrollContainer id="container">
      {locations?.map((location) => (
        <>
        <LocationCard id="location-card" key={location.id}
          height="25rem"
          onClick={()=>{openModal(),handleLocationSelection(location)}}
        >
          <LocationInfo>
            <h1 className="nameText margins">Dimension: {location?.dimension}</h1>
            <h1 className="speciesText margins">name: {location?.name}</h1>
            <h1 className="originText margins">type: {location?.type}</h1>
          </LocationInfo>
          <ImgCont>
            <CharImg
              src={portal}
            />
          </ImgCont>
        </LocationCard>
          </>
      ))}

{modalOpen && (
          <FavModal
          select="location"
          item_id={`${selectedLocation?.id}`}
          type={`Type: ${selectedLocation?.type}`}
          name={`Name: ${selectedLocation?.name}`}
          dimension={`Dimension: ${selectedLocation?.dimension}`}
          closeModal={closeModal}
          ></FavModal>
        )}
    
    </ScrollContainer>
  )

}

export default Locations