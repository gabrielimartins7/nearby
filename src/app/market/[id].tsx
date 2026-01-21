import { CameraView, useCameraPermissions } from "expo-camera";
import { Redirect, router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Alert, Modal, ScrollView, StatusBar, View } from "react-native";

import { api } from "@/services/api";

import { Button } from "@/components/button";
import { Loading } from "@/components/loading";
import { Coupon } from "@/components/market/coupon";
import { Cover } from "@/components/market/cover";
import { Details, PropsDetails } from "@/components/market/details";

type DataProps = PropsDetails & {
    cover: string;
}

export default function Market() {
    const [data, setData] = useState<DataProps>();
    const [coupon, setCoupon] = useState<string | null>(null);
    const [couponFetching, setCouponFetching] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isVisibleCameraModal, setIsVisibleCameraModal] = useState(false);

    const [_, requestPermission] = useCameraPermissions();
    const params = useLocalSearchParams<{ id: string }>();

    const qrLock = useRef(false);

    async function fetchMarket() {
        try {
           const { data } = await api.get("/markets/" + params.id);
            setData(data);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            Alert.alert("Erro", "Não foi possível carregar os dados.", [
                { text: "OK", onPress: () => router.back() },
            ]);
        }
    }

    async function openCameraModal() {
        try {
            const {granted} = await requestPermission();
            
            if (!granted) {
                return Alert.alert("Câmera", "Você precisa habilitar o uso da câmera")
            }

            qrLock.current = false;
            setIsVisibleCameraModal(true);
        } catch (error) {
            console.log(error);
            Alert.alert("Câmera", "Não foi possível utilizar a câmera")
        }
    }

    async function getCoupon(id: string) {
        try {
            setCouponFetching(true);

            const { data } = await api.patch("/coupons/" + id);
            Alert.alert("Cupom", data.coupon);
            setCoupon(data.coupon);
        } catch (error) {
            console.log(error);
            Alert.alert("Cupom", "Não foi possível utilizar o cupom")
        } finally {
            setCouponFetching(false);
        }
    }

    function useCoupon(id: string) {
        setIsVisibleCameraModal(false);
        Alert.alert(
            "Cupom",
            "Não é possível utilizar um cupom que já foi resgatado. Deseja realmente resgatar o cupom?",
            [
                { style: "cancel", text: "Não" },
                { text: "Sim", onPress: () => getCoupon(id) },
            ]
        )
    }

    useEffect(() => {
        fetchMarket();
    }, [params.id, coupon]);

    if(isLoading) {
        return <Loading />;
    }

    if (!data) {
        return <Redirect href={"/home"} />
    }

    return (
        <View style={{ flex: 1 }}>
            <StatusBar
                barStyle="light-content"
                hidden={isVisibleCameraModal}
                translucent
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <Cover uri={data?.cover} />
                <Details data={data} />
            </ScrollView>
            {coupon && <Coupon code={coupon} />}
            <View style={{ padding: 32 }}>
                <Button onPress={openCameraModal}>
                    <Button.Title>Ler QR Code</Button.Title>
                </Button>
            </View>

            <Modal style={{ flex: 1 }} visible={isVisibleCameraModal}>
                <CameraView
                    style={{ flex: 1 }}
                    facing="back"
                    onBarcodeScanned={({ data }) => {
                        if (data && !qrLock.current){
                            qrLock.current = true;
                            setTimeout(() => useCoupon(data), 500)
                        }
                    }}
                />

                <View style={{ position: "absolute", bottom: 32, left: 32, right: 32 }}>
                    <Button
                        onPress={() => setIsVisibleCameraModal(false)}
                        isLoading={couponFetching}
                        >
                        <Button.Title>Voltar</Button.Title>
                    </Button>
                </View>
            </Modal>
        </View>
    );
}