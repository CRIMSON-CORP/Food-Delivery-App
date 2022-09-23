import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import NavigationProvider from "./context/navigationContext";
import { BottomNavigation, LoadingScreen } from "./App/components";
import fonts from "./assets/fonts";
import Home from "./App/screens/Home";
import Search from "./App/screens/Search";
import Saved from "./App/screens/Saved";
import Profile from "./App/screens/Profile";

const Stack = createNativeStackNavigator();

const screenOptions = {
    headerShown: false,
};

export default function App() {
    const [fontsLoaded] = useFonts({ ...fonts.poppins });

    if (fontsLoaded)
        return (
            <GestureHandlerRootView style={styles.gestureRootView}>
                <StatusBar style="dark" translucent />
                <NavigationProvider>
                    <Stack.Navigator screenOptions={screenOptions}>
                        <Stack.Screen name="home" component={Home} />
                        <Stack.Screen name="search" component={Search} />
                        <Stack.Screen name="saved" component={Saved} />
                        <Stack.Screen name="profile" component={Profile} />
                    </Stack.Navigator>
                    <BottomNavigation />
                </NavigationProvider>
            </GestureHandlerRootView>
        );

    return <LoadingScreen />;
}

const styles = StyleSheet.create({
    gestureRootView: {
        flex: 1,
    },
});
