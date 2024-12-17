import { useParams } from "react-router"
import useSWR from "swr"
import LoadingScreen from "../components/LoadingScreen"
import ErrorScreen from "../components/ErrorScreen"
import { getPokemonByName } from "../utils/getPokemonByName"
import { FaHeart, FaRegHeart } from "react-icons/fa"
import { useEffect, useState } from "react"

const Pokemon = () => {

  const [isLiked, setIsLiked] = useState<boolean>(false)

  const { pokemonName } = useParams<string>() // URL'den gelen pokemonName
  const { data: pokemon, error: pomkemonError, isLoading: pokemonIsLoading } = useSWR(pokemonName, getPokemonByName)

  useEffect(() => {
    if (pokemon) {
      let likedPokemons: number[] = JSON.parse(localStorage.getItem('likedPokemons')!) || []
      setIsLiked(likedPokemons.includes(pokemon?.id))
    }
  }, [pokemon])

  if (pokemonIsLoading) return <LoadingScreen />
  if (pomkemonError) return <ErrorScreen />

  const handleLike = (): void => {
    let likedPokemons: number[] = JSON.parse(localStorage.getItem('likedPokemons')!) || []

    // Eğer dizi veya pokemon.id yoksa diziye ekleme yap
    if (!likedPokemons.includes(pokemon.id)) {
      likedPokemons.push(pokemon.id)
      setIsLiked(true)
    } else {
      // pokemon.id varsa diziden kaldır
      likedPokemons = likedPokemons.filter(id => id !== pokemon.id)
      setIsLiked(false)
    }

    // localStorage güncelle
    localStorage.setItem('likedPokemons', JSON.stringify(likedPokemons))
  }


  return (
    <div className="bg-white rounded-md shadow-lg w-full py-48 lg:py-32 px-5">
      <div className="flex flex-col items-center gap-5">
        <div className="relative flex-none w-80 aspect-square border-slate-200 rounded-md bg-white p-4 shadow border">
          <img
            src={pokemon.sprites.other["official-artwork"].front_default !== null ? pokemon.sprites.other["official-artwork"].front_default : '/logov2.png'}
            alt={`${pokemon.name} resmi`}
            className="w-full h-full object-contain rounded-md"
          />
          <div onClick={handleLike} className="absolute -top-3 -right-3 shadow w-8 h-8 rounded-full  flex justify-center items-center bg-slate-200 cursor-pointer hover:-translate-y-1 transition-all">
            {
              isLiked ?
                <FaHeart className="text-red-500" />
                :
                <FaRegHeart className="text-zinc-800" />
            }
          </div>
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
                className="bg-blue-200 text-blue-500 px-3 py-1 rounded-md text-sm font-medium flex justify-center items-center text-center"
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
                className="bg-blue-200 text-blue-500 px-3 py-1 rounded-md text-sm font-medium flex justify-center items-center text-center"
              >
                {ability.ability.name}
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  )
}

export default Pokemon