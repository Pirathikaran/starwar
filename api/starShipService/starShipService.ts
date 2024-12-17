import { Starship } from "./interface/common";

export const getStarShipDetails = async (
  starShipUrl: string
): Promise<Starship | null> => {
  try {
    const starShipId = starShipUrl.split("/").filter(Boolean).pop();
    const url = `https://swapi.py4e.com/api/starships/${starShipId}/`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    const data: Starship = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching star ship details: ${(error as Error).message}`);
    return null;    
  }
};
