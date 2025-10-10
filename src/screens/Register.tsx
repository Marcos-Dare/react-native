import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, Alert, Keyboard, TouchableWithoutFeedback } from "react-native";
import React, { useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LoginStackParamList} from "../navigation/types"
import { useAuth } from "../context/auth"; 
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'; // 1. Importe o KeyboardAwareScrollView

type RegisterScreenNavigationProp = NativeStackNavigationProp<LoginStackParamList,"Register">;

type Props = {
    navigation: RegisterScreenNavigationProp
};

export function RegisterScreen({ navigation }:Props){
    const { handleRegister } = useAuth(); 

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    async function fazerCadastro() {
        if (!name.trim() || !email.trim() || !password.trim()) {
            Alert.alert("Atenção", "Todos os campos são obrigatórios.");
            return;
        }
        if (password !== confirmPassword) {
            Alert.alert("Atenção", "As senhas não coincidem.");
            return;
        }

        try {
            await handleRegister({ name, email, password });
            Alert.alert(
                'Sucesso!',
                'Sua conta foi criada. Agora você pode fazer o login.',
                [{ text: 'OK', onPress: () => navigation.goBack() }] 
            );
        } catch (error: any) {
            Alert.alert('Erro no Cadastro', error.message);
        }
    }

    return(
        // 2. Substitua a View principal pelo KeyboardAwareScrollView
        <KeyboardAwareScrollView
            style={{ flex: 1, backgroundColor: "#d9d9d9" }}
            contentContainerStyle={{ flexGrow: 1, alignItems: "center" }} // Use flexGrow para centralizar
            enableOnAndroid={true}
            extraScrollHeight={20}
            keyboardShouldPersistTaps="handled"
        >
            {/* 3. Envolva o conteúdo com o TouchableWithoutFeedback para fechar o teclado */}
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{alignItems:"center", width: '100%'}}>
                    <View style={styles.container1}>
                        <Image style={styles.reciclar} source={require("../assets/reciclar.png")}></Image>
                        <Text style={styles.geolixo}>GeoLixo</Text>
                    </View>
                    <View style={{alignItems:"center"}}>
                        <Text>Crie uma conta para reportar e ajudar a limpar nossa cidade</Text>
                    </View>
                    <View style={styles.central}>
                        <Text style={{fontSize:25, fontWeight:"bold"}}>Criar Conta</Text>
                        <Text style={{fontWeight:"bold", marginTop:5}}>Nome Completo:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Seu Nome Completo"
                            value={name}
                            onChangeText={setName}
                            returnKeyType="next"
                        />
                        <Text style={{fontWeight:"bold", marginTop:5}}>Email:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="seu@email.com"
                            keyboardType="email-address"
                            value={email}
                            onChangeText={setEmail}
                            autoCapitalize="none"
                            returnKeyType="next"
                        />
                        <Text style={{fontWeight:"bold", marginTop:5}}>Senha:</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.inputWithIcon}
                                placeholder="Mínimo 6 caracteres"
                                secureTextEntry={true}
                                value={password}
                                onChangeText={setPassword}
                                returnKeyType="next"
                            />
                        </View>
                        <Text style={{fontWeight:"bold", marginTop:5}}>Confirme a senha:</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.inputWithIcon}
                                placeholder="Repita a senha"
                                secureTextEntry={true}
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                returnKeyType="done"
                            />
                        </View>
                        <TouchableOpacity onPress={fazerCadastro}>
                            <View style={{alignItems:"center", marginTop:15}}>
                                <View style={styles.button}>
                                    <Text style={{fontSize:15, color:"#FFFFFF", fontWeight:"bold"}}>Criar Conta</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <View style={{flexDirection:"row", justifyContent:"center", marginTop:5}}>
                            <Text style={{color:"#B0B0B0"}}>Já tem conta? </Text>
                            <TouchableOpacity onPress={()=>navigation.navigate("Login")}>
                                <Text style={{color:"#439EC9"}}>Faça Login</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    container1:{
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        marginTop:30,
        marginBottom: 10,
    },
    reciclar:{
        width:50,
        height:50,
        marginRight:10
    },
    geolixo:{
        fontSize:35,
        fontWeight:"bold"
    },
    central:{
        width:300,
        backgroundColor:"#FFFFFF",
        borderRadius:12,
        marginTop:25,
        padding:15
    },
    inputContainer:{
        position:"relative",
        justifyContent:"center"
    },
    inputWithIcon:{
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: "#f9f9f9",
        marginTop: 5,
        padding: 8,
        paddingRight:35
    },
    input:{
        borderWidth:1,
        borderRadius:10,
        backgroundColor:"#f9f9f9",
        marginTop:5,
        padding: 8
    },
    icon:{
        position:"absolute",
        right:10,
        top:15,
        width: 20,
        height: 20
    },
    button:{
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#439EC9",
        width:200,
        height:45,
        borderRadius:12
    }
})