import { useParams } from "react-router";
import useSWR from "swr";
import LoadingScreen from "../components/LoadingScreen";
import ErrorScreen from "../components/ErrorScreen";
import { getPokemonByName } from "../utils/getPokemonByName";

const Pokemon = () => {
  const { pokemonName } = useParams(); // URL'den gelen pokemonName
  const { data: pokemon, error: pomkemonError, isLoading: pokemonIsLoading } = useSWR(pokemonName, getPokemonByName);

  if (pokemonIsLoading) return <LoadingScreen />
  if (pomkemonError) return <ErrorScreen />

  return (
    <div className="bg-white rounded-md shadow-lg w-full py-36 px-5">
      <div className="flex flex-col items-center gap-5">
        <div className="relative flex-none w-80 aspect-square border-slate-200 rounded-md bg-white p-4 shadow border">
          <img
            src={pokemon.sprites.other["official-artwork"].front_default}
            alt={`${pokemon.name} resmi`}
            className="w-full h-full object-contain rounded-md"
            loading="lazy"
          />
        </div>

        <div className="bg-slate-200 text-zinc-800 rounded-md shadow border w-80 p-5 space-y-5">
          <h1 className="text-xl uppercase font-bold text-center">{pokemon.name}</h1>
        </div>

        {/* Pokémon Özellikleri */}
        <div className="bg-slate-200 text-zinc-800 rounded-md shadow border w-80 p-5 space-y-5">
          <h1 className="text-xl uppercase font-bold text-center">Özellikler</h1>
          <div className="space-y-4">
            <h1 className="text-sm uppercase font-medium text-center">Yükseklik: {pokemon.height}</h1>
            <h1 className="text-sm uppercase font-medium text-center">Ağırlık: {pokemon.weight}</h1>
            {pokemon.stats.map((stat: any, index: number) => (
              <div key={index}>
                <div className="flex justify-between items-center">
                  <span className="font-medium">{stat.stat.name.toUpperCase()}</span>
                  <span className="font-medium">{stat.base_stat}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
                  <div
                    className="h-2 rounded-md bg-blue-500"
                    style={{ width: `${Math.min(stat.base_stat, 100)}%` }}>
                  </div>
                  {/* %110 olursa 100'den taşmaması için Math.min kullanıldı */}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pokémon Türleri */}
        <div className="bg-slate-200 text-zinc-800 rounded-md shadow border w-80 p-5 space-y-5">
          <h2 className="text-lg font-bold mb-3 text-center">Türler</h2>
          <ul className="flex justify-center space-x-3">
            {pokemon.types.map((type: any, index: number) => (
              <li
                key={index}
                className="bg-blue-200 text-blue-500 px-3 py-1 rounded-md text-sm font-medium"
              >
                {type.type.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-slate-200 text-zinc-800 rounded-md shadow border w-80 p-5 space-y-5">
          <h2 className="text-lg font-bold mb-3 text-center">Yetenekler</h2>
          <ul className="flex justify-center space-x-3">
            {pokemon.abilities.map((ability: any, index: number) => (
              <li
                key={index}
                className="bg-blue-200 text-blue-500 px-3 py-1 rounded-md text-sm font-medium"
              >
                {ability.ability.name}
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
};

export default Pokemon;