import { IconTicket } from "@tabler/icons-react-native";
import { Text, View } from "react-native";

import { colors } from "@/styles/colors";
import { styles } from "./styles";

type Props = {
    code: string;
}

export function Coupon({ code }: Props) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Utilize esse cupom</Text>

            <View style={styles.content}>
                <IconTicket size={24} color={colors.green.light} />
                <Text style={styles.code}>{code}</Text>
            </View>
        </View>
    );
}