import { useState } from "react";
import { ScrollView, Text, View, StyleSheet } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import data from "../../../utils/data";
import { AnimatedText, Restaurant, TopBar } from "../../components";
import { LeftArrow, List } from "../../components/Icons";

function Search() {
    const [restaurants, setRestaurants] = useState(data.restaurant);
    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.container}>
                <TopBar leftIcon={<LeftArrow />} rightIcon={<List />}>
                    Search
                </TopBar>
                <View style={styles.SafeAreaView}>
                    <View style={styles.mainHeader}>
                        <AnimatedText
                            delay={2000}
                            styles={styles.mainHeaderText}
                            size={32}
                            weight={500}
                            duration={700}
                        >
                            Search
                        </AnimatedText>
                        <AnimatedText
                            duration={700}
                            delay={2300}
                            size={32}
                            weight={500}
                            styles={styles.mainHeaderText}
                        >
                            Restaurants
                        </AnimatedText>
                    </View>
                    <ScrollView
                        style={styles.restaurantScrollView}
                        showsVerticalScrollIndicator={false}
                    >
                        <View
                            style={{
                                marginBottom: 50,
                                padding: 20,
                            }}
                        >
                            {restaurants.map((item) => (
                                <Restaurant key={item.id} {...item} />
                            ))}
                            {restaurants.length === 0 && (
                                <Animated.View
                                    entering={FadeInDown.springify()}
                                    style={styles.emptyRestaurantView}
                                >
                                    <Text styles={{ opacity: 0.5 }}>
                                        No Restaurants matched this category
                                    </Text>
                                </Animated.View>
                            )}
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        </View>
    );
}

export default Search;

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
});
