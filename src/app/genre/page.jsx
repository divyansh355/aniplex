"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/components/Genres/Loader";

const Genres = () => {
  const apiUrl = process.env.NEXT_PUBLIC_ANIME_API;
  const [genres, setGenres] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/v2/hianime/home`);
        if (!response.ok) throw new Error("Failed to fetch genres");
        const data = await response.json();
        setGenres(data?.data?.genres);
      } catch (err) {
        setError(err);
      }
    };

    fetchGenres();
  }, [apiUrl]);

  if (!genres) return <Loader />;

  if (error) return <p>Error: {error.message}</p>;

  const handleGenreClick = (genre) => {
    const genreUrl = genre.toLowerCase().replace(/\s+/g, "-");
    router.push(`/genre/${genreUrl}`);
  };

  return (
    <div className="w-full h-[100vh] mx-auto p-6 bg-black flex justify-center items-center">
      <div className="p-10">
        <h2 className="text-white text-3xl font-bold mb-6 text-center">
          Explore Genres
        </h2>
        <div className="flex flex-wrap gap-2">
          {genres.map((genre, index) => (
            <button
              key={index}
              className="bg-gray-800 text-white py-2 px-4 rounded-lg shadow-md hover:bg-gray-700 transition-colors"
              onClick={() => handleGenreClick(genre)}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Genres;
