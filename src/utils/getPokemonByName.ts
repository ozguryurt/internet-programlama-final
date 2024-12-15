import { API_ENDPOINT } from "./config";

export const getPokemonByName = async (name: string) => {
  const response = await fetch(`${API_ENDPOINT}/pokemon/${name}`);
  if (!response.ok) {
    throw new Error("Pokémon verisi yüklenirken bir hata oluştu!");
  }
  return response.json();
};