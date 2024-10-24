"use client";
import { useEffect } from "react";
import useStore from "@/utils/store"; // Adjust the import based on your project structure

const EpisodeServers = ({ episodeId }) => {
  const {
    fetchEpisodeServers,
    episodeServers,
    selectedEpisodeId,
    fetchStreamingLink,
  } = useStore();

  useEffect(() => {
    if (episodeId) {
      fetchEpisodeServers(episodeId); // Fetch episode servers when episodeId is provided
    }
  }, [episodeId, fetchEpisodeServers]);

  const servers = episodeServers[selectedEpisodeId] || {};

  const handleServerClick = (serverName, category) => {
    fetchStreamingLink(selectedEpisodeId, serverName, category); // Fetch streaming link based on selected server
  };

  return (
    <div className="p-4 w-full flex flex-col justify-center items-center">
      <h2 className="text-xl font-bold mb-4">Available Servers</h2>
      {servers.sub && servers.sub.length > 0 && (
        <div className="flex justify-center items-center p-4">
          <span>
            <h3 className="text-lg">Sub:&nbsp; &nbsp;</h3>
          </span>
          <ul className="flex gap-4">
            {servers.sub.map((server) => (
              <li key={server.serverId}>
                <button
                  onClick={() => handleServerClick(server.serverName, "sub")}
                  className="bg-blue-500 p-2 rounded-md text-white"
                >
                  {server.serverName}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {servers.dub && servers.dub.length > 0 && (
        <div className="flex justify-center items-center p-4">
          <h3 className="text-lg">Dub:&nbsp; &nbsp;</h3>
          <ul className="flex gap-4">
            {servers.dub.map((server) => (
              <li key={server.serverId}>
                <button
                  onClick={() => handleServerClick(server.serverName, "dub")}
                  className="bg-blue-500 p-2 rounded-md text-white"
                >
                  {server.serverName}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {servers.raw && servers.raw.length > 0 && (
        <>
          <h3 className="text-lg">Raw</h3>
          <ul>
            {servers.raw.map((server) => (
              <li key={server.serverId}>
                <button
                  onClick={() => handleServerClick(server.serverName, "raw")}
                  className="text-blue-500 hover:underline"
                >
                  {server.serverName}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
      {!servers.sub && !servers.dub && !servers.raw && (
        <p>No servers available.</p>
      )}
      {/* {streamingLink && (
        <div className="mt-4">
          <h3 className="text-lg">Streaming Link:</h3>
          <a
            href={streamingLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            {streamingLink}
          </a>
        </div>
      )} */}
    </div>
  );
};

export default EpisodeServers;
