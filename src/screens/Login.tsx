import { View, Text, Image, StyleSheet, TextInput } from "react-native";

export function LoginScreen({ }){
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
                <Text style={{fontWeight:"bold", marginTop:5}}>Email:</Text>
                <TextInput style={styles.input} placeholder="seu@email" keyboardType="email-address"/>
                <Text style={{fontWeight:"bold", marginTop:5}}>Senha:</Text>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.inputWithIcon} placeholder="Sua Senha" secureTextEntry={true}/>
                    <Image style={styles.icon} source={require("../assets/olho.png")}/>
                </View>
                <View style={{alignItems:"center", marginTop:15}}>
                    <View style={styles.button}>
                        <Text style={{fontSize:15, color:"#FFFFFF", fontWeight:"bold"}}>Enviar</Text>
                    </View>
                </View>
                <View style={{flexDirection:"row", justifyContent:"center", marginTop:5}}>
                    <Text style={{color:"#B0B0B0"}}>Não tem conta? </Text>
                    <Text style={{color:"#439EC9"}} >Registre-se</Text>
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
        height:300,
        backgroundColor:"#FFFFFF",
        borderRadius:12,
        marginTop:45,
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