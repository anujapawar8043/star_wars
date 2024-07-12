import React, { useState, useEffect,useRef } from 'react';
import axios from 'axios';
import CharacterCard from './CharacterCard';
import "../styles/CharacterList.css"
import CharacterDetails from './CharacterDetail';
import jsCookie from 'js-cookie';
import { useNavigate } from 'react-router-dom';


const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [modalOpen,setModalOpen]=useState(false);
  const [filters, setFilters] = useState({ homeworld: '', film: '', species: '' });
  const navigate = useNavigate();


  useEffect(() => {

    // handle authentication
    const accessToken = jsCookie.get('star-wars-token');
    if(accessToken =='undefined' || accessToken==undefined){
        navigate("/");
    }
    else{

    //API Call
    const fetchData = async () => {
      setIsLoading(true);
      try {
        let url = `https://swapi.dev/api/people/?page=${currentPage}`;
        const searchParams = [];
        if (searchTerm) {
          searchParams.push(`search=${searchTerm}`);
        }
        if (filters.homeworld) {
          searchParams.push(`homeworld=${filters.homeworld}`);
        }
        if (filters.film) {
          searchParams.push(`url=${filters.film}`); // Film URLs are used for filtering
        }
        if (filters.species) {
          searchParams.push(`species=${filters.species}`);
        }
        if (searchParams.length > 0) {
          url += `&${searchParams.join('&')}`;
        }
        const response = await axios.get(url);
        setCharacters(response.data.results);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }

  }, [currentPage, searchTerm,filters]);


  //pagination handler
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // search handler
  const handleSearch = (event) => {
    setTimeout(()=>{
        setSearchTerm(event.target.value);
    },1000)
    
  };

  // Card click handler 
  const handleCardClick = (character) => {
    setSelectedCharacter(character);
    setModalOpen(true);

  };

  //:: Filter value change handler
  const handleFilterChange = (event) => {
    setFilters({ ...filters, [event.target.name]: event.target.value });
  };

  //:: Logout handler
  const handleLogout = () => {
    jsCookie.remove('star-wars-token');
    navigate("/");
  };

  return (
    <div>
       <button  className={"logout-btn"} onClick={handleLogout}>Logout</button>
      <h3 className='heading-list'>Characters list</h3>
      <div className='search-filter'>
        <input
            type="text"
            placeholder="Search characters..."
            onChange={handleSearch}
        />
        <div className="filters">
          <div>
          <label htmlFor="homeworld">Homeworld: </label>
          <input
            type="text"
            name="homeworld"
            value={filters.homeworld}
            onChange={handleFilterChange}
          />
          </div>
          <div>
          <label htmlFor="film">Film: </label>
          <input type="text" name="film" value={filters.film} onChange={handleFilterChange} />
          </div>
          <div>
          <label htmlFor="species">Species: </label>
          <input type="text" name="species" value={filters.species} onChange={handleFilterChange} />
          </div>
      </div>

      </div>
      {isLoading ? (
        <p className='loader'>Loading...</p>
      ) : (
        <>
        <div className="character-list">
          {characters.map((character) => (
            <CharacterCard
              key={character.name}
              character={character}
              imageUrl={`https://picsum.photos/200?random=${character.name}`}
              onClick={() => handleCardClick(character)}
            />
          ))}
        </div>
        </>
      )}
      <div className="pagination">
        {currentPage > 1 && (
          <button onClick={() => handlePageChange(currentPage - 1)}>
            Previous
          </button>
        )}
        {characters.length >=10 && (
          <button onClick={() => handlePageChange(currentPage + 1)}>
            Next
          </button>
        )}
      </div>

      {selectedCharacter && <CharacterDetails character={selectedCharacter} 
      modalOpen={modalOpen} setModalOpen={(value)=>setModalOpen(value)}
      />}
    </div>
  );
};

export default CharacterList;