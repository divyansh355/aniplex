"use client";

import React from "react";
import Episodes from "@/components/Player/Episodes";
import EpisodeServers from "@/components/Player/EpisodesServers";
import VideoPlayer from "@/components/Player/VideoPlayer";
import useStore from "@/utils/store";

function Watch() {
  const { streamingLink, selectedEpisodeId } = useStore();

  return (
    <div className="bg-black text-white pt-4">
      <div className="h-screen w-full flex">
        <div className="w-2/12">
          <Episodes />
        </div>
        <div className="flex w-10/12 h-full">
          <div>
            {streamingLink && <VideoPlayer streamingLink={streamingLink} />}
          </div>
          <div>
            {selectedEpisodeId && (
              <EpisodeServers episodeId={selectedEpisodeId} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Watch;
