import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

function Header()
{
    return (
        <View style={[styles.head, styles.center]}> 
            <Image
            style={styles.logo}
            source={require('../src/assets/logo.png')}
            />
            <Text style={styles.sectionTitle}>Quality Inspector</Text>
        </View>
    )

}
const styles = StyleSheet.create({
    head: {
        flexDirection: "row",
        height: 170,
    },
    sectionTitle: {
        color:"white",
        fontSize: 26,
        fontWeight: '500',
    },
    center: {
        justifyContent: "center",
        alignItems: "center",
    },
    logo : {
        width: 140,
        height: 140,
    }
})
export default Header;