"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useDebounce from "../hooks/useDebounce";
import {
  fetchCharactersRes,
  searchCharacters,
} from "../api/characterService/characterService";
import { SkeletonCard } from "@/components/appComponents/common/SkeletonCard";
import CharacterCard from "@/components/appComponents/common/CharacterCard";
import { useFavoritesStore } from "@/store/useFavoritesStore";

interface Character {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}

const Page = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [previousPage, setPreviousPage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const router = useRouter();
  const debouncedValue = useDebounce(searchTerm, 500);

  const { favorites, addFavorite, removeFavorite, isFavorite, loadFavorites } =
    useFavoritesStore();

  const getPlanetDetails = async (planetUrl: string) => {
    try {
      const response = await fetch(planetUrl);
      const data = await response.json();
      return data.name;
    } catch (error) {
      console.error(
        `Error fetching planet details: ${(error as Error).message}`
      );
      return "Unknown";
    }
  };

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  const performSearch = async (query: string) => {
    setLoading(true);
    const response = await searchCharacters(query);
    if (response.results) {
      const updatedCharacters = await Promise.all(
        response.results.map(async (character) => {
          const planetName = await getPlanetDetails(character.homeworld);
          return { ...character, homeworld: planetName };
        })
      );
      setCharacters(updatedCharacters);
      setNextPage(response.next);
      setPreviousPage(response.previous);
      setCurrentPage(1);
      setTotalPages(Math.ceil(response.count / 10)); // Calculate total pages
    }
    setLoading(false);
  };

  const loadCharacters = async (pageNumber: number) => {
    setLoading(true);
    const response = await fetchCharactersRes(pageNumber);
    if (response) {
      const updatedCharacters = await Promise.all(
        response.results.map(async (character) => {
          const planetName = await getPlanetDetails(character.homeworld);
          return { ...character, homeworld: planetName };
        })
      );
      setCharacters(updatedCharacters);
      setNextPage(response.next);
      setPreviousPage(response.previous);
      setCurrentPage(pageNumber);
      setTotalPages(Math.ceil(response.count / 10)); // Calculate total pages
    }
    setLoading(false);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handlePagination = (url: string | null) => {
    if (url) {
      const urlParams = new URLSearchParams(url.split("?")[1]);
      const pageNumber = urlParams.get("page");
      if (pageNumber) {
        loadCharacters(Number(pageNumber));
      }
    }
  };

  // Function to handle adding/removing a character from favorites
  const handleFavorite = (character: Character) => {
    if (isFavorite(character.url)) {
      removeFavorite(character.url); // Remove from favorites
    } else {
      addFavorite(character); // Add to favorites
    }
  };

  const handleDetailPage = (characterUrl: string) => {
    const characterId = characterUrl.split("/").filter(Boolean).pop();
    if (characterId) {
      router.push(`/character/${encodeURIComponent(characterId)}`);
    }
  };

  useEffect(() => {
    if (debouncedValue) {
      performSearch(debouncedValue);
    } else {
      loadCharacters(1);
    }
  }, [debouncedValue]);

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search Characters..."
          className="p-2 border rounded-md w-full"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 ">
        {loading
          ? Array(5)
              .fill(0)
              .map((_, index) => <SkeletonCard key={index} />)
          : characters.map((character) => (
              <CharacterCard
                type="grid"
                key={character.name}
                character={character}
                isFavorite={isFavorite(character.url)} // Check if character is in favorites
                onToggleFavorite={() => handleFavorite(character)}
                onViewDetails={handleDetailPage}
              />
            ))}
      </div>

      {!loading && totalPages > 1 && (
        <div className="flex sm:justify-start md:justify-end overflow-auto mt-2">
          <nav aria-label="Page navigation example">
            <ul className="inline-flex -space-x-px text-base">
              {previousPage && (
                <li>
                  <a
                    href="#"
                    onClick={() => handlePagination(previousPage)}
                    className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    Previous
                  </a>
                </li>
              )}

              <div className="flex justify-center space-x-2 overflow-x-auto">
                {Array.from({ length: totalPages }, (_, index) => (
                  <li key={index + 1}>
                    <a
                      href="#"
                      onClick={() => loadCharacters(index + 1)}
                      className={`flex items-center justify-center px-4 h-10 leading-tight ${
                        currentPage === index + 1
                          ? "text-blue-600 bg-blue-50"
                          : "text-gray-500 bg-white border border-gray-300"
                      } rounded-md hover:bg-blue-100 hover:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white`}
                    >
                      {index + 1}
                    </a>
                  </li>
                ))}
              </div>

              {nextPage && (
                <li>
                  <a
                    href="#"
                    onClick={() => handlePagination(nextPage)}
                    className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    Next
                  </a>
                </li>
              )}
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Page;
