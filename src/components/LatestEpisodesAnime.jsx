"use client";

import React, { useEffect, useState } from "react";
import useStore from "@/utils/store";
import { useRouter } from "next/navigation";

const LatestEpisodesAnime = ({ animes }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 5;
  const setSelectedAnimeId = useStore((state) => state.setSelectedAnimeId);
  const [hoveredEpisodeId, setHoveredEpisodeId] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

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

  // Check for mobile devices
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust the breakpoint if necessary
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Call on mount to set initial state

    return () => {
      window.removeEventListener("resize", handleResize);
    };
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

  if (error) {
    return <div className="text-red-500">Error fetching data: {error.message}</div>;
  }

  const latestEpisodes = data?.latestEpisodeAnimes || [];
  const totalEpisodes = latestEpisodes.length;

  if (totalEpisodes === 0) {
    return <div className="text-center">No latest episodes available.</div>;
  }

  const handleAnimeClick = (id) => {
    setSelectedAnimeId(id);
    router.push(`/watch/${id}`);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + itemsPerPage) % totalEpisodes);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - itemsPerPage < 0
        ? Math.floor(totalEpisodes / itemsPerPage) * itemsPerPage - itemsPerPage
        : prevIndex - itemsPerPage
    );
  };

  const displayedEpisodes = latestEpisodes.slice(
    currentIndex,
    currentIndex + itemsPerPage
  );

  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold text-center mb-6">Latest Episodes</h2>
      <div className="flex justify-around items-center">
        <button
          onClick={handlePrev}
          className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 ${currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={currentIndex === 0}
        >
          Prev
        </button>
        <div className="flex flex-wrap justify-center gap-4">
          {displayedEpisodes.map((episode) => (
            <div
              key={episode.id}
              className={`relative w-40 h-60 overflow-hidden rounded-lg shadow-lg cursor-pointer transition-all duration-300 ${hoveredEpisodeId === episode.id ? "backdrop-blur-lg" : ""}`}
              onMouseEnter={() => !isMobile && setHoveredEpisodeId(episode.id)}
              onMouseLeave={() => !isMobile && setHoveredEpisodeId(null)}
              onClick={() => handleAnimeClick(episode.id)}
            >
              <img
                src={episode.poster}
                alt={episode.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-2">
                <h3 className="text-sm font-semibold text-white truncate">
                  {episode.name} ({episode.jname})
                </h3>
                <p className="text-xs text-gray-300">Duration: {episode.duration}</p>
                <p className="text-xs text-gray-300">Type: {episode.type}</p>
                <p className="text-xs text-gray-300">
                  Episodes: Sub: {episode.episodes.sub}{" "}
                  {episode.episodes.dub ? `| Dub: ${episode.episodes.dub}` : ""}
                </p>
                {episode.rating && (
                  <p className="text-xs text-red-500">Rating: {episode.rating}</p>
                )}
                {/* Centered Watch button for mobile */}
                {isMobile && hoveredEpisodeId === episode.id && (
                  <div className="mt-2">
                    <button
                      onClick={() => handleAnimeClick(episode.id)}
                      className="w-full px-4 py-2 bg-blue-600 text-white rounded-md"
                    >
                      Watch
                    </button>
                  </div>
                )}
              </div>
              {/* Centered Watch button for desktop */}
              {!isMobile && hoveredEpisodeId === episode.id && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={() => handleAnimeClick(episode.id)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md"
                  >
                    Watch
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
        <button
          onClick={handleNext}
          className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700
          ${currentIndex + itemsPerPage >= totalEpisodes ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={currentIndex + itemsPerPage >= totalEpisodes}
        >
          Next
        </button>
      </div>

    </div>
  );
};

export default LatestEpisodesAnime;
