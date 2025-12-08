import { colors } from "@/styles/colors";
import { IconTicket } from "@tabler/icons-react-native";
import { Image, Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import { styles } from "./styles";

export type PlaceProps = {
    id: string;
    name: string;
    description: string;
    coupons: number;
    cover: string;
    address: string;
}

type Props = TouchableOpacityProps & {
    data: PlaceProps;
}

export function Place({ data, ...rest }: Props) {
    return (
        <TouchableOpacity style={styles.container} {...rest}>
            <Image style={styles.image} source={{ uri: data.cover }} />

            <View style={styles.content}>
                <Text style={styles.name}>{data.name}</Text>
                <Text style={styles.description}>{data.description}</Text>

                <View style={styles.footer}>
                    <IconTicket size={16} color={colors.red.base} />
                    <Text style={styles.ticket}>{data.coupons} cupons disponíveis</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}