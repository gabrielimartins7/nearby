import { colors, fontFamily } from "@/styles/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    text: {
        fontFamily: fontFamily.regular,
        color: colors.gray[500],
        fontSize: 14,
        lineHeight: 22.4,
        flex: 1,
    }
});