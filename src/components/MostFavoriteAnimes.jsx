"use client";

import React, { useEffect, useState } from "react";
import useStore from "@/utils/store";

const MostFavoriteAnimes = ({ animes }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 5;
  const setSelectedAnimeId = useStore((state) => state.setSelectedAnimeId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        if (!animes) {
          throw new Error("No data provided!");
        }

        setData(animes);

        localStorage.setItem("myData", JSON.stringify(animes));

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [animes]);

  useEffect(() => {
    const storedData = localStorage.getItem("myData");
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <svg
            className="animate-spin h-10 w-10 text-blue-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8z"
            ></path>
          </svg>
          <p className="mt-2">Loading...</p>
        </div>
      </div>
    );
  }
  if (error)
    return (
      <div className="text-red-500">Error fetching data: {error.message}</div>
    );

  const mostFavoriteAnimes = data?.mostFavoriteAnimes || [];
  const totalAnimes = mostFavoriteAnimes.length;

  if (totalAnimes === 0) {
    return <div className="text-center">No upcoming anime available.</div>;
  }

  const handleAnimeClick = (id) => {
    setSelectedAnimeId(id);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + itemsPerPage >= totalAnimes ? 0 : prevIndex + itemsPerPage
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - itemsPerPage < 0
        ? Math.floor(totalAnimes / itemsPerPage) * itemsPerPage - itemsPerPage
        : prevIndex - itemsPerPage
    );
  };

  const displayedAnimes = mostFavoriteAnimes.slice(
    currentIndex,
    currentIndex + itemsPerPage
  );

  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold text-center mb-6">
        Most Favorite Animes
      </h2>
      <div className="flex flex-wrap justify-center gap-4">
        {displayedAnimes.map((anime) => (
          <div
            key={anime.id}
            className="relative w-40 h-60 overflow-hidden rounded-lg shadow-lg cursor-pointer"
            onClick={() => handleAnimeClick(anime.id)}
          >
            <img
              src={anime.poster}
              alt={anime.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-2">
              <h3 className="text-sm font-semibold text-white truncate">
                {anime.name} ({anime.jname})
              </h3>
              {anime.rank && (
                <p className="text-xs text-gray-300">Rank: {anime.rank}</p>
              )}
              {anime.episodes && (
                <p className="text-xs text-gray-300">
                  Sub: {anime.episodes.sub}
                </p>
              )}
              {anime.episodes && (
                <p className="text-xs text-gray-300">
                  Dub: {anime.episodes.dub}
                </p>
              )}
              {anime.type && (
                <p className="text-xs text-gray-300">Type: {anime.type}</p>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-4">
        <button
          onClick={handlePrev}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Prev
        </button>
        <button
          onClick={handleNext}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MostFavoriteAnimes;