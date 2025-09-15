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
  },
  // Adicione mais relatórios aqui
];

export function MyPage() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.logo} source={require("../assets/reciclar.png")} />
        <Text style={styles.title}>GeoLixo</Text>
      </View>

      <Text style={styles.sectionTitle}>Meus Relatórios</Text>
      {mockReports.map((report) => (
        <View key={report.id} style={styles.reportCard}>
          <View style={styles.reportInfo}>
            <View style={styles.reportHeader}>
              <Text style={styles.reportId}>Relatório #{report.id}-</Text>
              <Text style={styles.reportTime}>{report.time}</Text>
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>{report.status}</Text>
              </View>
            </View>
            <Text style={styles.reportDesc}>{report.description}</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.reportLoc}>{report.location}</Text>
              <Image source={require("../assets/Trash.png")} style={styles.reportImage} />
            </View>
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
  reportImage: {
    width: 30,
    height: 30,
    borderRadius: 8,
    marginBottom: 8,
    marginLeft: 200,
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
});