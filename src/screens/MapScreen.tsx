import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { RouteProp } from '@react-navigation/native';
import { LoginStackParamList } from '../navigation/types'; // Vamos criar este arquivo no próximo passo

type MapScreenRouteProp = RouteProp<LoginStackParamList, 'MapScreen'>;

type Props = {
  route: MapScreenRouteProp;
};

export function MapScreen({ route }: Props) {
  // Recebe as coordenadas passadas pela HomeScreen
  const { latitude, longitude } = route.params;

  // Define a região inicial do mapa
  const initialRegion = {
    latitude: latitude,
    longitude: longitude,
    latitudeDelta: 0.005, // Zoom do mapa
    longitudeDelta: 0.005, // Zoom do mapa
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={initialRegion}>
        <Marker
          coordinate={{ latitude, longitude }}
          title="Localização do Entulho"
          description="O entulho reportado está aqui."
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});