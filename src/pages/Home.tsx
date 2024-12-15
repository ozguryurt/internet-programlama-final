import { Link } from "react-router"

const Home = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 gap-5 py-36 px-5">
      <div className="flex justify-center items-center">
        <img src="/pikachu.png" alt="Pikachu" className="w-8/12 h-auto" />
      </div>
      <div className="flex flex-col justify-center items-center gap-3">
        <h1 className="font-bold text-3xl lg:text-6xl text-zinc-800 text-center">Her Pokémon Bir Macera!</h1>
        <h5 className="font-medium text-base lg:text-lg text-zinc-800 text-center">Pokédex ile sevdiğiniz Pokémon'ların dünyasına adım atın! Özelliklerini keşfedin, güçlü yanlarını öğrenin ve favorilerinizi bulun. Pokémon dünyası parmaklarınızın ucunda!</h5>
        <Link to={'/pokemonlar'} className="font-medium text-sm lg:text-base bg-blue-500 py-1 px-5 rounded-md text-white">Göz at!</Link>
      </div>
    </div>
  )
}

export default Home