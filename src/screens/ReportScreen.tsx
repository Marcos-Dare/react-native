import React, { useState } from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, Pressable } from "react-native";

const mockReports = [
  {
    id: 2025,
    time: "há 20 minutos",
    status: "Enviado",
    description: "Entulho na praça são charbel",
    location: "Localização",
    city: "Cabo Frio",
    neighborhood: "Centro",
    photo: require("../assets/entulho.jpg"),
  },
  // Adicione mais relatórios aqui
];

const cities = ["Todas as Cidades", "Cabo Frio", "Arraial"];
const neighborhoods = ["Todos os Bairros", "Centro", "São Cristóvão"];

export function ReportScreen() {
  const [selectedCity, setSelectedCity] = useState(cities[0]);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState(neighborhoods[0]);
  const [cityModalVisible, setCityModalVisible] = useState(false);
  const [neighModalVisible, setNeighModalVisible] = useState(false);

  const filteredReports = mockReports.filter(
    (r) =>
      (selectedCity === "Todas as Cidades" || r.city === selectedCity) &&
      (selectedNeighborhood === "Todos os Bairros" || r.neighborhood === selectedNeighborhood)
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.logo} source={require("../assets/reciclar.png")} />
        <Text style={styles.title}>GeoLixo</Text>
      </View>

      <View style={styles.filterBox}>
        <Text style={styles.filterTitle}>Filtros</Text>
        <View style={styles.filterRow}>
          <View style={styles.filterCol}>
            <Text style={styles.filterLabel}>Cidade</Text>
            <TouchableOpacity
              style={[
                styles.filterButton,
                styles.filterButtonSelected,
              ]}
              onPress={() => setCityModalVisible(true)}
            >
              <Text style={styles.filterButtonTextSelected}>{selectedCity}</Text>
            </TouchableOpacity>
            <Modal
              visible={cityModalVisible}
              transparent
              animationType="slide"
              onRequestClose={() => setCityModalVisible(false)}
            >
              <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                  {cities.map((city) => (
                    <Pressable
                      key={city}
                      style={styles.modalOption}
                      onPress={() => {
                        setSelectedCity(city);
                        setCityModalVisible(false);
                      }}
                    >
                      <Text style={selectedCity === city ? styles.modalOptionSelected : styles.modalOptionText}>
                        {city}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>
            </Modal>
          </View>
          <View style={styles.filterCol}>
            <Text style={styles.filterLabel}>Bairro</Text>
            <TouchableOpacity
              style={[
                styles.filterButton,
                styles.filterButtonSelected,
              ]}
              onPress={() => setNeighModalVisible(true)}
            >
              <Text style={styles.filterButtonTextSelected}>{selectedNeighborhood}</Text>
            </TouchableOpacity>
            <Modal
              visible={neighModalVisible}
              transparent
              animationType="slide"
              onRequestClose={() => setNeighModalVisible(false)}
            >
              <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                  {neighborhoods.map((neigh) => (
                    <Pressable
                      key={neigh}
                      style={styles.modalOption}
                      onPress={() => {
                        setSelectedNeighborhood(neigh);
                        setNeighModalVisible(false);
                      }}
                    >
                      <Text style={selectedNeighborhood === neigh ? styles.modalOptionSelected : styles.modalOptionText}>
                        {neigh}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>
            </Modal>
          </View>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Relatórios Gerais</Text>
      {filteredReports.map((report) => (
        <View key={report.id} style={styles.reportCard}>
          <Image source={report.photo} style={styles.reportEntulho} />
          <View style={styles.reportInfo}>
            <View style={styles.reportHeader}>
              <Text style={styles.reportId}>Relatório #{report.id}-</Text>
              <Text style={styles.reportTime}>{report.time}</Text>
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>{report.status}</Text>
              </View>
            </View>
            <Text style={styles.reportDesc}>{report.description}</Text>
            <Text style={styles.reportLoc}>{report.location}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 18,
  },
  header: {
    flexDirection: "row",
    marginBottom: 12,
    marginTop: 24,
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1A73E8",
  },
  logo: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  reportEntulho: {
    width: 300,
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
    marginLeft: 12,
  },
  filterBox: {
    backgroundColor: "#F7F7F7",
    borderRadius: 8,
    padding: 12,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  filterTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 8,
  },
  filterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  filterCol: {
    flex: 1,
    marginRight: 8,
  },
  filterLabel: {
    fontSize: 14,
    marginBottom: 4,
    color: "#444",
  },
  filterButton: {
    backgroundColor: "#E0E0E0",
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginBottom: 6,
  },
  filterButtonSelected: {
    backgroundColor: "#1A73E8",
  },
  filterButtonText: {
    color: "#888",
    fontSize: 13,
  },
  filterButtonTextSelected: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 13,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
    color: "#222",
  },
  reportCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 18,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  reportInfo: {
    paddingHorizontal: 4,
  },
  reportHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  reportId: {
    fontWeight: "bold",
    fontSize: 15,
    marginRight: 6,
    color: "#222",
  },
  reportTime: {
    fontSize: 13,
    color: "#888",
    marginRight: 6,
  },
  statusBadge: {
    backgroundColor: "#4CD964",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginLeft: "auto",
  },
  statusText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 13,
  },
  reportDesc: {
    fontSize: 15,
    color: "#333",
    marginBottom: 2,
  },
  reportLoc: {
    fontSize: 13,
    color: "#888",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 18,
    minWidth: 220,
    elevation: 5,
  },
  modalOption: {
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  modalOptionText: {
    fontSize: 15,
    color: "#222",
  },
  modalOptionSelected: {
    fontSize: 15,
    color: "#1A73E8",
    fontWeight: "bold",
  },
});