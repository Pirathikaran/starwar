import { create } from "zustand";

interface Favorite {
  url: string;
  [key: string]: any; // For additional fields
}

interface FavoritesStore {
  favorites: Favorite[];
  addFavorite: (character: Favorite) => void;
  removeFavorite: (url: string) => void;
  isFavorite: (url: string) => boolean;
  loadFavorites: () => void; // New function to load favorites from localStorage
}

export const useFavoritesStore = create<FavoritesStore>((set, get) => ({
  favorites: [],

  addFavorite: (character) => {
    const newFavorites = [...get().favorites, character];
    set({ favorites: newFavorites });
    localStorage.setItem("favorites", JSON.stringify(newFavorites)); // Persist to localStorage
  },

  removeFavorite: (url) => {
    const updatedFavorites = get().favorites.filter((fav) => fav.url !== url);
    set({ favorites: updatedFavorites });
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); // Persist to localStorage
  },

  isFavorite: (url) => get().favorites.some((fav) => fav.url === url),

  loadFavorites: () => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      set({ favorites: JSON.parse(storedFavorites) });
    }
  },
}));
