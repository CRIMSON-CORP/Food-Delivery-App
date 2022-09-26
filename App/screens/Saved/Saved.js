import PropTypes from "prop-types";
import { ScrollView, View, StyleSheet } from "react-native";
import Animated, { FadeInDown, FadeIn } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import theme from "../../../utils/theme";
import { AnimatedPressable, AnimatedText, TopBar } from "../../components";
import { LeftArrow, List } from "../../components/Icons";
import { Text } from "../../components/ui";

function Saved({ navigation }) {
    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.container}>
                <TopBar
                    leftIcon={
                        <AnimatedPressable onPress={() => navigation.goBack()}>
                            <LeftArrow />
                        </AnimatedPressable>
                    }
                    rightIcon={<List />}
                >
                    Saved Restaurants
                </TopBar>
                <View style={styles.SafeAreaView}>
                    <View>
                        <View style={styles.mainHeader}>
                            <AnimatedText
                                delay={500}
                                styles={styles.mainHeaderText}
                                size={32}
                                weight={500}
                                duration={700}
                            >
                                Saved
                            </AnimatedText>
                            <AnimatedText
                                duration={700}
                                delay={700}
                                size={32}
                                weight={500}
                                styles={styles.mainHeaderText}
                            >
                                Restaurants
                            </AnimatedText>
                        </View>
                    </View>
                    <ScrollView
                        style={styles.restaurantScrollView}
                        showsVerticalScrollIndicator={false}
                    >
                        <Animated.View
                            entering={FadeIn.delay(1200).duration(1000)}
                            style={{
                                marginBottom: 50,
                                padding: 20,
                            }}
                        >
                            <Animated.View
                                entering={FadeInDown.springify()}
                                style={styles.emptyRestaurantView}
                            >
                                <Text styles={{ opacity: 0.5 }}>
                                    You have not saved any Restaurants
                                </Text>
                            </Animated.View>
                        </Animated.View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        </View>
    );
}

Saved.propTypes = {
    navigation: PropTypes.object,
};

export default Saved;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    SafeAreaView: {
        flex: 1,
    },
    mainHeader: {
        marginVertical: 30,
        marginBottom: 10,
        paddingHorizontal: 20,
    },
    mainHeaderText: {
        lineHeight: 36,
    },
    searchBarWrapper: {
        marginVertical: 10,
    },
    searchBar: {
        backgroundColor: theme.colors[100],
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 99,
        flexDirection: "row",
        alignItems: "center",
    },
    input: {
        marginLeft: 10,
        fontFamily: "poppins-medium",
        flex: 1,
        marginTop: 3,
    },
    emptyRestaurantView: {
        justifyContent: "center",
        flexDirection: "row",
        marginTop: 30,
    },
});
