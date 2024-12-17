import { apiClient } from "../apiClient";
import { Character, CharacterResponse } from "./interface/common";


export const fetchCharactersRes = async (
  page: number
): Promise<CharacterResponse> => {
  try {
    const url = `https://swapi.py4e.com/api/people/?page=${page}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    const data: CharacterResponse = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching characters: ${(error as Error).message}`);
    return {
      count: 0,
      next: null,
      previous: null,
      results: [],
    };
  }
};

export const  searchCharacters = async (
  searchQuery: string
): Promise<CharacterResponse> => {
  try {
    const url = `https://swapi.py4e.com/api/people/?search=${encodeURIComponent(
      searchQuery
    )}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    const data: CharacterResponse = await response.json();
    return data;
  } catch (error) {
    console.error(`Error searching characters: ${(error as Error).message}`);
    return {
      count: 0,
      next: null,
      previous: null,
      results: [],
    };
  }
};


export const fetchCharacterDetails = async (id: string): Promise<Character> => {
  try {
    const response = await fetch(`https://swapi.py4e.com/api/people/${id}/`);
    
    if (!response.ok) {
      throw new Error("Character details could not be retrieved");
    }

    const data = await response.json();
    return data; // Assuming the response data matches the Character interface
  } catch (error: any) {
    console.error(`Error fetching character details: ${error.message}`);
    throw new Error("Character details could not be retrieved");
  }
};

