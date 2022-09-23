import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { StyleSheet, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import NavigationProvider from "./context/navigationContext";
import { BottomNavigation, LoadingScreen } from "./App/components";
import fonts from "./assets/fonts";
import Home from "./App/screens/Home";
import Search from "./App/screens/Search";
import Saved from "./App/screens/Saved";
import Profile from "./App/screens/Profile";
import OrderScreen from "./App/screens/Order/OrderScreen";

const Stack = createNativeStackNavigator();
const MainStack = createNativeStackNavigator();
const OrderStack = createNativeStackNavigator();

const screenOptions = {
    headerShown: false,
};

export default function App() {
    const [fontsLoaded] = useFonts({ ...fonts.poppins });

    if (fontsLoaded)
        return (
            <GestureHandlerRootView style={styles.flex}>
                <StatusBar style="dark" translucent />
                <NavigationProvider>
                    <Stack.Navigator screenOptions={screenOptions}>
                        <Stack.Screen name="main" component={Main} />
                        <Stack.Screen name="order" component={Order} />
                    </Stack.Navigator>
                </NavigationProvider>
            </GestureHandlerRootView>
        );

    return <LoadingScreen />;
}

function Main() {
    return (
        <View style={styles.flex}>
            <MainStack.Navigator screenOptions={screenOptions}>
                <MainStack.Screen name="home" component={Home} />
                <MainStack.Screen name="search" component={Search} />
                <MainStack.Screen name="saved" component={Saved} />
                <MainStack.Screen name="profile" component={Profile} />
            </MainStack.Navigator>
            <BottomNavigation />
        </View>
    );
}

function Order() {
    return (
        <OrderStack.Navigator screenOptions={screenOptions}>
            <OrderStack.Screen name="orderScreen" component={OrderScreen} />
        </OrderStack.Navigator>
    );
}

const styles = StyleSheet.create({
    flex: {
        flex: 1,
    },
});
