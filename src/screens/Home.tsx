import React, { useState } from "react";
import { View, Platform, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, ScrollView, Text, Image, StyleSheet, TouchableOpacity, TextInput, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export function HomeScreen() {
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [location, setLocation] = useState<string | null>(null);
  const [description, setDescription] = useState<string>("");

  const handlePhotoPress = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permissão negada", "Você precisa permitir o acesso à câmera para fotografar.");
      return;
    }
    const result = await ImagePicker.launchCameraAsync();
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setPhotoUri(result.assets[0].uri);
      Alert.alert("Foto capturada!", "A foto foi tirada com sucesso.");
    }
  };

  const handleLocationPress = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permissão negada", "Você precisa permitir o acesso à localização.");
      return;
    }
    const loc = await Location.getCurrentPositionAsync({});
    setLocation(`Lat: ${loc.coords.latitude.toFixed(5)}, Lon: ${loc.coords.longitude.toFixed(5)}`);
  };

  const handleSendReport = () => {
    if (!photoUri || !location || !description.trim()) {
      Alert.alert("Campos obrigatórios", "Preencha todos os campos antes de enviar.");
      return;
    }
    const post = {
      foto: photoUri,
      localizacao: location,
      descricao: description,
      data: new Date().toISOString(),
    };
    Alert.alert("Relatório enviado!", "Seu relatório foi criado com sucesso.");
    setPhotoUri(null);
    setLocation(null);
    setDescription("");
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Image style={styles.logo} source={require("../assets/reciclar.png")} />
            <Text style={styles.title}>GeoLixo</Text>
          </View>
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
                {location ? location : "Obter localização atual"}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.section}>
            <Text style={styles.label}>Descrição</Text>
            <TextInput
              style={styles.input}
              placeholder="Descreva o entulho, tipo de lixo e outros detalhes relevantes..."
              multiline
              value={description}
              onChangeText={setDescription}
            />
          </View>
          <TouchableOpacity style={styles.sendButton} onPress={handleSendReport}>
            <Text style={styles.sendButtonText}>Enviar Relatório</Text>
          </TouchableOpacity>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 24,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    marginTop: 24,
    justifyContent: "center",
  },
  logo: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1A73E8",
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
});