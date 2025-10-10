import React, { useState } from "react";
import { View, Platform, Keyboard, TouchableWithoutFeedback, ScrollView, Text, Image, StyleSheet, TouchableOpacity, TextInput, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { HomeScreenNavigationProp } from '../navigation/types';
import { makeDenunciaUseCases } from "../core/factories/makeDenunciaUseCases";
import { Photo } from "../core/domain/value-objects/Photo";
import { GeoCoordinates } from "../core/domain/value-objects/GeoCoordinates";
import { useAuth } from "../context/auth";


type Props = {
  navigation: HomeScreenNavigationProp;
};

export function HomeScreen({ navigation }: Props) {

  const { registerDenuncia } = makeDenunciaUseCases();
  const { user } = useAuth();

  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [description, setDescription] = useState<string>("");

  const handlePhotoPress = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permissão negada", "Você precisa permitir o acesso à câmera.");
      return;
    }
    const result = await ImagePicker.launchCameraAsync();
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setPhotoUri(result.assets[0].uri);
    }
  };

  const handleLocationPress = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permissão negada", "Você precisa permitir o acesso à localização.");
      return;
    }
    const loc = await Location.getCurrentPositionAsync({});
    setLocation({
      latitude: loc.coords.latitude,
      longitude: loc.coords.longitude,
    });
  };

   if (!user) {
      Alert.alert("Erro", "Nenhum usuário logado. Não é possível enviar o relatório.");
      return; // Para a execução da função aqui
    }

  const handleSendReport = async () => {
    if (!photoUri || !location || !description.trim()) {
      Alert.alert("Campos obrigatórios", "Preencha todos os campos antes de enviar.");
      return;
    }

    try {
      const denunciaData = {
        userId: user?.id,
        foto: Photo.create(photoUri),
        localizacao: GeoCoordinates.create(location.latitude, location.longitude),
        descricao: description,
      };

      await registerDenuncia.execute(denunciaData);

      // 4. Se tudo deu certo, mostra o sucesso e limpa o formulário
      Alert.alert("Relatório enviado!", "Seu relatório foi criado com sucesso.");
      setPhotoUri(null);
      setLocation(null);
      setDescription("");

    } catch (error: any) {
      // 5. Se o caso de uso lançar um erro, mostra o alerta de erro
      console.error("Falha ao registrar denúncia:", error);
      Alert.alert("Erro", "Não foi possível enviar o seu relatório. Tente novamente.");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* O seu JSX original da tela */}
          <Text style={styles.reportTitle}>Reportar Entulho</Text>
          
          <View style={styles.section}>
            <Text style={styles.label}>Foto do Entulho</Text>
            <View style={styles.photoBox}>
              {photoUri ? (
                <Image source={{ uri: photoUri }} style={styles.photoPreview} />
              ) : (
                <Text style={styles.photoText}>Clique no botão para fotografar</Text>
              )}
            </View>
            <TouchableOpacity style={styles.photoButton} onPress={handlePhotoPress}>
              <Text style={styles.photoButtonText}>Fotografar Entulho</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.label}>GeoLocalização</Text>
            <TouchableOpacity style={styles.geoButton} onPress={handleLocationPress}>
              <Text style={styles.geoButtonText}>
                {location ? `Lat: ${location.latitude.toFixed(5)}, Lon: ${location.longitude.toFixed(5)}` : "Obter localização atual"}
              </Text>
            </TouchableOpacity>
            
            {/* O botão para abrir o mapa */}
            {location && (
              <TouchableOpacity
                style={styles.mapButton}
                onPress={() => navigation.navigate('MapScreen', { 
                    latitude: location.latitude, 
                    longitude: location.longitude 
                })}
              >
                <Text style={styles.mapButtonText}>Abrir no Mapa</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Descrição</Text>
            <TextInput
              style={styles.input}
              placeholder="Descreva o entulho, tipo de lixo..."
              multiline
              value={description}
              onChangeText={setDescription}
            />
          </View>

          <TouchableOpacity style={styles.sendButton} onPress={handleSendReport}>
            <Text style={styles.sendButtonText}>Enviar Denúncia</Text>
          </TouchableOpacity>
        </ScrollView>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 24,
  },
  reportTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 18,
    textAlign: "center",
    color: "#222",
  },
  section: {
    marginBottom: 18,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#444",
  },
  photoBox: {
    backgroundColor: "#F2F2F2",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    padding: 18,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    minHeight: 120,
  },
  photoText: {
    color: "#888",
    fontSize: 14,
  },
  photoPreview: {
    width: 100,
    height: 100,
    borderRadius: 8,
    resizeMode: "cover",
  },
  photoButton: {
    backgroundColor: "#1A73E8",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
  },
  photoButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  geoButton: {
    backgroundColor: "#F2F2F2",
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: "#1A73E8",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },
  geoButtonText: {
    color: "#1A73E8",
    fontSize: 15,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#F2F2F2",
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
    minHeight: 60,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    textAlignVertical: "top",
  },
  sendButton: {
    backgroundColor: "#1A73E8",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 10,
  },
  sendButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 17,
  },
  mapButton: {
    backgroundColor: '#34A853',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  mapButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});