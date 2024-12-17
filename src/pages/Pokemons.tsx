import { useState } from "react";
import useSWR from "swr";
import { getAllPokemons } from "../utils/getAllPokemons";
import LoadingScreen from "../components/LoadingScreen";
import PokemonCard from "../components/PokemonCard";
import ErrorScreen from "../components/ErrorScreen";

const Pokemons = () => {
    const { data: pokemons, error: pokemonsError, isValidating: pokemonsIsValidating } = useSWR("pokemons", getAllPokemons);

    // Sayfalama için state
    const [currentPage, setCurrentPage] = useState<number>(() => {
        const savedPage = localStorage.getItem("lastPage");
        return savedPage ? parseInt(savedPage, 10) : 1;
    });
    const itemsPerPage = 9; // Her sayfada gösterilecek Pokémon sayısı

    // Arama için state
    const [searchQuery, setSearchQuery] = useState<string>("");

    // Yükleniyor ve hata ekranları
    if (pokemonsIsValidating && !pokemons) return <LoadingScreen />;
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

    // Sayfa butonlarını oluşturma
    const generatePageButtons = () => {
        const buttons = [];
        const delta = 1; // Mevcut sayfanın önceki ve sonraki 3 sayfa

        for (let i = 1; i <= totalPages; i++) {
            if (
                i === 1 || // İlk sayfa
                i === totalPages || // Son sayfa
                (i >= currentPage - delta && i <= currentPage + delta) // Mevcut sayfanın çevresi
            ) {
                buttons.push(
                    <button
                        key={i}
                        onClick={() => {
                            setCurrentPage(i);
                            localStorage.setItem("lastPage", i.toString());
                        }}
                        className={`px-4 py-2 rounded font-medium text-xs lg:text-base ${i === currentPage
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200 text-zinc-800 hover:bg-gray-300"
                            }`}
                    >
                        {i}
                    </button>
                );
            } else if (
                (i === currentPage - delta - 1 || i === currentPage + delta + 1) &&
                !(buttons[buttons.length - 1]?.type === "span" && buttons[buttons.length - 1]?.props.children === "...")
            ) {
                buttons.push(<span key={`dots-${i}`}>...</span>);
            }
        }

        return buttons;
    };

    return (
        <div className="py-48 lg:py-32 px-5">
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

            <div className="flex justify-center items-center mt-5 gap-2">
                {generatePageButtons()}
            </div>
        </div>
    );
};

export default Pokemons;