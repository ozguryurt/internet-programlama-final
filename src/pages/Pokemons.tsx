import { useState } from "react";
import useSWR from "swr";
import { getAllPokemons } from "../utils/getAllPokemons";
import LoadingScreen from "../components/LoadingScreen";
import PokemonCard from "../components/PokemonCard";
import ErrorScreen from "../components/ErrorScreen";

const Pokemons = () => {
    const { data: pokemons, error: pokemonsError, isLoading: pokemonsIsLoading } = useSWR("pokemons", getAllPokemons);

    // Sayfalama için state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9; // Her sayfada gösterilecek Pokémon sayısı

    // Arama için state
    const [searchQuery, setSearchQuery] = useState("");

    // Yükleniyor ve hata ekranları
    if (pokemonsIsLoading) return <LoadingScreen />;
    if (pokemonsError) return <ErrorScreen />;

    // Arama yaparken searchQuery göre filtreleme
    const filteredPokemons = pokemons.filter((pokemon: any) =>
        pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sayfalama işlemi (currentPage ve itemsPerPage )
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedPokemons = filteredPokemons.slice(startIndex, endIndex);

    // Toplam sayfa sayısını hesaplama
    const totalPages = Math.ceil(filteredPokemons.length / itemsPerPage);

    // Önceki sayfa butonu
    const goToPreviousPage = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };

    // Sonraki sayfa butonu
    const goToNextPage = () => {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    };

    return (
        <div className="py-36 px-5">
            <div className="mb-5 flex justify-center">
                <input
                    type="text"
                    placeholder="Pokémon ara..."
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setCurrentPage(1);
                    }}
                    className="rounded px-3 py-2 w-full bg-slate-50 border border-slate-200 focus:outline-none font-medium text-zinc-800"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {paginatedPokemons.map((pokemon: any, index: number) => (
                    <PokemonCard
                        key={index}
                        id={pokemon.url.split("/").filter(Boolean).pop()}
                        name={pokemon.name}
                    />
                ))}
            </div>

            <div className="flex justify-between items-center mt-5">
                <button
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded font-medium ${currentPage === 1 ? "bg-gray-300 opacity-25" : "bg-blue-500 text-white"}`}>
                    Geri
                </button>

                <span className="text-zinc-800 font-medium">
                    {currentPage} / {totalPages}
                </span>

                <button
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded font-medium ${currentPage === totalPages ? "bg-gray-300 opacity-25" : "bg-blue-500 text-white"}`}>
                    İleri
                </button>
            </div>
        </div>
    );
};

export default Pokemons;