import React, { useEffect, useState } from "react";
import useStore from "@/utils/store";
import {
  FaCirclePlay,
  FaClock,
  FaClosedCaptioning,
  FaMicrophone,
} from "react-icons/fa6";
import { FaCalendar } from "react-icons/fa";
import { useRouter } from "next/navigation";

function SpotlightAnimes({ animes }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const setSelectedAnimeId = useStore((state) => state.setSelectedAnimeId);
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

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const nextSlide = () => {
    if (!data) return;
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 >= data.data.spotlightAnimes.length ? 0 : prevIndex + 1
    );
    setShowFullDescription(false);
  };

  const prevSlide = () => {
    if (!data) return;
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? data.data.spotlightAnimes.length - 1 : prevIndex - 1
    );
    setShowFullDescription(false);
  };

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
    return (
      <div className="text-red-500">Error fetching data: {error.message}</div>
    );
  }

  if (!data || !data.data || !data.data.spotlightAnimes) {
    return <div className="text-red-500">No spotlight animes available.</div>;
  }

  const anime = data.data.spotlightAnimes[currentIndex];

  const truncateDescription = (description) => {
    const words = description.split(" ");
    return words.length > 50
      ? words.slice(0, 50).join(" ") + "..."
      : description;
  };

  const handleAnimeClick = () => {
    setSelectedAnimeId(anime.id);
    router.push(`/watch/${anime.id}`);
  };

  return (
    <div className="rounded-lg overflow-hidden">
      <div className="relative flex items-center justify-center">
        <button
          onClick={prevSlide}
          className="absolute left-4 z-10 p-2 bg-gray-800 bg-opacity-60 text-white rounded-full hover:bg-opacity-80 transition duration-300 focus:outline-none"
        >
          &lt;
        </button>

        <div className="flex w-full">
          <div className="w-1/2 bg-transparent text-white p-6 flex flex-col justify-between">
            <div>
              <h1 className="text-lg sm:text-2xl lg:text-3xl font-bold">
                #{anime.rank} Spotlight
              </h1>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mt-2">
                {anime.name} ({anime.jname})
              </h2>

              <p className="mt-4">
                {showFullDescription
                  ? anime.description
                  : truncateDescription(anime.description)}
              </p>

              <button
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="mt-4 text-blue-300 underline"
              >
                {showFullDescription ? "Show Less" : "Read More"}
              </button>
            </div>

            <div className="flex flex-col gap-2">
              <div className="mt-6 flex flex-wrap gap-2 text-sm sm:text-base">
                <div className="flex items-center gap-1">
                  <FaCirclePlay />
                  <span>{anime.otherInfo[0]}</span>
                </div>
                <div className="flex items-center gap-1">
                  <FaClock />
                  <span>{anime.otherInfo[1]}</span>
                </div>
                <div className="flex items-center gap-1">
                  <FaCalendar />
                  <span>{anime.otherInfo[2]}</span>
                </div>
                <div className="flex items-center gap-1 bg-purple-950 text-white p-1 rounded-lg">
                  {anime.otherInfo[3]}
                </div>
                <div className="flex items-center gap-2">
                  {anime.episodes.dub && (
                    <div className="flex justify-center items-center gap-1 bg-[#b0e3af] text-black p-1 rounded-lg">
                      <FaMicrophone /> {anime.episodes.dub}
                    </div>
                  )}
                  {anime.episodes.sub && (
                    <div className="flex justify-center items-center gap-1 bg-[#b9e7ff] text-black p-1 rounded-lg">
                      <FaClosedCaptioning /> {anime.episodes.sub}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex justify-start">
                <button
                  className="flex justify-center items-center gap-2 bg-blue-400 p-2 rounded-lg"
                  onClick={handleAnimeClick}
                >
                  <FaCirclePlay />
                  Watch Now
                </button>
              </div>
            </div>
          </div>

          <div className="w-1/2 flex items-center justify-center">
            <img
              src={anime.poster}
              alt={anime.name}
              className="object-fill w-full h-full rounded-tr-lg rounded-br-lg"
            />
          </div>
        </div>

        <button
          onClick={nextSlide}
          className="absolute right-4 z-10 p-2 bg-gray-800 bg-opacity-60 text-white rounded-full hover:bg-opacity-80 transition duration-300 focus:outline-none"
        >
          &gt;
        </button>
      </div>
    </div>
  );
}

export default SpotlightAnimes;
