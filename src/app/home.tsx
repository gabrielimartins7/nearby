import * as Location from "expo-location";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";

import { api } from "@/services/api";
import { colors, fontFamily } from "@/styles/theme";

import { Categories, CategoriesProps } from "@/components/categories";
import { PlaceProps } from "@/components/place";
import { Places } from "@/components/places";

type MarketProps = PlaceProps & {
  latitude: number;
  longitude: number;
};

const currentLocation = {
  latitude: -23.561187293883442,
  longitude: -46.656451388116494,
};

const INITIAL_REGION: Region = {
  latitude: currentLocation.latitude,
  longitude: currentLocation.longitude,
  latitudeDelta: 0.003,
  longitudeDelta: 0.003,
};

const BOTTOM_SHEET_HEIGHT = 300;

export default function Home() {
  const [categories, setCategories] = useState<CategoriesProps>([]);
  const [category, setCategory] = useState<string>("");
  const [markets, setMarkets] = useState<MarketProps[]>([]);

  const mapRef = useRef<MapView | null>(null);
  const regionRef = useRef<Region>(INITIAL_REGION);

  const [selected, setSelected] = useState<MarketProps | null>(null);
  const [mapSize, setMapSize] = useState({ width: 0, height: 0 });
  const [balloonSize, setBalloonSize] = useState({ width: 220, height: 86 });
  const [balloonPos, setBalloonPos] = useState<{ x: number; y: number } | null>(null);

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

  async function getCurrentLocation() {
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync();
      if (granted) {
        const location = await Location.getCurrentPositionAsync();
        console.log("User GPS location (not used):", location);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function closeBalloon() {
    setSelected(null);
    setBalloonPos(null);
  }

  async function ensureSpaceAndPositionBalloon(item: MarketProps) {
    const map = mapRef.current;
    if (!map || mapSize.width === 0 || mapSize.height === 0) return;

    const lat = Number(item.latitude);
    const lng = Number(item.longitude);

    const padding = 10;
    const gap = 10;
    const pointerH = 10;

    const visibleBottom = Math.max(mapSize.height - BOTTOM_SHEET_HEIGHT, 0);

    const requiredTopSpace = balloonSize.height + pointerH + gap + padding;
    const targetMarkerY = Math.max(requiredTopSpace, visibleBottom * 0.68);

    const markerPoint = await map.pointForCoordinate({ latitude: lat, longitude: lng });

    const dy = markerPoint.y - targetMarkerY;
    if (dy > 0) {
      const centerCoord = {
        latitude: regionRef.current.latitude,
        longitude: regionRef.current.longitude,
      };
      const centerPoint = await map.pointForCoordinate(centerCoord);

      const newCenterPoint = { x: centerPoint.x, y: centerPoint.y + dy };
      const newCenterCoord = await map.coordinateForPoint(newCenterPoint);

      map.animateToRegion(
        {
          latitude: newCenterCoord.latitude,
          longitude: newCenterCoord.longitude,
          latitudeDelta: regionRef.current.latitudeDelta,
          longitudeDelta: regionRef.current.longitudeDelta,
        },
        250
      );

      setTimeout(async () => {
        try {
          const p2 = await map.pointForCoordinate({ latitude: lat, longitude: lng });
          positionBalloonFromPoint(p2);
        } catch {}
      }, 280);

      return;
    }

    positionBalloonFromPoint(markerPoint);

    function positionBalloonFromPoint(point: { x: number; y: number }) {
      let x = point.x - balloonSize.width / 2;
      let y = point.y - (balloonSize.height + pointerH + gap);

      const minX = padding;
      const maxX = Math.max(padding, mapSize.width - balloonSize.width - padding);

      const minY = padding;
      const maxY = Math.max(padding, visibleBottom - (balloonSize.height + pointerH) - padding);

      x = Math.min(Math.max(x, minX), maxX);
      y = Math.min(Math.max(y, minY), maxY);

      setBalloonPos({ x, y });
    }
  }

  async function openBalloon(item: MarketProps) {
    setSelected(item);

    requestAnimationFrame(async () => {
      try {
        await ensureSpaceAndPositionBalloon(item);
      } catch (e) {
        console.log(e);
      }
    });
  }

  useEffect(() => {
    getCurrentLocation();
    featchCategories();
  }, []);

  useEffect(() => {
    fetchMarkets();
  }, [category]);

  return (
    <View style={{ flex: 1 }}>
      <Categories data={categories} onSelect={setCategory} selected={category} />

      <View
        style={{ flex: 1 }}
        onLayout={(e) => {
          setMapSize({
            width: e.nativeEvent.layout.width,
            height: e.nativeEvent.layout.height,
          });
        }}
      >
        <MapView
          ref={mapRef}
          style={{ flex: 1 }}
          initialRegion={INITIAL_REGION}
          onMapReady={() => {
            mapRef.current?.animateToRegion(INITIAL_REGION, 0);
          }}
          onRegionChangeComplete={(r) => {
            regionRef.current = r;

            if (selected) openBalloon(selected);
          }}
          onPress={closeBalloon}
          onPanDrag={closeBalloon}
        >
          <Marker
            identifier="current"
            coordinate={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
            }}
            image={require("@/assets/location.png")}
          />

          {markets.map((item) => (
            <Marker
              key={item.id}
              identifier={item.id}
              coordinate={{
                latitude: Number(item.latitude),
                longitude: Number(item.longitude),
              }}
              image={require("@/assets/pin.png")}
              onPress={() => openBalloon(item)}
            />
          ))}
        </MapView>

        {selected && balloonPos && (
          <Pressable
            style={{
              position: "absolute",
              left: balloonPos.x,
              top: balloonPos.y,
              zIndex: 999,
            }}
            onLayout={(e) => {
              const { width, height } = e.nativeEvent.layout;
              const changed =
                Math.abs(width - balloonSize.width) > 1 ||
                Math.abs(height - balloonSize.height) > 1;

              if (changed) {
                setBalloonSize({ width, height });
                if (selected) requestAnimationFrame(() => openBalloon(selected));
              }
            }}
            onPress={() => router.navigate(`/market/${selected.id}`)}
          >
            <View>
              <View
                style={{
                  backgroundColor: "#FFF",
                  borderRadius: 12,
                  paddingVertical: 10,
                  paddingHorizontal: 12,
                  minWidth: 220,
                  elevation: 8,
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: fontFamily.medium,
                    color: colors.gray[600],
                  }}
                  numberOfLines={1}
                >
                  {selected.name}
                </Text>

                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: fontFamily.regular,
                    color: colors.gray[600],
                    marginTop: 4,
                  }}
                  numberOfLines={2}
                >
                  {selected.address}
                </Text>

                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: fontFamily.medium,
                    color: colors.gray[600],
                    marginTop: 6,
                  }}
                >
                  Toque para ver detalhes
                </Text>
              </View>
              <View
                style={{
                  alignSelf: "center",
                  width: 0,
                  height: 30,
                  borderLeftWidth: 10,
                  borderRightWidth: 10,
                  borderTopWidth: 10,
                  borderLeftColor: "transparent",
                  borderRightColor: "transparent",
                  borderTopColor: "#FFF",
                }}
              />
            </View>
          </Pressable>
        )}
      </View>

      <Places data={markets} />
    </View>
  );
}
