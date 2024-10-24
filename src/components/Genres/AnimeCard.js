const AnimeCard = ({ anime }) => (
  <div className="bg-white shadow-md rounded overflow-hidden">
    <img
      src={anime.poster}
      alt={anime.name}
      className="w-full h-48 object-cover"
    />
    <div className="p-4">
      <h2 className="text-lg font-bold">{anime.name}</h2>
      <p>Type: {anime.type}</p>
      <p>Rating: {anime.rating}</p>
      <p>
        Episodes: Sub {anime.episodes.sub} / Dub {anime.episodes.dub}
      </p>
    </div>
  </div>
);

export default AnimeCard;
