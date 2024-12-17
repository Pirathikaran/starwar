import React, { useState, useEffect } from "react";
import { Button } from "../common/Button";
import { useFavoritesStore } from "@/store/useFavoritesStore"; // Import Zustand store

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  character: any;
  onUpdate: (updatedCharacter: any) => void; // Callback function for notifying parent about changes
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  character,
  onUpdate,
}) => {
  const [updatedGender, setUpdatedGender] = useState(character?.gender || "");
  const [updatedHeight, setUpdatedHeight] = useState(character?.height || "");

  const { favorites, addFavorite, removeFavorite } = useFavoritesStore(); // Using Zustand store

  useEffect(() => {
    // Reinitialize state when the character prop changes
    setUpdatedGender(character?.gender || "");
    setUpdatedHeight(character?.height || "");
  }, [character]);

  const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedGender(event.target.value);
  };

  const handleHeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedHeight(event.target.value);
  };

  const handleSaveChanges = () => {
    // Update the character's details with the new values
    const updatedCharacter = {
      ...character,
      gender: updatedGender,
      height: updatedHeight,
    };

    // Update the favorites in the Zustand store
    const isAlreadyFavorite = favorites.some((fav: any) => fav.url === updatedCharacter.url);

    if (isAlreadyFavorite) {
      removeFavorite(updatedCharacter.url); // Remove the character before updating it
      addFavorite(updatedCharacter); // Add the updated character back to the store
    } else {
      addFavorite(updatedCharacter); // If not already a favorite, simply add it
    }

    // Notify the parent component of the changes
    onUpdate(updatedCharacter);

    // Close the modal
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-lg w-full">
        <h2 className="text-2xl font-semibold mb-4">{character.name}</h2>
        <div>
          <div>
            <p>
              <strong>Gender:</strong>
            </p>
            <input
              type="text"
              value={updatedGender}
              onChange={handleGenderChange}
              className="border p-2 rounded-md w-full mb-4"
            />
          </div>
          <div>
            <p>
              <strong>Homeworld:</strong> {character.homeworld}
            </p>
            <p>
              <strong>Birth Year:</strong> {character.birth_year}
            </p>
            <p>
              <strong>Hair Color:</strong> {character.hair_color}
            </p>
            <p>
              <strong>Skin Color:</strong> {character.skin_color}
            </p>
            <div>
              <p>
                <strong>Height:</strong>
              </p>
              <input
                type="number"
                value={updatedHeight}
                onChange={handleHeightChange}
                className="border p-2 rounded-md w-full mb-4"
              />
            </div>
            <p>
              <strong>Mass:</strong> {character.mass} kg
            </p>

            <div className="mt-4 mx-auto flex justify-between">
              <Button onClick={onClose} variant="secondary" size="sm">
                Close
              </Button>
              <Button onClick={handleSaveChanges} variant="success" size="sm">
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
