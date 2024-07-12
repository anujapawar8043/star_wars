import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import CharacterList from '../components/CharacterList';
import axios from 'axios';


const mockCharacters = [
  {
    name: 'Luke Skywalker',
    height: '172',
    mass: '77',
    created: '2014-12-09T13:51:49.661000Z',
    films: ['https://swapi.dev/api/films/1/'],
    birth_year: '19BBY',
  },
];

test('clicking a character card opens the modal with correct information', async () => {
  axios.get.mockResolvedValueOnce({ data: { results: mockCharacters } });
  render(<CharacterList />);

  const characterCard = await screen.findByText('Luke Skywalker');
  fireEvent.click(characterCard);

  expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
  expect(screen.getByText('Height: 172 meters')).toBeInTheDocument();
  expect(screen.getByText('Mass: 77 kg')).toBeInTheDocument();
});
