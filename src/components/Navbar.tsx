import { Link } from "react-router"

const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50 transition-all duration-300">
            <div className="w-full flex lg:flex-row flex-col items-center justify-between px-6 py-3 gap-3">
                <Link to="/" className="flex items-center space-x-6">
                    <img src="/logov2.png" alt="Logo" className="w-16 h-16" />
                    <span className="font-bold text-zinc-800 text-sm lg:text-base">Pokédex</span>
                </Link>
                <ul className="flex items-center space-x-8">
                    <li><Link to="/" className="text-zinc-800 font-medium text-sm lg:text-base">Ana Sayfa</Link></li>
                    <li><Link to="/pokemonlar" className="text-zinc-800 font-medium text-sm lg:text-base">Pokemonlar</Link></li>
                    <li><Link to="/hakkimizda" className="text-zinc-800 font-medium text-sm lg:text-base">Hakkımızda</Link></li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar