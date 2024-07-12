import React from 'react';
import '../styles/CharacterCard.css';

const CharacterCard = ({ character, onClick }) => {
  const randomImage = `https://picsum.photos/200?random=${Math.random()}`;

  return (
    <div className="character-card" onClick={() => onClick(character)}>
      <img src={randomImage} alt="Random" />
      <h3>{character.name}</h3>
    </div>
  );
};

export default CharacterCard;
