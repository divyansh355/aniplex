"use client";
import { useEffect, useState, useRef } from "react";
import useStore from "@/utils/store"; // Adjust the import based on your project structure
import EpisodeServers from "./EpisodesServers"; // Import the component that displays servers

const EPISODES_PER_PAGE = 5; // Number of episodes to display at a time

const Episodes = () => {
  const { selectedAnimeId, episodes, fetchEpisodes, fetchEpisodeServers } =
    useStore(); // fetchEpisodeServers added from the store
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [selectedEpisodeId, setSelectedEpisodeId] = useState(null); // Track selected episode
  const [servers, setServers] = useState(null); // Track servers for the selected episode
  const containerRef = useRef(null); // Ref for the episode container

  useEffect(() => {
    if (selectedAnimeId) {
      fetchEpisodes(selectedAnimeId); // Fetch episodes whenever selectedAnimeId changes
    }
  }, [selectedAnimeId, fetchEpisodes]);

  // Filter episodes based on the search query for both episode number and title
  const filteredEpisodes = episodes.filter(
    (episode) =>
      episode.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      episode.number.toString().includes(searchQuery) // Search by episode number
  );

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (container) {
        // Check if the user has scrolled to the bottom
        if (
          container.scrollTop + container.clientHeight >=
          container.scrollHeight
        ) {
          // Load more episodes if there are more to load
          if (currentPage * EPISODES_PER_PAGE < filteredEpisodes.length) {
            setCurrentPage((prevPage) => prevPage + 1); // Increment page number to load more episodes
          }
        }
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll); // Add scroll event listener
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll); // Clean up the event listener
      }
    };
  }, [currentPage, filteredEpisodes.length]);

  // Calculate the episodes to display for the current page
  const indexOfLastEpisode = currentPage * EPISODES_PER_PAGE;
  const currentEpisodes = filteredEpisodes.slice(0, indexOfLastEpisode); // Show all loaded episodes up to the current page

  // Handle episode click to fetch servers
  const handleEpisodeClick = async (episodeId) => {
    setSelectedEpisodeId(episodeId); // Set the selected episode ID
    const fetchedServers = await fetchEpisodeServers(episodeId); // Fetch servers for the selected episode
    setServers(fetchedServers); // Set the fetched servers to state
  };

  if (!episodes.length) {
    return <div className="text-center">Loading episodes...</div>; // Show loading message while fetching
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Episodes</h1>
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by episode number or title..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="text-black rounded p-2 mb-4 w-full"
      />
      <div className="overflow-y-auto max-h-[400px]" ref={containerRef}>
        {" "}
        {/* Set a max height for scrolling */}
        <ul className="space-y-4">
          {currentEpisodes.map((episode) => (
            <li key={episode.episodeId} className="p-4 rounded shadow">
              <div
                className="cursor-pointer hover:text-blue-500"
                onClick={() => handleEpisodeClick(episode.episodeId)} // Fetch servers when episode is clicked
              >
                <h2 className="font-semibold">{`Episode ${episode.number}: ${episode.title}`}</h2>
                <p className="text-gray-300">
                  {episode.isFiller ? "Filler Episode" : "Canon Episode"}
                </p>
              </div>
              {/* Conditionally render the servers for the selected episode */}
              {selectedEpisodeId === episode.episodeId && servers && (
                <EpisodeServers servers={servers} />
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Episodes;
