import React, { useEffect, useState } from "react";
import { MdFavorite } from "react-icons/md";
import { Button } from "../common/Button";
import { getFilmsDetails } from "@/api/filmService/filmService";
import { getPlanetDetails } from "@/api/planetService/planetService";
import { getStarShipDetails } from "@/api/starShipService/starShipService";

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

interface CharacterCardProps {
  type?: string;
  character: any;
  isFavorite: boolean;
  onToggleFavorite: (characterUrl: any) => void;
  onViewDetails: (characterUrl: string) => void;
  openModelDetails?: (characterUrl: any) => void;
}

const CharacterCard: React.FC<CharacterCardProps> = ({
  type,
  character,
  isFavorite,
  onToggleFavorite,
  onViewDetails,
  openModelDetails,
}) => {
    console.log(character,"fgfgfgfgfgfg")
  const [films, setFilms] = useState<any[]>([]);
  const [starShip, setStarShip] = useState<any[]>([]);
  const [homeworld, setHomeworld] = useState<string | null>(null);

  useEffect(() => {
    const fetchFilms = async () => {
      const filmPromises = character.films.map((filmUrl:string) =>
        getFilmsDetails(filmUrl)
      );
      const filmData = await Promise.all(filmPromises);
      setFilms(filmData.filter((film) => film !== null));
    };

    const fetchStarShip = async () => {
      const filmPromises = character.starships.map((shipUrl:string) =>
        getStarShipDetails(shipUrl)
      );
      const filmData = await Promise.all(filmPromises);
      setStarShip(filmData.filter((ship) => ship !== null));
    };

    const fetchHomeworld = async () => {
      if (character?.homeworld) {
        const planetId = character?.homeworld.split("/").filter(Boolean).pop();
        console.log(planetId, "dsdsdsdsd");
        if (planetId) {
          const planetData = await getPlanetDetails(planetId);
          if (planetData) {
            setHomeworld(planetData.name);
          }
        }
      }
    };

    if (character.films.length > 0) {
      fetchFilms();
    }

    if (character.starships.length > 0) {
      fetchStarShip();
    }

    if (character?.homeworld && type === "details") {
      fetchHomeworld();
    }
  }, [character?.films, character?.homeworld]);

  return (
    <div className="border rounded-md p-4 shadow-md hover:shadow-lg">
      <h2 className="font-semibold text-lg">{character.name}</h2>
      <div className="mt-2">
        <h6>
          <strong>Gender:</strong> {character.gender}
        </h6>
        <h6>
          <strong>Home Planet:</strong>
          {type === "grid" || type === "favorite"
            ? character.homeworld
            : homeworld}
        </h6>
        <h6>
          <strong>Birth Year:</strong> {character.birth_year}
        </h6>
        <h6>
          <strong>Hair Color:</strong> {character.hair_color}
        </h6>
        <h6>
          <strong>Skin Color:</strong> {character.skin_color}
        </h6>
        <h6>
          <strong>Height:</strong> {character.height} cm
        </h6>
        <h6>
          <strong>Mass:</strong> {character.mass} kg
        </h6>
      </div>

      {/* Display films */}
      {type === "details" && films?.length > 0 && (
        <div className="mt-2">
          <h6>
            <strong>Films' Name:</strong>
          </h6>
          <ul>
            {films?.map((film, index) => (
              <ul
                key={film.title}
                className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400"
              >
                <li>{film.title}</li>
              </ul>
            ))}
          </ul>
        </div>
      )}

      {/* Display star Ship */}
      {type === "details" && films?.length > 0 && (
        <div className="mt-2">
          <h6>
            <strong>Star Ships' Name:</strong>
          </h6>
          <ul>
            {starShip?.map((ship, index) => (
              <ul
                key={ship.name}
                className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400"
              >
                <li>{ship.name}</li>
              </ul>
            ))}
          </ul>
        </div>
      )}

      <div className="flex justify-between mt-1 gap-2">
        <Button
          onClick={() => onToggleFavorite(character)}
          variant={isFavorite ? "secondary" : "success"}
          size="sm"
          icon={
            isFavorite ? (
              <MdFavorite className="text-red-500" size={20} />
            ) : (
              <MdFavorite className="text-white" size={20} />
            )
          }
          iconPosition="left"
        >
          {isFavorite ? "Remove" : "Add"}
        </Button>
        {type === "grid" && (
          <Button
            onClick={() => onViewDetails(character.url)}
            variant="primary"
            size="sm"
          >
            Details
          </Button>
        )}
        {type === "favorite" && openModelDetails && (
          <Button
            onClick={() => openModelDetails(character)}
            variant="primary"
            size="sm"
          >
            Edit
          </Button>
        )}
      </div>
    </div>
  );
};

export default CharacterCard;
