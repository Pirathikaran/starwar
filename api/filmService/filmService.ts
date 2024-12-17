import { FilmDetails } from "./interface/common";

export const getFilmsDetails = async (
  filmUrl: string
): Promise<FilmDetails | null> => {
  try {
    const filmId = filmUrl.split("/").filter(Boolean).pop();
    console.log({ filmId });
    const url = `https://swapi.py4e.com/api/films/${filmId}/`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    const data: FilmDetails = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching films details: ${(error as Error).message}`);
    return null;
  }
};
