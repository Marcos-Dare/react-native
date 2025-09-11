import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { LoginStackParamList} from "../navigation/types"

type LoginScreenNavigationProp = StackNavigationProp<LoginStackParamList,"Register">;

type Props = {
    navigation: LoginScreenNavigationProp
};

export function RegisterScreen({ navigation }:Props){
    return(
        <View style={{alignItems:"center", backgroundColor:"#d9d9d9", flex:1}}>
            <View style={styles.container1}>
                <Image style={styles.reciclar} source={require("../assets/reciclar.png")}></Image>
                <Text style={styles.geolixo}>GeoLixo</Text>
            </View>
            <View style={{alignItems:"center"}}>
                <Text>Entre para reportar e ajudar a limpar nossa cidade</Text>
            </View>
            <View style={styles.central}>
                <Text style={{fontSize:25, fontWeight:"bold"}}>Login</Text>
                <Text style={{fontWeight:"bold", marginTop:5}}>Nome Completo:</Text>
                <TextInput style={styles.input} placeholder="Seu Nome" keyboardType="email-address"/>
                <Text style={{fontWeight:"bold", marginTop:5}}>Email:</Text>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.inputWithIcon} placeholder="seu@email" keyboardType="email-address"/>
                </View>
                <Text style={{fontWeight:"bold", marginTop:5}}>Senha:</Text>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.inputWithIcon} placeholder="Minimo 6 caracteres" secureTextEntry={true}/>
                    <Image style={styles.icon} source={require("../assets/olho.png")}/>
                </View>
                <Text style={{fontWeight:"bold", marginTop:5}}>Confirme a senha:</Text>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.inputWithIcon} placeholder="Repita a senha" secureTextEntry={true}/>
                    <Image style={styles.icon} source={require("../assets/olho.png")}/>
                </View>
                <View style={{alignItems:"center", marginTop:15}}>
                    <View style={styles.button}>
                        <Text style={{fontSize:15, color:"#FFFFFF", fontWeight:"bold"}}>Criar Conta</Text>
                    </View>
                </View>
                <View style={{flexDirection:"row", justifyContent:"center", marginTop:5}}>
                    <Text style={{color:"#B0B0B0"}}>Já tem conta? </Text>
                    <TouchableOpacity onPress={()=>navigation.navigate("Login")}>
                        <Text style={{color:"#439EC9"}}>Faça Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container1:{
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        marginTop:30
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
        height:450,
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
        paddingRight:35
    },


    input:{
        borderWidth:1,
        borderRadius:10,
        backgroundColor:"#f9f9f9",
        marginTop:5
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