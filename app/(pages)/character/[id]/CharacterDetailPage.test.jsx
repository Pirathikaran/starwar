// import React from 'react';
// import { render, screen, act } from '@testing-library/react';
// import { useParams } from 'next/navigation';
// import CharacterDetailPage from './page';
// import { useFavoritesStore } from '../../../../store/useFavoritesStore';
// import { fetchCharacterDetails } from '../../../../api/characterService/characterService';


// // Mock dependencies
// jest.mock('next/navigation', () => ({
//   useParams: jest.fn(),
// }));

// jest.mock('../../../../api/characterService/characterService', () => ({
//   fetchCharacterDetails: jest.fn() ,
// }));

// jest.mock('../../../../store/useFavoritesStore', () => ({
//   useFavoritesStore: jest.fn(() => ({
//     addFavorite: jest.fn(),
//     removeFavorite: jest.fn(),
//     isFavorite: jest.fn(),
//     loadFavorites: jest.fn(),
//   })) ,
// }));

// jest.mock('../../../../components/appComponents/common/CharacterCard', () => {
//   return ({ character, isFavorite, onToggleFavorite }) => (
//     <div data-testid="character-card">
//       <div>{character.name}</div>
//       <div>Favorite: {isFavorite ? 'Yes' : 'No'}</div>
//       <button onClick={onToggleFavorite}>Toggle Favorite</button>
//     </div>
//   );
// });

// describe('CharacterDetailPage', () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   it('renders character details after fetching data', async () => {
//     (useParams ).mockReturnValue({ id: '1' });
//     (fetchCharacterDetails ).mockResolvedValueOnce({
//       name: 'Luke Skywalker',
//       url: '/characters/1',
//     });

//     await act(async () => {
//       render(<CharacterDetailPage />);
//     });

//     expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
//     expect(screen.getByTestId('character-card')).toBeInTheDocument();
//   });

//   it('handles character not found', async () => {
//     (useParams ).mockReturnValue({ id: '999' });
//     (fetchCharacterDetails ).mockResolvedValueOnce(null);

//     await act(async () => {
//       render(<CharacterDetailPage />);
//     });

//     expect(screen.getByText(/Character not found/i)).toBeInTheDocument();
//   });

//   it('toggles favorite status', async () => {
//     const addFavoriteMock = jest.fn();
//     const removeFavoriteMock = jest.fn();

//     (useParams ).mockReturnValue({ id: '1' });
//     (useFavoritesStore ).mockReturnValue({
//       addFavorite: addFavoriteMock,
//       removeFavorite: removeFavoriteMock,
//       isFavorite: jest.fn((url) => url === '/characters/1'),
//       loadFavorites: jest.fn(),
//     });

//     (fetchCharacterDetails ).mockResolvedValueOnce({
//       name: 'Luke Skywalker',
//       url: '/characters/1',
//     });

//     await act(async () => {
//       render(<CharacterDetailPage />);
//     });

//     const toggleButton = screen.getByText(/Toggle Favorite/i);
//     act(() => {
//       toggleButton.click();
//     });

//     expect(removeFavoriteMock).toHaveBeenCalledWith('/characters/1');

//     act(() => {
//       toggleButton.click();
//     });

//     expect(addFavoriteMock).toHaveBeenCalledWith({
//       name: 'Luke Skywalker',
//       url: '/characters/1',
//     });
//   });
// });
