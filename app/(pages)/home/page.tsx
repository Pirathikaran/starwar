import { fetchCharactersRes } from "@/api/characterService/characterService"; // Your API call
import React from "react";

// Define the type for character data
interface Character {
  name: string;
  gender: string;
  birth_year: string;
  hair_color: string;
  skin_color: string;
  height: string;
  mass: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}

const Page = async ({ searchParams }: { searchParams: { page?: string } }) => {
  const pageNumber = parseInt(searchParams?.page || "1", 10); // Default to page 1 if no page is provided
  try {
    const response = await fetchCharactersRes(pageNumber); // Fetch data based on page
    const characters = response.results;
    const nextPage = response.next;
    const previousPage = response.previous;

    return (
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {characters.map((character: Character) => (
            <div
              key={character.name}
              className="border rounded-md p-4 shadow-md hover:shadow-lg"
            >
              <h2 className="font-semibold text-lg">{character.name}</h2>
              <div className="mt-2">
                <h6>
                  <strong>Gender:</strong> {character.gender}
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
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex sm:justify-start md:justify-end mt-4">
          <nav aria-label="Page navigation">
            <ul className="inline-flex -space-x-px text-base">
              {/* Previous Page Button */}
              {previousPage && (
                <li>
                  <a
                    href={`?page=${pageNumber - 1}`}
                    className="px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 transition duration-300"
                  >
                    Previous
                  </a>
                </li>
              )}

              {/* Page Number Links */}
              <div className="flex items-center space-x-2">
                {Array.from({ length: 5 }, (_, index) => (
                  <li key={index + 1}>
                    <a
                      href={`?page=${index + 1}`}
                      className={`px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-100 hover:text-gray-700 transition duration-300 ${
                        pageNumber === index + 1
                          ? "text-blue-600 bg-blue-50 border-blue-300"
                          : ""
                      }`}
                    >
                      {index + 1}
                    </a>
                  </li>
                ))}
              </div>

              {/* Next Page Button */}
              {nextPage && (
                <li>
                  <a
                    href={`?page=${pageNumber + 1}`}
                    className="px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 transition duration-300"
                  >
                    Next
                  </a>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    );
  } catch (error) {
    console.error(`Error fetching characters: ${(error as Error).message}`);
    return (
      <div className="container mx-auto p-4">
        <p>Error loading characters.</p>
      </div>
    );
  }
};

export default Page;
