import { useEffect, useState } from "react";
import { Alert, View } from "react-native";

import { api } from "@/services/api";

import { Categories, CategoriesProps } from "@/components/categories";
import { PlaceProps } from "@/components/place";
import { Places } from "@/components/places";

type MarketProps = PlaceProps

export default function Home() {
    const [categories, setCategories] = useState<CategoriesProps>([]);
    const [category, setCategory] = useState<string>("");
    const [markets, setMarkets] = useState<MarketProps[]>([]);

    async function featchCategories() {
        try {
           const { data } = await api.get("/categories");
           setCategories(data);
           setCategory(data[0].id);
        } catch (error) {
            console.log(error);
            Alert.alert("Erro ao carregar categorias");
        }
    }

    async function fetchMarkets() {
        try {
            if (!category) return;
            
            const { data } = await api.get("/markets/category/" + category);

            setMarkets(data);
        } catch (error) {
            console.log(error);
            Alert.alert("Locais", "Não foi possivel carregar os locais.");
        }
    }

    useEffect(() => {
        featchCategories();
    }, []);

    useEffect(() => {
        fetchMarkets();
    }, [category]);

    return (
        <View style={{ flex: 1 }}>
            <Categories
                data={categories}
                onSelect={setCategory}
                selected={category}
            />

            <Places data={markets} />
        </View>
    )
}