import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, Alert, Keyboard, TouchableWithoutFeedback } from "react-native";
import React, { useState } from "react";
import { useAuth } from '../context/auth';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// MUDANÇA 1: Importando o tipo correto da biblioteca 'native-stack'
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LoginStackParamList} from "../navigation/types";

// MUDANÇA 2: Usando o tipo correto para definir as propriedades da tela
type Props = NativeStackScreenProps<LoginStackParamList, "Register">;

export function RegisterScreen({ navigation }: Props) {
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
        // MUDANÇA 3: Adicionado o KeyboardAwareScrollView e o TouchableWithoutFeedback
        <KeyboardAwareScrollView
            style={{ flex: 1, backgroundColor: "#EAEAEA" }}
            contentContainerStyle={{ flexGrow: 1, alignItems: "center" }}
            enableOnAndroid={true}
            extraScrollHeight={20}
            keyboardShouldPersistTaps="handled"
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{alignItems:"center", width: '100%'}}>
                    <View style={styles.container1}>
                        <Image style={styles.reciclar} source={require("../assets/reciclar.png")}></Image>
                        <Text style={styles.geolixo}>GeoLixo</Text>
                    </View>
                    
                    <View style={styles.central}>
                        <Text style={{fontSize:25, fontWeight:"bold"}}>Criar Conta</Text>
                        <Text style={{fontWeight:"bold", marginTop:5}}>Nome Completo:</Text>
                        <TextInput style={styles.input} placeholder="Seu Nome"  testID="input-nome-completo" value={name} onChangeText={setName} />
                        <Text style={{fontWeight:"bold", marginTop:5}}>Email:</Text>
                        <TextInput style={styles.input} placeholder="seu@email.com" keyboardType="email-address" value={email} onChangeText={setEmail} autoCapitalize="none"/>
                        <Text style={{fontWeight:"bold", marginTop:5}}>Senha:</Text>
                        <View style={styles.inputContainer}>
                            <TextInput style={styles.inputWithIcon} placeholder="Mínimo 6 caracteres" secureTextEntry={true} value={password} onChangeText={setPassword}/>
                        </View>
                        <Text style={{fontWeight:"bold", marginTop:5}}>Confirme a senha:</Text>
                        <View style={styles.inputContainer}>
                            <TextInput style={styles.inputWithIcon} placeholder="Repita a senha" secureTextEntry={true} value={confirmPassword} onChangeText={setConfirmPassword}/>
                        </View>
                        <TouchableOpacity onPress={fazerCadastro} testID="botao-criar-conta">
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
        width:310,
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
        borderWidth: 0.8,
        borderRadius: 10,
        backgroundColor: "#f9f9f9",
        marginTop: 5,
        padding: 10,
        paddingRight:35
    },
    input:{
        borderWidth:0.8,
        borderRadius:10,
        backgroundColor:"#f9f9f9",
        marginTop:5,
        padding: 10
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