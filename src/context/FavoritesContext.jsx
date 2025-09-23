import { createContext, useContext, useState, useEffect } from "react";
import { getFavorites, addFavorite, removeFavorite } from "../api/favorites";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const { data } = await getFavorites();
        setFavorites(data);
      } catch (err) {
        console.error("Error loading favorites", err);
      }
    };
    loadFavorites();
  }, []);

  const toggleFavorite = async (propertyId) => {
    try {
      if (favorites.some((fav) => fav._id === propertyId)) {
        const { data } = await removeFavorite(propertyId);
        setFavorites(data.favorites); // use populated response
      } else {
        const { data } = await addFavorite(propertyId);
        setFavorites(data.favorites); // use populated response
      }
    } catch (err) {
      console.error("Error toggling favorite", err);
    }
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
