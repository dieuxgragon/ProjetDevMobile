import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function useAsyncStorage<T>(
    key: string,
    initialValue?: T,
): [T | null, (value: T) => void, boolean] {
    const [value, setValue] = useState<T | null>(initialValue ?? null);
    const [loading, setLoading] = useState(true);

    // Au chargement de la page, on charge la valeur de la clé
    useEffect(() => {
        const load = async () => {
            const value = await AsyncStorage.getItem(key);
            setValue(value ? JSON.parse(value) : initialValue ?? null);
            setLoading(false);
        };
        load();
    }, [key]);

    // Pour sauvegarder la valeur, on la convertit en JSON et on l'enregistre dans AsyncStorage
    const save = async (value: T) => {
        await AsyncStorage.setItem(key, JSON.stringify(value));
        setValue(value);
    };

    // On retourne la valeur, la fonction pour sauvegarder et le statut de chargement
    return [value, save, loading];
}
