import React from 'react';
import {  StyleSheet, ImageBackground, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from './Header';

const Layout = ({ children }: Readonly<{ children: React.ReactNode; }>) => {
    return (
        <ImageBackground style={styles.theme} source={require("../assets/background.jpg")}>
        
            <ScrollView style={{backgroundColor: "rgba(100, 164, 200, 0.6)",}}>
            <SafeAreaView style={styles.container}>
                <Header/>
                {children}
            </SafeAreaView>
            </ScrollView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    theme: {
        flex: 1,

    },
    container: {
        marginHorizontal: 17,
    },
});

export default Layout;
