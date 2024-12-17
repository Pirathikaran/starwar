"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchCharacterDetails } from "@/api/characterService/characterService";
import CharacterCard from "@/components/appComponents/common/CharacterCard";
import { useFavoritesStore } from "@/store/useFavoritesStore";

const CharacterDetailPage = () => {
  const { id }: any = useParams();
  const [character, setCharacter] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const { addFavorite, removeFavorite, isFavorite, loadFavorites } =
    useFavoritesStore();

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  useEffect(() => {
    if (id) {
      setLoading(true);
      const fetchCharacterDetailsData = async () => {
        try {
          const response = await fetchCharacterDetails(id as string);
          setCharacter(response);
        } catch (error) {
          console.error("Error fetching character details:", error);
        }
        setLoading(false);
      };

      fetchCharacterDetailsData();
    }
  }, [id]);

  const toggleFavorite = () => {
    if (isFavorite(character.url)) {
      removeFavorite(character.url);
    } else {
      addFavorite(character);
    }
  };

  if (loading) {
    return (
      <div className="border rounded-md p-4 shadow-md hover:shadow-lg animate-pulse">
        <div className="space-y-4">
          <div className="h-6 bg-gray-300 rounded w-2/3"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded w-2/3"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          <div className="h-4 bg-gray-300 rounded w-2/3"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  if (!character) {
    return <div>Character not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <CharacterCard
          type="details"
          character={character}
          isFavorite={isFavorite(character.url)}
          onToggleFavorite={toggleFavorite}
          onViewDetails={() => {}}
        />
      </div>
    </div>
  );
};

export default CharacterDetailPage;
