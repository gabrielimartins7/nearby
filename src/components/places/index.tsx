import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { useRef } from "react";
import { Text, useWindowDimensions } from "react-native";

import { Place, PlaceProps } from "../place";
import { styles } from "./styles";

type PlacesProps = {
    data: PlaceProps[]
};

export function Places({ data }: PlacesProps) {
    const dimensions = useWindowDimensions();
    const bottomSheetRef = useRef<BottomSheet>(null);

    const snapPoints = {
        min: 278,
        max:dimensions.height - 128
    }

    return <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[snapPoints.min, snapPoints.max]}
        handleIndicatorStyle={styles.indicator}
        backgroundStyle={styles.container}
        enableOverDrag={false}
    >
        <BottomSheetFlatList
            data={data}
            keyExtractor={(item: PlaceProps) => item.id}
            renderItem={({ item }: { item: PlaceProps }) => (
                <Place data={item} />
            )}
            contentContainerStyle={styles.content}
            ListHeaderComponent={() => (
                <Text style={styles.title}>Explore locais perto de você</Text>
            )}
            showsVerticalScrollIndicator={false}
        />
    </BottomSheet>
}