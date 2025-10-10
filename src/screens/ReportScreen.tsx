import React, { useState, useEffect, useMemo, useCallback } from "react";
import { View, Image, Text, StyleSheet, FlatList, TouchableOpacity, Modal, Pressable } from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import { makeDenunciaUseCases } from "../core/factories/makeDenunciaUseCases";
import { DenunciaComEndereco } from "../core/domain/use-cases/FindAllDenuncias";

// Componente de Card para cada item da lista
const ReportCard = ({ report }: { report: DenunciaComEndereco }) => (
  <View style={styles.reportCard}>
    <Image source={{ uri: report.foto.uri }} style={styles.reportPhoto} />
    <View style={styles.reportInfo}>
      <View style={styles.reportHeader}>
        <Text style={styles.reportTime}>{new Date(report.dataHora).toLocaleDateString('pt-BR')}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(report.status) }]}>
          <Text style={styles.statusText}>{report.status.replace('_', ' ').toUpperCase()}</Text>
        </View>
      </View>
      <Text style={styles.reportDesc}>{report.descricao}</Text>
      <Text style={styles.reportLoc}>{`${report.bairro || 'Bairro não identificado'}, ${report.cidade || 'Cidade não identificada'}`}</Text>
    </View>
  </View>
);

// Função auxiliar para definir a cor do status
const getStatusColor = (status: string) => {
    switch (status) {
        case 'pendente': return '#FFA500';
        case 'em_analise': return '#1A73E8';
        case 'resolvida': return '#34A853';
        case 'rejeitada': return '#D93025';
        default: return 'gray';
    }
};

export function ReportScreen() {
  const [allDenuncias, setAllDenuncias] = useState<DenunciaComEndereco[]>([]);
  const [filteredDenuncias, setFilteredDenuncias] = useState<DenunciaComEndereco[]>([]);

  const [selectedCity, setSelectedCity] = useState("Todas");
  const [selectedNeighborhood, setSelectedNeighborhood] = useState("Todos");

  // --- ADICIONADO: Estados para controlar a visibilidade dos modais ---
  const [cityModalVisible, setCityModalVisible] = useState(false);
  const [neighModalVisible, setNeighModalVisible] = useState(false);
  // ---

  const { findAllDenuncias } = makeDenunciaUseCases();

  useFocusEffect(useCallback(() => { /* ... sua lógica de busca de dados ... */ }, []));
  useEffect(() => { /* ... sua lógica de filtro ... */ }, [selectedCity, selectedNeighborhood, allDenuncias]);

  const cities = useMemo(() => ["Todas", ...new Set(allDenuncias.map(d => d.cidade).filter(Boolean))], [allDenuncias]) as string[];
  const neighborhoods = useMemo(() => ["Todos", ...new Set(allDenuncias.map(d => d.bairro).filter(Boolean))], [allDenuncias]) as string[];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.logo} source={require("../assets/reciclar.png")} />
        <Text style={styles.title}>GeoLixo</Text>
      </View>

      {/* --- ADICIONADO: Interface dos filtros com botões e modais --- */}
      <View style={styles.filterBox}>
        <Text style={styles.filterTitle}>Filtros</Text>
        <View style={styles.filterRow}>
          {/* Filtro de Cidade */}
          <View style={styles.filterCol}>
            <Text style={styles.filterLabel}>Cidade</Text>
            <TouchableOpacity style={styles.filterButton} onPress={() => setCityModalVisible(true)}>
              <Text style={styles.filterButtonText}>{selectedCity}</Text>
            </TouchableOpacity>
            <Modal visible={cityModalVisible} transparent animationType="slide" onRequestClose={() => setCityModalVisible(false)}>
              <Pressable style={styles.modalOverlay} onPress={() => setCityModalVisible(false)}>
                <View style={styles.modalContent}>
                  {cities.map((city) => (
                    <Pressable key={city} style={styles.modalOption} onPress={() => { setSelectedCity(city); setCityModalVisible(false); }}>
                      <Text style={selectedCity === city ? styles.modalOptionSelected : styles.modalOptionText}>{city}</Text>
                    </Pressable>
                  ))}
                </View>
              </Pressable>
            </Modal>
          </View>
          {/* Filtro de Bairro */}
          <View style={styles.filterCol}>
            <Text style={styles.filterLabel}>Bairro</Text>
            <TouchableOpacity style={styles.filterButton} onPress={() => setNeighModalVisible(true)}>
              <Text style={styles.filterButtonText}>{selectedNeighborhood}</Text>
            </TouchableOpacity>
            <Modal visible={neighModalVisible} transparent animationType="slide" onRequestClose={() => setNeighModalVisible(false)}>
              <Pressable style={styles.modalOverlay} onPress={() => setNeighModalVisible(false)}>
                <View style={styles.modalContent}>
                  {neighborhoods.map((neigh) => (
                    <Pressable key={neigh} style={styles.modalOption} onPress={() => { setSelectedNeighborhood(neigh); setNeighModalVisible(false); }}>
                      <Text style={selectedNeighborhood === neigh ? styles.modalOptionSelected : styles.modalOptionText}>{neigh}</Text>
                    </Pressable>
                  ))}
                </View>
              </Pressable>
            </Modal>
          </View>
        </View>
      </View>
      {/* --- */}
      
      <Text style={styles.sectionTitle}>Relatórios Gerais</Text>

      <FlatList
        data={filteredDenuncias}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ReportCard report={item} />}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhuma denúncia encontrada.</Text>}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

// Seus estilos completos aqui. Adicionei os que estavam faltando no seu original.
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 18 },
    header: { flexDirection: "row", alignItems: "center", marginBottom: 12, marginTop: 24, justifyContent: "center" },
    title: { fontSize: 22, fontWeight: "bold", color: "#1A73E8" },
    logo: { width: 30, height: 30, marginRight: 10 },
    reportPhoto: { width: '100%', height: 180, borderTopLeftRadius: 12, borderTopRightRadius: 12 },
    filterBox: { backgroundColor: "#F7F7F7", borderRadius: 8, padding: 12, marginBottom: 18, borderWidth: 1, borderColor: "#E0E0E0" },
    filterTitle: { fontWeight: "bold", fontSize: 16, marginBottom: 8 },
    filterRow: { flexDirection: "row", justifyContent: "space-between" },
    filterCol: { flex: 1, marginRight: 8 },
    filterLabel: { fontSize: 14, marginBottom: 4, color: "#444" },
    filterButton: { backgroundColor: "#1A73E8", borderRadius: 6, paddingVertical: 8, paddingHorizontal: 10, alignItems: 'center' },
    filterButtonText: { color: "#fff", fontWeight: "bold", fontSize: 13 },
    sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 12, textAlign: "center", color: "#222" },
    reportCard: { backgroundColor: "#fff", borderRadius: 12, marginBottom: 18, shadowColor: "#000", shadowOpacity: 0.07, shadowRadius: 4, elevation: 2, borderWidth: 1, borderColor: "#E0E0E0" },
    reportInfo: { padding: 12 },
    reportHeader: { flexDirection: "row", alignItems: "center", marginBottom: 4 },
    reportTime: { fontSize: 13, color: "#888" },
    statusBadge: { borderRadius: 12, paddingHorizontal: 10, paddingVertical: 2, marginLeft: "auto" },
    statusText: { color: "#fff", fontWeight: "bold", fontSize: 12 },
    reportDesc: { fontSize: 15, color: "#333", marginBottom: 6 },
    reportLoc: { fontSize: 13, color: "#888" },
    modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center" },
    modalContent: { backgroundColor: "#fff", borderRadius: 10, padding: 18, width: '80%', elevation: 5 },
    modalOption: { paddingVertical: 12 },
    modalOptionText: { fontSize: 16, color: "#222" },
    modalOptionSelected: { fontSize: 16, color: "#1A73E8", fontWeight: "bold" },
    emptyText: { textAlign: 'center', marginTop: 50, color: 'gray', fontSize: 16 },
});