import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { ScrollView, View, StyleSheet, TextInput } from "react-native";
import Animated, { FadeInDown, FadeInRight, FadeIn } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import data from "../../../utils/data";
import theme from "../../../utils/theme";
import { AnimatedPressable, AnimatedText, Restaurant, TopBar } from "../../components";
import { LeftArrow, List, Search as SearchIcon } from "../../components/Icons";
import { Text } from "../../components/ui";

function Search({ navigation }) {
    const [restaurants, setRestaurants] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        if (searchQuery)
            setRestaurants(data.restaurant.filter((item) => item.name.match(searchQuery)));
        else setRestaurants([]);
    }, [searchQuery]);

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
                    Search
                </TopBar>
                <View style={styles.SafeAreaView}>
                    <View>
                        <View style={styles.mainHeader}>
                            <AnimatedText
                                delay={200}
                                styles={styles.mainHeaderText}
                                size={32}
                                weight={500}
                                duration={700}
                            >
                                Search
                            </AnimatedText>
                            <AnimatedText
                                duration={700}
                                delay={300}
                                size={32}
                                weight={500}
                                styles={styles.mainHeaderText}
                            >
                                Restaurants
                            </AnimatedText>
                            <Animated.View
                                entering={FadeInRight.delay(1000).duration(500)}
                                style={styles.searchBarWrapper}
                            >
                                <View style={styles.searchBar}>
                                    <SearchIcon color={theme.colors[300]} />
                                    <TextInput
                                        style={styles.input}
                                        onChangeText={(text) => setSearchQuery(text)}
                                        placeholder="Search Restaurants..."
                                    />
                                </View>
                            </Animated.View>
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
                            {restaurants.map((item) => (
                                <Restaurant key={item.id} {...item} />
                            ))}
                            {restaurants.length === 0 && searchQuery !== "" && (
                                <Animated.View
                                    entering={FadeInDown.springify()}
                                    style={styles.emptyRestaurantView}
                                >
                                    <Text styles={{ opacity: 0.5 }}>
                                        No Restaurants matched your Search
                                    </Text>
                                </Animated.View>
                            )}
                            {restaurants.length === 0 && searchQuery === "" && (
                                <Animated.View
                                    entering={FadeInDown.springify()}
                                    style={styles.emptyRestaurantView}
                                >
                                    <Text styles={{ opacity: 0.5 }}>Enter Search query</Text>
                                </Animated.View>
                            )}
                        </Animated.View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        </View>
    );
}

Search.propTypes = {
    navigation: PropTypes.object,
};

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
