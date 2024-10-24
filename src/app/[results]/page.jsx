"use client";

import React, { useEffect, useState } from "react";
import useStore from "@/utils/store"; 
import "@/styles/homeLoader.css";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

const Results = () => {
  const apiUrl = process.env.NEXT_PUBLIC_ANIME_API;
  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q") || "";

  const setSelectedAnimeId = useStore((state) => state.setSelectedAnimeId);

  useEffect(() => {
    const fetchAnimes = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${apiUrl}/api/v2/hianime/search?q=${searchQuery}&page=1`
        );
        const data = await response.json();
        if (data.success) {
          setAnimes(data.data.animes);
        }
      } catch (error) {
        console.error("Error fetching anime data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (searchQuery) {
      fetchAnimes();
    }
  }, [searchQuery, apiUrl]);

  const handleAnimeClick = (animeId) => {
    setSelectedAnimeId(animeId);
    router.push(`/watch/${animeId}`);
  };

  if (loading) {
    return (
      <div className="w-full flex item-center justify-center m-8">
        <div className="loader p-4"></div>
      </div>
    );
  }

  return (
    <div className="mx-auto p-4 text-white">
      <h2 className="text-2xl font-bold mb-4">
        Search Results for &quot;{searchQuery}&quot;
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {animes.map((anime) => (
          <div
            key={anime.id}
            className="border rounded-lg overflow-hidden shadow-md"
          >
            <img
              src={anime.poster}
              alt={anime.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{anime.name}</h3>
              <p>Duration: {anime.duration}</p>
              <p>Rating: {anime.rating}</p>
              <button
                onClick={() => handleAnimeClick(anime.id)}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Watch
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Results;
