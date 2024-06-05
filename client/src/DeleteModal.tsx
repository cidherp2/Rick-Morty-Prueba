import React, { useEffect, useState } from 'react';
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
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:space-between;

  h2{
    margin:0;
  }
  .deleteBtton{
    display:flex;
    align-items:center;
    font-size:.8rem;
  }
  .tagForm{
  display:flex;
  gap:.2rem;
  margin-top:1rem;

  

  }
  .addTagButton{
  background:white;
 
  color:black;
  border-radius:.5rem;
  }
  .tagsDiv{
  display:flex;
  margin-bottom:auto;
  margin-top:1rem;
  justify-content:center;
  gap:.1rem;
  flex-wrap:wrap;
  :hover{
  opacity:.5 ;
  cursor:pointer;
  }
  }
`;

const Cerrar = styled.button /*style*/ `
  position: absolute;
  top: 0;
  right: 0;
  margin-top: 1rem;
  margin-right: 1rem;
  background-color: #e74c3c;
`;

export const Tag = styled.input /*style*/ `
background: rgb(0,0,0,.2);
color:black;
width:15%;
border-radius:1rem;
border:none;
text-align:center;
width:51.28px;
`



interface ModalProps {
  item_id: string
  closeModal(): void
}

const DeleteModal: React.FC<ModalProps> = (props) => {

  const [tag, setTag] = useState<string>("")
  const [tags, setTags] = useState<any[]>()
  const [favorite_id, setFavorite_id] = useState<string | null>(extractFavoriteIdFromURL())
  const [tagInfo, setTagInfo] = useState<string>("")
  const [selectedTagId, setSelectedTagId] = useState<number>();
  const { parsedJwt } = useJwt()
  

  const deleteFavorite = async (favoriteId: string): Promise<void> => {
    try {
      const response = await fetch(`https://rick-and-morty-backend-889d8aa11dad.herokuapp.com/exam/api/favorites/delete-fav-char/${favoriteId}`, {
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
  const deleteFavoriteLocation = async (favoriteId: string): Promise<void> => {
    try {
      const response = await fetch(`https://rick-and-morty-backend-889d8aa11dad.herokuapp.com/exam/api/favorites/delete-fav-location/${favoriteId}`, {
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

  const addTagCall = async (favoriteId: string | null): Promise<void> => {
    try {
      const response = await fetch(`https://rick-and-morty-backend-889d8aa11dad.herokuapp.com/exam/api/tags/addTag/${favoriteId}/${parsedJwt?.id}`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ tag: tag })
      });

      if (response.ok) {
        console.log("tag added successfully", tag)
        fetchTags(extractFavoriteIdFromURL() as string)
      }

      if (!response.ok) {
        console.error('Failed to add tag');
      }
      //window.alert("aaaaaa")
    }

    catch (err) {
      console.log(err)
    }

  }

  const fetchTags = async (favoriteId: string): Promise<any[]> => {

    if (!extractFavoriteIdFromURL()){
       
    }

    try {
      const response = await fetch(`https://rick-and-morty-backend-889d8aa11dad.herokuapp.com/exam/api/tags/getTags/${favoriteId}`);

      if (!response.ok) {
        throw new Error('Failed to fetch tags');
      }

      const tagsi = await response.json();
      if (tagsi.length !== tags?.length ){
        setTags(tagsi);
      }
      
      console.log(tags)

      return tagsi;
    } catch (err) {
      console.error('Error fetching tags:', err);
      throw err; // Propagate the error for handling in the calling function
    }
  };

  const handleSetTag = (e: React.ChangeEvent<HTMLInputElement>) => {
    const change = e.target.value;
    setTag(change)
  }

  function extractFavoriteIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('favorite_id');
  }

  const updateTag = async (tagId: number, updatedTag: string) => {
    try {
      await fetch(`https://rick-and-morty-backend-889d8aa11dad.herokuapp.com/exam/api/tags/updateTag/${tagId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tag: updatedTag }),
      });
      fetchTags(extractFavoriteIdFromURL() as string);
    } catch (error) {
      console.error('Error updating tag:', error);
      // Handle error
    }
  };

  const handleTagUpdate = async (tagId: number): Promise<void> => {
    if (!tagInfo) {
      return; // Don't update if the text is empty
    }
    await updateTag(tagId, tagInfo);
  };

  useEffect(() => {
    setFavorite_id(extractFavoriteIdFromURL())
    console.log(favorite_id)

  }, [favorite_id])

  useEffect(() => {
    fetchTags(extractFavoriteIdFromURL() as string)
  }, [tags])

  const handleTagInfo = (e: React.ChangeEvent<HTMLInputElement>, tagId: number) => {
    const change = e.target.value;
    setTagInfo(change)
    setSelectedTagId(tagId);
  }


  return (
    <ModalOverlay

    >
      <ModalContent>
        <h2>Favorite Info</h2>
        <Cerrar
          onClick={props.closeModal}
        >X</Cerrar>
        <div
          className='tagForm'
        >
          <input
            className='addTagButton'
            type='text'
            value={tag}
            onChange={handleSetTag}
          >
          </input>
          <button
            style={{ background: "rgb(151, 206, 76, .8)" }}
            onClick={() => { addTagCall(extractFavoriteIdFromURL()) }}
          >add tag</button>
        </div>
        <div
          className='tagsDiv'
        >
          {tags?.map((tag) => (
            <Tag
            key={tag?.id}
              type="text"
              defaultValue={tag?.tag}
              onChange={(event) => setTagInfo(event.target.value)}
              onBlur={() => handleTagUpdate(tag?.id)}
              placeholder={tag?.tag}
               autoFocus
            >

            </Tag>

          ))}
        </div>
        <button
          className='deleteBtton'
          onClick={() => {
            if (props?.item_id) {
              deleteFavorite(props?.item_id)
                // .then(() => deleteFavoriteLocation(props?.item_id))
                .then(() => {
                  props.closeModal();
                  window.location.reload();
                })
                .catch((error) => {
                  console.error('Error deleting favorite:', error);
                });
            }
          }}
          style={{ background: "#e74c3c", color: "white", height: "2rem", width: "45%" }}
          type='button'
        >Delete From Favorites</button>
      </ModalContent>
    </ModalOverlay>

  )
}

export default DeleteModal