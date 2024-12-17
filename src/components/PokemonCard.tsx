import { useState, useEffect } from "react";
import { Link } from "react-router";

const PokemonCard = ({ id, name }: { id: number; name: string }) => {
    const [imageExists, setImageExists] = useState<boolean>(true);

    useEffect(() => {
        const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
        const img = new Image();
        img.onload = () => setImageExists(true);
        img.onerror = () => setImageExists(false);
        img.src = imageUrl;
    }, [id]);

    return (
        <Link
            to={`/pokemonlar/${name}`}
            className="w-full flex flex-col justify-center items-center rounded-md bg-slate-50 border border-slate-200 shadow hover:shadow-lg hover:-translate-y-2 transition-all cursor-pointer p-2"
        >
            {imageExists ? (
                <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
                    alt="Pokemon image"
                    className="w-64 h-auto"
                />
            ) : (
                <img
                    src={`/logov2.png`}
                    alt="Pokemon image"
                    className="w-64 h-auto"
                />
            )}
            <p className="font-bold text-zinc-800 text-xl uppercase">{name}</p>
        </Link>
    );
};

export default PokemonCard;