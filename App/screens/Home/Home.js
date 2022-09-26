import { View, StyleSheet, Image } from "react-native";
import PropTypes from "prop-types";
import { SafeAreaView } from "react-native-safe-area-context";
import data from "../../../utils/data";
import { AnimatedPressable, AnimatedText, Restaurant, TopBar } from "../../components";
import { Location, Cart } from "../../components/Icons";
import { Text } from "../../components/ui";
import { Shadow } from "react-native-shadow-2";
import theme from "../../../utils/theme";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import Animated, {
    FadeInRight,
    interpolateColor,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withSpring,
    withTiming,
    FadeInDown,
} from "react-native-reanimated";

const CATEGORY_ITEM_WIDTH = 60;
const CATEGORY_ITEM_HEIGHT = 90;

function Home() {
    const [selectedCategory, setSelectedCategory] = useState("hot-dogs");
    const [restaurants, setRestaurants] = useState(data.restaurant);

    useEffect(() => {
        if (selectedCategory) {
            const filter = data.restaurant.filter((restaurant) =>
                restaurant.tags.find((tag) => tag.slug === selectedCategory)
            );
            setRestaurants(filter);
        }
    }, [selectedCategory]);

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.container}>
                <TopBar leftIcon={<Location />} rightIcon={<Cart />}>
                    {data.location}
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
                            Main
                        </AnimatedText>
                        <AnimatedText
                            duration={700}
                            delay={2300}
                            size={32}
                            weight={500}
                            styles={styles.mainHeaderText}
                        >
                            Categories
                        </AnimatedText>
                    </View>
                    <View>
                        <ScrollView
                            horizontal
                            pagingEnabled
                            style={styles.categoryScrollView}
                            showsHorizontalScrollIndicator={false}
                            snapToInterval={CATEGORY_ITEM_WIDTH + 20}
                        >
                            {data.categories.map((item, index) => (
                                <CategoryItem
                                    key={item.id}
                                    {...item}
                                    index={index}
                                    selectedCategory={selectedCategory}
                                    setSelectedCategory={setSelectedCategory}
                                />
                            ))}
                            <Indicator selectedCategory={selectedCategory} />
                        </ScrollView>
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

export default Home;

function CategoryItem({ slug, icon, label, index, selectedCategory, setSelectedCategory }) {
    const animatedColor = useSharedValue(slug === selectedCategory ? 1 : 0);

    const animatedContainerBackgroundStyles = useAnimatedStyle(() => ({
        backgroundColor: interpolateColor(
            animatedColor.value,
            [0, 1],
            ["#FFFFFF", theme.colors.primary]
        ),
    }));
    const animatedIconContainerBackgroundStyles = useAnimatedStyle(() => ({
        backgroundColor: interpolateColor(
            animatedColor.value,
            [0, 1],
            [theme.colors[100], "#FFFFFF"]
        ),
    }));
    const animatedTextStyles = useAnimatedStyle(() => ({
        color: interpolateColor(animatedColor.value, [0, 1], ["#000000", "#FFFFFF"]),
    }));

    useEffect(() => {
        if (slug === selectedCategory) {
            animatedColor.value = withDelay(350, withTiming(1));
        } else animatedColor.value = withTiming(0);
    }, [selectedCategory]);

    return (
        <Animated.View
            entering={FadeInRight.delay((index + 10) * 100)
                .duration(600)
                .springify()}
        >
            <AnimatedPressable onPress={() => setSelectedCategory(slug)}>
                <View style={styles.categoryItemWrapper}>
                    <Shadow distance={15} startColor="#F0F0F0" endColor="#FFFFFF00" offset={[0, 8]}>
                        <Animated.View
                            style={[styles.categoryItem, animatedContainerBackgroundStyles]}
                        >
                            <Animated.View
                                style={[styles.iconWrapper, animatedIconContainerBackgroundStyles]}
                            >
                                <Image source={icon} style={styles.categoryIcon} />
                            </Animated.View>
                            <Animated.Text style={[styles.categoryLabel, animatedTextStyles]}>
                                {label}
                            </Animated.Text>
                        </Animated.View>
                    </Shadow>
                </View>
            </AnimatedPressable>
        </Animated.View>
    );
}

function Indicator({ selectedCategory }) {
    const selectedCategoryIndex = data.categories.findIndex(
        (item) => item.slug === selectedCategory
    );
    const translateX = useSharedValue(selectedCategoryIndex * CATEGORY_ITEM_WIDTH);

    useEffect(() => {
        translateX.value = withSpring(selectedCategoryIndex * (CATEGORY_ITEM_WIDTH + 20), {
            mass: 1.2,
            damping: 15,
            stiffness: 100,
        });
    }, [selectedCategory]);

    const indicatorAnmatedStyles = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }],
    }));

    return (
        <Animated.View
            entering={FadeInRight.delay(10 * 100)
                .duration(600)
                .springify()}
            style={[styles.indicator, indicatorAnmatedStyles]}
        />
    );
}

Indicator.propTypes = {
    selectedCategory: PropTypes.string,
};

CategoryItem.propTypes = {
    slug: PropTypes.string,
    icon: PropTypes.number,
    label: PropTypes.string,
    index: PropTypes.number,
    selectedCategory: PropTypes.string,
    setSelectedCategory: PropTypes.func,
};

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
    categoryScrollView: {
        overflow: "visible",
        marginLeft: 10,
        position: "relative",
    },
    categoryItemWrapper: { padding: 10, paddingTop: 10, paddingBottom: 22, paddingRight: 10 },
    categoryItem: {
        width: CATEGORY_ITEM_WIDTH,
        height: CATEGORY_ITEM_HEIGHT,
        borderRadius: 9999,
        alignItems: "center",
        padding: 5,
        position: "relative",
    },
    iconWrapper: {
        padding: 5,
        borderRadius: 9999,
        width: 45,
        height: 45,
        margin: 0,
        marginBottom: 5,
        justifyContent: "center",
        alignItems: "center",
    },
    categoryIcon: {
        width: 20,
        height: 20,
    },
    categoryLabel: {
        fontFamily: "poppins-medium",
        fontSize: 12,
    },
    indicator: {
        width: CATEGORY_ITEM_WIDTH + 5,
        height: CATEGORY_ITEM_HEIGHT + 5,
        borderWidth: 3,
        borderColor: theme.colors.primary,
        borderRadius: 9999,
        alignItems: "center",
        position: "absolute",
        top: 7.7,
        left: 7.7,
        zIndex: 20,
    },
    restaurantScrollView: {
        flex: 1,
    },
});
