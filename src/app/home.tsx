import { useEffect, useState } from "react";
import { Alert, View } from "react-native";

import { Categories, CategoriesProps } from "@/components/categories";
import { api } from "@/services/api";

export default function Home() {
    const [categories, setCategories] = useState<CategoriesProps>([]);
    const [category, setCategory] = useState<string>("");

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

    useEffect(() => {
        featchCategories();
    }, [])
    return (
        <View style={{ flex: 1 }}>
            <Categories
                data={categories}
                onSelect={setCategory}
                selected={category}
            />
        </View>
    )
}