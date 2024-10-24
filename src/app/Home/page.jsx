"use client";

import React, { useEffect, useState } from "react";
import SpotlightAnimes from "@/components/SpotlightAnimes";
import TrendingAnimes from "@/components/TrendingAnimes";
import LatestEpisodesAnime from "@/components/LatestEpisodesAnime";
import UpcomingAnime from "@/components/UpcomingAnime";
import TopTenAnime from "@/components/TopTenAnime";
import TopAiringAnime from "@/components/TopAiringAnimes";
import MostPopularAnimes from "@/components/MostPopularAnimes";
import MostFavoriteAnimes from "@/components/MostFavoriteAnimes";
import LatestCompletedAnimes from "@/components/LatestCompletedAnimes";
import "@/styles/homeLoader.css";

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await fetch(
          `${process.env.NEXT_PUBLIC_ANIME_API}/api/v2/hianime/home`
        );
        const data = await resp.json();
        setData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-black">
        <div>
          <span className="loader"></span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error loading data: {error.message}</div>;
  }

  return (
    <div className="bg-black text-white">
      {/* <p>{JSON.stringify(data.data.genres)}</p> HomePage Debuging */}
      {/* Spotlight Animes */}
      <SpotlightAnimes animes={data} />
      {/* Trending Animes */}
      <TrendingAnimes animes={data.data} />
      {/* Latest Episodes */}
      <LatestEpisodesAnime animes={data.data} />
      {/* Upcoming Animes */}
      <UpcomingAnime animes={data.data} />
      {/* Top 10 Anime */}
      <TopTenAnime animes={data.data} />
      {/* Top Airing Anime */}
      <TopAiringAnime animes={data.data} />
      {/* Most Popular Animes */}
      <MostPopularAnimes animes={data.data} />
      {/* Most Favorite Animes */}
      <MostFavoriteAnimes animes={data.data} />
      {/* Latest Completed Animes */}
      <LatestCompletedAnimes animes={data.data} />
    </div>
  );
}
