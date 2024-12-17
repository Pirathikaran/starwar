import { Planet } from "./interface/common";

export const getPlanetDetails = async (
  planetId: string
): Promise<Planet | null> => {
  try {
    const url = `https://swapi.py4e.com/api/planets/${planetId}/`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    const data: Planet = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching planet details: ${(error as Error).message}`);
    return null;
  }
};
