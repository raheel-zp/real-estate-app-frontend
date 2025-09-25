import { createContext, useContext, useState, useEffect } from "react";
import { getFavorites, addFavorite, removeFavorite } from "../api/favorites";
import { useAuth } from "./AuthContext";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const { auth } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loadingFavorites, setLoadingFavorites] = useState(false);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        if (!auth) {
          setFavorites([]);
          return;
        }
        setLoadingFavorites(true);
        const { data } = await getFavorites();
        setFavorites(data);
        setLoadingFavorites(false);
      } catch (err) {
        console.error("Error loading favorites", err);
      }
    };
    loadFavorites();
  }, [auth]);

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
