import React, { useState, useCallback } from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, TextInput, Button, Alert } from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import { useAuth } from "../context/auth";
import { makeDenunciaUseCases } from "../core/factories/makeDenunciaUseCases";
import { Denuncia } from "../core/domain/entities/Denuncia";

export function MyPage() {
  const { user } = useAuth();
  const [denuncias, setDenuncias] = useState<Denuncia[]>([]);
  const { deleteDenuncia, updateDenuncia, findDenunciasByUserId } = makeDenunciaUseCases(); // Supondo que findDenunciasByUserId exista
  
  const [isModalVisible, setModalVisible] = useState(false);
  const [editingDenuncia, setEditingDenuncia] = useState<Denuncia | null>(null);
  const [newDescription, setNewDescription] = useState('');

  // Busca os dados toda vez que a tela entra em foco
  useFocusEffect(
    useCallback(() => {
      async function fetchDenuncias() {
        if (user) {
          const userDenuncias = await findDenunciasByUserId.execute({ userId: user.id });
          setDenuncias(userDenuncias);
        }
      }
      fetchDenuncias();
    }, [user])
  );

  // Função para deletar uma denúncia
  const handleDelete = (denunciaId: string) => {
    Alert.alert("Confirmar Exclusão", "Tem certeza que deseja excluir este relatório?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir", style: "destructive",
        onPress: async () => {
          try {
            await deleteDenuncia.execute({ id: denunciaId });
            // Remove a denúncia da lista na tela, sem precisar recarregar
            setDenuncias(prevDenuncias => prevDenuncias.filter(d => d.id !== denunciaId));
            Alert.alert("Sucesso", "Relatório excluído.");
          } catch (error) {
            Alert.alert("Erro", "Não foi possível excluir o relatório.");
          }
        },
      },
    ]);
  };
  
  // Funções para controlar o modal de edição
  const openEditModal = (denuncia: Denuncia) => {
    setEditingDenuncia(denuncia);
    setNewDescription(denuncia.descricao || '');
    setModalVisible(true);
  };

  const handleUpdate = async () => {
    if (!editingDenuncia) return;
    try {
      const denunciaAtualizada = await updateDenuncia.execute({
        id: editingDenuncia.id,
        descricao: newDescription,
      });
      // Atualiza a lista na tela com a denúncia modificada
      setDenuncias(prevDenuncias => 
        prevDenuncias.map(d => (d.id === denunciaAtualizada.id ? denunciaAtualizada : d))
      );
      setModalVisible(false);
      setEditingDenuncia(null);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível atualizar o relatório.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.logo} source={require("../assets/reciclar.png")} />
        <Text style={styles.title}>GeoLixo</Text>
      </View>

      <Text style={styles.sectionTitle}>Meus Relatórios</Text>
      {denuncias.map((report) => (
        <View key={report.id} style={styles.reportCard}>
          <Image source={{ uri: report.foto.uri }} style={styles.reportPhoto} />
          <View style={styles.reportInfo}>
            <View style={styles.reportHeader}>
              <Text style={styles.reportTime}>{new Date(report.dataHora).toLocaleDateString('pt-BR')}</Text>
              <View style={[styles.statusBadge, {backgroundColor: getStatusColor(report.status)}]}>
                <Text style={styles.statusText}>{report.status.replace('_', ' ').toUpperCase()}</Text>
              </View>
            </View>
            <Text style={styles.reportDesc}>{report.descricao}</Text>
            <Text style={styles.reportLoc}>
              Lat: {report.localizacao.latitude.toFixed(4)}, Lon: {report.localizacao.longitude.toFixed(4)}
            </Text>
            <View style={styles.actionsContainer}>
              <TouchableOpacity style={styles.actionButton} onPress={() => openEditModal(report)} testID={`botao-editar-${report.id}`}>
                <Text style={styles.actionText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton} onPress={() => handleDelete(report.id)} testID={`botao-excluir-${report.id}`}>
                <Text style={[styles.actionText, {color: 'red'}]}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}

      {/* Modal de Edição */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Editar Descrição</Text>
            <TextInput
              style={styles.modalInput}
              onChangeText={setNewDescription}
              value={newDescription}
              multiline
              testID="input-editar-descricao"
            />
            <View style={styles.modalActions}>
              <Button title="Cancelar" onPress={() => setModalVisible(false)} color="gray" />
              <Button title="Salvar" onPress={handleUpdate} testID="botao-salvar-edicao"/>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const getStatusColor = (status: string) => {
    switch (status) {
        case 'pendente': return '#FFA500';
        case 'em_analise': return '#1A73E8';
        case 'resolvida': return '#34A853';
        case 'rejeitada': return '#D93025';
        default: return 'gray';
    }
};

const styles = StyleSheet.create({

  container: { flex: 1, backgroundColor: "#fff", padding: 18, },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 12, marginTop: 24, justifyContent: "center", },
  logo: { width: 30, height: 30, marginRight: 10, },
  title: { fontSize: 22, fontWeight: "bold", color: "#1A73E8", },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 12, textAlign: "center", color: "#222", },
  reportCard: { backgroundColor: "#f9f9f9", borderRadius: 12, marginBottom: 18, shadowColor: "#000", shadowOpacity: 0.07, shadowRadius: 4, elevation: 2, borderWidth: 1, borderColor: "#E0E0E0", },
  reportPhoto: { width: '100%', height: 150, borderTopLeftRadius: 12, borderTopRightRadius: 12, },
  reportInfo: { padding: 12, },
  reportHeader: { flexDirection: "row", alignItems: "center", marginBottom: 8, },
  reportTime: { fontSize: 13, color: "#888", },
  statusBadge: { borderRadius: 12, paddingHorizontal: 10, paddingVertical: 2, marginLeft: "auto", },
  statusText: { color: "#fff", fontWeight: "bold", fontSize: 12, },
  reportDesc: { fontSize: 15, color: "#333", marginBottom: 8, },
  reportLoc: { fontSize: 13, color: "#888", },
  actionsContainer: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10, borderTopWidth: 1, borderTopColor: '#eee', paddingTop: 10 },
  actionButton: { marginHorizontal: 10 },
  actionText: { color: '#1A73E8', fontWeight: 'bold' },
  // Estilos do Modal
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalView: { width: '80%', backgroundColor: 'white', borderRadius: 10, padding: 20, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  modalInput: { width: '100%', minHeight: 80, borderColor: 'gray', borderWidth: 1, borderRadius: 5, padding: 10, marginBottom: 20, textAlignVertical: 'top' },
  modalActions: { flexDirection: 'row', justifyContent: 'space-around', width: '100%' },
});