"use client";
import React, {useState, useEffect} from "react";
import Genres from "./Genres";
import "@/styles/homeLoader.css";

function Footer() {
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
    <div className="bg-black">
      <Genres animes={data.data.genres} />
      <div className=" mb-4 w-full text-white text-center bg-black">The data is shown on this site does not belong to me.</div>
    </div>
  );
}

export default Footer;
