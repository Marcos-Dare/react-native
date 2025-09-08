import { View, Text, Image, StyleSheet } from "react-native";

export function LoginScreen({ }){
    return(
        <View>
            <View style={styles.container1}>
                <Image style={styles.reciclar} source={require("../assets/reciclar.png")}></Image>
                <Text style={styles.geolixo}>GeoLixo</Text>
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
        width:100,
        height:100,
        marginRight:10
    },

    geolixo:{
        fontSize:25,
        fontWeight:"bold"
    }
})