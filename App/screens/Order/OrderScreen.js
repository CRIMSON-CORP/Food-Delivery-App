import { View, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, { FadeInDown } from "react-native-reanimated";
import theme from "../../../utils/theme";
import { AnimatedPressable, TopBar } from "../../components";
import { LeftArrow, List, LocationMarker, MasterCard } from "../../components/Icons";
import { Text } from "../../components/ui";
import data from "../../../utils/data";

function OrderScreen({ navigation, route }) {
    const selectedRestaurantId = route.params.id;
    const { name } = data.restaurant.find((restaurant) => restaurant.id === selectedRestaurantId);
    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.SafeAreaView}>
                <TopBar
                    leftIcon={
                        <AnimatedPressable onPress={() => navigation.goBack()}>
                            <LeftArrow />
                        </AnimatedPressable>
                    }
                    rightIcon={<List />}
                >
                    {name}
                </TopBar>
                <View style={styles.main}>
                    <View />
                    <Animated.View
                        entering={FadeInDown.delay(500).duration(500)}
                        style={styles.actionTab}
                    >
                        <View style={styles.actionTabTop}>
                            <Text weight={500} size={18}>
                                4 Items in Cart
                            </Text>
                            <Text weight={500} size={18}>
                                $46.98
                            </Text>
                        </View>
                        <View style={styles.separator} />
                        <View style={styles.actionTabBottom}>
                            <View style={styles.actionTabBottomTop}>
                                <View style={styles.actionTabBottomTopLocation}>
                                    <View style={styles.locationMarker}>
                                        <LocationMarker />
                                    </View>
                                    <Text>{data.location}</Text>
                                </View>
                                <View style={styles.actionTabBottomTopCreditCard}>
                                    <View style={styles.masterCard}>
                                        <MasterCard />
                                    </View>
                                    <View style={styles.creditCardDots}>
                                        {Array.from(Array(4).keys()).map((item) => (
                                            <View key={item} style={styles.creditCardDot} />
                                        ))}
                                    </View>
                                    <Text>{data.creditCard}</Text>
                                </View>
                            </View>
                            <AnimatedPressable>
                                <View style={styles.pressable}>
                                    <Text size={18} weight={500} styles={styles.pressableText}>
                                        Order
                                    </Text>
                                </View>
                            </AnimatedPressable>
                        </View>
                    </Animated.View>
                </View>
            </SafeAreaView>
        </View>
    );
}

export default OrderScreen;

OrderScreen.propTypes = {
    route: PropTypes.object,
    navigation: PropTypes.object,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors[50],
    },
    SafeAreaView: {
        flex: 1,
    },
    main: {
        flex: 1,
        justifyContent: "space-between",
    },
    actionTab: {
        backgroundColor: "white",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    actionTabTop: {
        padding: 24,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    separator: {
        height: 2,
        width: "100%",
        backgroundColor: theme.colors[50],
    },
    actionTabBottom: {
        padding: 24,
    },
    actionTabBottomTop: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    actionTabBottomTopLocation: {
        flexDirection: "row",
    },
    locationMarker: {
        marginTop: 1,
        marginRight: 7,
        opacity: 0.2,
    },
    actionTabBottomTopCreditCard: {
        flexDirection: "row",
        alignItems: "center",
    },
    masterCard: {
        marginRight: 7,
        marginTop: -4,
        opacity: 0.2,
    },
    creditCardDots: {
        marginTop: -4,
        marginRight: 4,
        flexDirection: "row",
    },
    creditCardDot: {
        width: 3,
        height: 3,
        marginRight: 2,
        borderRadius: 99,
        backgroundColor: "#000000",
    },
    pressable: {
        marginTop: 16,
        marginBottom: 10,
        backgroundColor: theme.colors.primary,
        padding: 16,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
    },
    pressableText: {
        color: "#FFFFFF",
    },
});
