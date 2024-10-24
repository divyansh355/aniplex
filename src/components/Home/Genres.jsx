"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/components/Genres/Loader";

const Genres = ({ genreName = "shounen" }) => {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  const fetchData = async (genreName) => {
    try {
      setLoading(true);
      const resp = await fetch(`${process.env.NEXT_PUBLIC_ANIME_API}/api/v2/hianime/genre/${genreName}`);
      const data = await resp.json();

      if (!data.success) {
        throw new Error("Failed to fetch genres.");
      }

      setGenres(data.data.genres);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(genreName);
  }, [genreName]);

  if (loading) return <Loader />;

  if (error) return <p className="text-red-500">{error}</p>;

  if (!genres || genres.length === 0) {
    return <p>No genres available.</p>;
  }

  const handleGenreClick = (genre) => {
    const genreUrl = genre.toLowerCase().replace(/\s+/g, "-");
    router.push(`/genre/${genreUrl}`);
  };

  return (
    <div className="mx-auto p-6 bg-black flex flex-col items-center">
      <div className="p-4 w-full">
        <h2 className="text-white text-3xl font-bold mb-6 text-center">
          Explore Genres
        </h2>
        <div className="flex flex-wrap gap-2 justify-center">
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
