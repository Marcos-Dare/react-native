import { View, Text, Image, StyleSheet } from "react-native"
import { DrawerParamList } from "../navigation/types"
import { DrawerNavigationProp } from "@react-navigation/drawer"

type HomeScreenNavigationProp = DrawerNavigationProp<DrawerParamList, "HomeStack">;

type Props = {
    navigation: HomeScreenNavigationProp
}

export function HomeScreen(){
    return(
        <View>
            <View style={styles.container}>
                
                <Image style={styles.menu} source={require("../assets/menu-aberto.png")}></Image>
                <View style={styles.container1}>
                    <Image style={styles.reciclar} source={require("../assets/reciclar.png")}></Image>
                    <Text style={styles.geolixo}>GeoLixo</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        marginTop:30,
        alignItems:"center",
        justifyContent:"flex-start"
    },

    container1:{
        flex:1,
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
    },

    reciclar:{
        width:30,
        height:30,
        marginRight:10
    },

    geolixo:{
        fontSize:25,
        fontWeight:"bold"
    },

    menu:{
        width:40,
        height:40,
        marginLeft:15
    }

})