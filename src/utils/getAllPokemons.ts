import { API_ENDPOINT } from "./config";

export const getAllPokemons = async () => {
    const response = await fetch(`${API_ENDPOINT}/pokemon?limit=1302&offset=0`);
    if (!response.ok) {
        throw new Error("Veri yüklenirken bir hata oluştu!");
    }
    const data = await response.json();
    return data.results;
};