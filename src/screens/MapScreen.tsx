import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker} from 'react-native-maps'; // Adicionei o PROVIDER_OSM
import { RouteProp } from '@react-navigation/native';
// MUDANÇA 1: Importe o tipo correto
import { HomeStackNavigatorParamList } from '../navigation/types'; 

// MUDANÇA 2: Use o tipo correto aqui
type MapScreenRouteProp = RouteProp<HomeStackNavigatorParamList, 'MapScreen'>;

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
      <MapView 
        style={styles.map} 
        initialRegion={initialRegion}
      >
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