import { IconArrowLeft } from "@tabler/icons-react-native";
import { router } from "expo-router";
import { ImageBackground, View } from "react-native";

import { Button } from "@/components/button";
import { styles } from "./styles";

type Props = {
    uri: string;
}

export function Cover({ uri }: Props) {
    return (
        <ImageBackground source={{ uri }} style={styles.container}>
            <View style={styles.header}>
                <Button
                    style={{ width: 40, height: 40 }}
                    onPress={() => router.back()}
                >
                    <IconArrowLeft size={24}/>
                </Button>
            </View>
        </ImageBackground>
    );
}