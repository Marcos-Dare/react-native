import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { useAuth } from '../context/auth';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// 1. Importando os tipos corretos para a navegação
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LoginStackParamList } from "../navigation/types";

// 2. Definindo o tipo das props que a tela recebe
type Props = NativeStackScreenProps<LoginStackParamList, 'Login'>;

// 3. Recebendo a prop 'navigation' com o tipo correto
export function Login({ navigation }: Props) {
    const { handleLogin } = useAuth();

    // 4. Estados para controlar os inputs
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    async function fazerLogin(email: string, senha: string) {
        if (!email.trim() || !senha.trim()) {
            Alert.alert("Atenção", "Por favor, preencha e-mail e senha.");
            return;
        }
        try {
            await handleLogin({ email, password: senha });
            // Se o login for bem-sucedido, o App.tsx cuidará da navegação
        } catch (error) {
            Alert.alert("Erro de Login", "Email ou senha inválidos.");
        }
    }
    
    return (
        <KeyboardAwareScrollView
            style={{ flex: 1, backgroundColor: "#EAEAEA" }}
            contentContainerStyle={{ alignItems: "center", paddingVertical: 20 }}
            enableOnAndroid={true}
            keyboardShouldPersistTaps="handled">
            <View style={{ alignItems: "center", flex: 1 }}>
                <View style={styles.container1}>
                    <Image style={styles.reciclar} source={require("../assets/reciclar.png")}></Image>
                    <Text style={styles.geolixo}>GeoLixo</Text>
                </View>
                
                <View style={styles.central}>
                    <Text style={{ fontSize: 25, fontWeight: "bold" }}>Login</Text>
                    <Text style={{ fontWeight: "bold", marginTop: 5 }}>Email:</Text>
                    {/* 5. Inputs conectados aos estados */}
                    <TextInput
                        style={styles.input}
                        placeholder="seu@email.com"
                        keyboardType="email-address"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                    />
                    <Text style={{ fontWeight: "bold", marginTop: 5 }}>Senha:</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.inputWithIcon}
                            placeholder="Sua Senha"
                            secureTextEntry={!showPassword}
                            value={senha}
                            onChangeText={setSenha}
                        />
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                            <Image style={styles.icon} source={require("../assets/olho.png")} />
                        </TouchableOpacity>
                    </View>
                    {/* 6. Botão de Enviar chama a função com os valores dos estados */}
                    <TouchableOpacity onPress={() => fazerLogin(email, senha)}>
                        <View style={{ alignItems: "center", marginTop: 15 }}>
                            <View style={styles.button}>
                                <Text style={{ fontSize: 15, color: "#FFFFFF", fontWeight: "bold" }}>Enviar</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 5 }}>
                        <Text style={{ color: "#B0B0B0" }}>Não tem conta? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                            <Text style={{ color: "#439EC9" }} >Registre-se</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
  container1: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  reciclar: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  geolixo: {
    fontSize: 35,
    fontWeight: "bold",
  },
  central: {
    width: 300,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginTop: 45,
    padding: 15,
  },
  inputContainer: {
    position: "relative",
    justifyContent: "center",
  },
  inputWithIcon: {
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
    marginTop: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    paddingRight: 40,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
    marginTop: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  icon: {
    position: "absolute",
    right: 10,
    top: '50%',
    transform: [{ translateY: -28 }],
    width: 20,
    height: 20,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#439EC9",
    width: 200,
    height: 45,
    borderRadius: 12,
  },
});