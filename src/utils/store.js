import { create } from "zustand";

const apiUrl = process.env.NEXT_PUBLIC_ANIME_API;

const useStore = create((set) => ({
  selectedAnimeId: null,
  episodes: [],
  episodeServers: {},
  selectedEpisodeId: null,
  streamingLink: null, 

  setSelectedAnimeId: (id) => {
    console.log("Selected Anime ID:", id);
    set({ selectedAnimeId: id });
    set({ episodes: [] }); 
  },

  fetchEpisodes: async (animeId) => {
    try {
      const response = await fetch(
        `${apiUrl}/api/v2/hianime/anime/${animeId}/episodes`
      );
      if (!response.ok) {
        throw new Error("Error fetching episodes");
      }
      const data = await response.json();
      set({ episodes: data.data.episodes });
    } catch (error) {
      console.error("Error fetching episodes:", error);
    }
  },

  fetchEpisodeServers: async (animeEpisodeId) => {
    try {
      const response = await fetch(
        `${apiUrl}/api/v2/hianime/episode/servers?animeEpisodeId=${animeEpisodeId}`
      );
      if (!response.ok) {
        throw new Error("Error fetching episode servers");
      }
      const data = await response.json();
      set((state) => ({
        episodeServers: {
          ...state.episodeServers,
          [animeEpisodeId]: data.data,
        },
        selectedEpisodeId: animeEpisodeId,
      }));
    } catch (error) {
      console.error("Error fetching episode servers:", error);
    }
  },

  fetchStreamingLink: async (episodeId, serverName, category) => {
    try {
      const response = await fetch(
        `${apiUrl}/api/v2/hianime/episode/sources?animeEpisodeId=${episodeId}&server=${serverName}&category=${category}`
      );
      if (!response.ok) {
        throw new Error("Error fetching streaming link");
      }
      const data = await response.json();
      const streamingLink = data.data.sources[0]?.url;
      set({ streamingLink });
    } catch (error) {
      console.error("Error fetching streaming link:", error);
    }
  },

  genres: [],
  currentGenre: "",
  currentPage: 1,
  totalPages: 1,

  setGenres: (genres) => set({ genres }),
  setCurrentGenre: (genre) => set({ currentGenre: genre, currentPage: 1 }), 
  setCurrentPage: (page) => set({ currentPage: page }),
  setTotalPages: (pages) => set({ totalPages: pages }),
}));

export default useStore;
