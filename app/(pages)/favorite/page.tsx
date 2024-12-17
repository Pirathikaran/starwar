"use client"
import React, { useState, useEffect } from "react";
import Modal from "../../../components/appComponents/modal/Modal"; // Import the Modal component
import CharacterCard from "@/components/appComponents/common/CharacterCard";
import { useFavoritesStore } from "@/store/useFavoritesStore";

interface Character {
  name: string;
  gender: string;
  homeworld: string;
  birth_year: string;
  hair_color: string;
  skin_color: string;
  height: string;
  starships: string[];
  mass: string;
  films: string[];
  url: string;
}

const Page = () => {
  const { favorites, addFavorite, removeFavorite, isFavorite, loadFavorites } = useFavoritesStore(); // Using Zustand store
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<any | null>(null);

  useEffect(() => {
    loadFavorites(); // Load favorites from localStorage when the component mounts
    setIsLoading(false); // Set loading to false once favorites are loaded
  }, [loadFavorites]);

  const toggleFavorite = (character: any) => {
    if (isFavorite(character.url)) {
      removeFavorite(character.url); // Remove from favorites
    } else {
      addFavorite(character); // Add to favorites
    }
  };

  const openModelDetails = (character: Character) => {
    setSelectedCharacter(character);
    setIsModalOpen(true);
  };

  const handleUpdateCharacter = (updatedCharacter: Character) => {
    setSelectedCharacter(updatedCharacter);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCharacter(null);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold">Favorite Characters</h2>

      {isLoading ? (
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-300 rounded w-2/3"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded w-2/3"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {favorites.length > 0 ? (
            favorites.map((character) => (
              <CharacterCard
              type="favorite"
                key={character.url}
                character={character}
                onViewDetails={()=>{}}
                isFavorite={true}
                onToggleFavorite={() => toggleFavorite(character)}
                openModelDetails={openModelDetails}
              />
            ))
          ) : (
            <p>No favorite characters found</p>
          )}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        character={selectedCharacter}
        onUpdate={handleUpdateCharacter}
      />
    </div>
  );
};

export default Page;
