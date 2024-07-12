import React, { useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import axios from 'axios';
import "../styles/CharacterDetail.css"

const CharacterDetails = ({ character,modalOpen ,setModalOpen}) => {
  const [homeworldDetails, setHomeworldDetails] = useState(null);

  useEffect(() => {
    //:: Fetch home-world details
    const fetchHomeworld = async () => {
      if (character.homeworld) {
        try {
          const response = await axios.get(character.homeworld);
          setHomeworldDetails(response.data);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchHomeworld();
  }, [character]);

  const closeModal = () => setModalOpen(false);

  return (
    <ReactModal isOpen={modalOpen} onRequestClose={closeModal} className={'modal'}>
      <h2>{character.name}</h2>
      <ul>
        <li>Height: {character.height} meters</li>
        <li>Mass: {character.mass} kg</li>
        <li>
          Date Added: {new Date(character.created).toLocaleDateString()}
        </li>
        <li>Films: {character.films.length}</li>
        <li>Birth Year: {character.birth_year}</li>
        {homeworldDetails && (
          <>
            <li>Homeworld: {homeworldDetails.name}</li>
            <li>Terrain: {homeworldDetails.terrain}</li>
            <li>Climate: {homeworldDetails.climate}</li>
            <li>Population: {homeworldDetails.population}</li>
          </>
        )}
      </ul>
      <button onClick={closeModal}>Close</button>
    </ReactModal>
  );
};

export default CharacterDetails;
