import { View, StyleSheet, Image, Pressable } from "react-native";
import PropTypes from "prop-types";
import { SafeAreaView } from "react-native-safe-area-context";
import data from "../../../utils/data";
import { TopBar } from "../../components";
import { Location, Cart, Star } from "../../components/Icons";
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
} from "react-native-reanimated";

const CATEGORY_ITEM_WIDTH = 60;
const CATEGORY_ITEM_HEIGHT = 90;

const RESTAURANT_CARD_HEIGHT = 200;

function Home() {
    const [selectedCategory, setSelectedCategory] = useState("hot-dogs");
    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.container}>
                <TopBar leftIcon={<Location />} rightIcon={<Cart />}>
                    {data.location}
                </TopBar>
                <View style={styles.SafeAreaView}>
                    <View style={styles.mainHeader}>
                        <Text styles={styles.mainHeaderText} size={32} weight={500}>
                            Main
                        </Text>
                        <Text size={32} weight={500} styles={styles.mainHeaderText}>
                            Categories
                        </Text>
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
                        <View style={{ marginBottom: 50, padding: 20 }}>
                            {data.restaurant.map((item, index) => (
                                <Resturant {...item} key={index} />
                            ))}
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
            <Pressable onPress={() => setSelectedCategory(slug)}>
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
            </Pressable>
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

function Resturant({ image, name, minTime, maxTime, rating, tags }) {
    return (
        <View style={styles.restaurantCard}>
            <Shadow
                distance={25}
                startColor="#dddddd"
                endColor="#FFFFFF00"
                offset={[0, 8]}
                style={styles.restaurantCardShadow}
            >
                <View style={styles.restaurantCardImageWrapper}>
                    <Image source={image} style={styles.restaurantCardImage} resizeMode="cover" />
                    <View style={styles.time}>
                        <Text weight={500}>{`${minTime}-${maxTime}min`}</Text>
                    </View>
                </View>
            </Shadow>
            <View style={styles.restaurantCardContent}>
                <Text size={28}>{name}</Text>
                <View style={styles.restaurantCardContentDetail}>
                    <Star size={16} color={theme.colors.primary} />
                    <Text styles={styles.restaurantRating}>{rating}</Text>
                    {tags.map(({ label }, index) => (
                        <View key={index} style={styles.tag}>
                            <Text styles={styles.tagText}>{label}</Text>
                            <View style={styles.tagSeparator} />
                        </View>
                    ))}
                    <Text>$</Text>
                    <Text styles={styles.dollarFaded}>$$</Text>
                </View>
            </View>
        </View>
    );
}

Resturant.propTypes = {
    id: PropTypes.number,
    image: PropTypes.number,
    name: PropTypes.string,
    minTime: PropTypes.number,
    maxTime: PropTypes.number,
    rating: PropTypes.number,
    tags: PropTypes.arrayOf(
        PropTypes.shape({
            slug: PropTypes.string,
            label: PropTypes.string,
        })
    ),
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
    categoryItemWrapper: { padding: 10, paddingTop: 10, paddingBottom: 40, paddingRight: 10 },
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
    restaurantCardWrapper: {},
    restaurantCard: {
        marginBottom: 20,
        width: "100%",
    },
    restaurantCardShadow: {
        width: "100%",
    },
    restaurantCardImageWrapper: {
        width: "100%",
        borderRadius: 30,
        overflow: "hidden",
        position: "relative",
    },
    restaurantCardImage: {
        height: RESTAURANT_CARD_HEIGHT,
        width: "100%",
    },
    time: {
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 16,
        paddingVertical: 12,
        position: "absolute",
        bottom: 0,
        left: 0,
        borderTopRightRadius: 30,
    },
    restaurantCardContent: {
        marginTop: 16,
    },
    restaurantCardContentDetail: {
        flexDirection: "row",
        // alignItems: "center",
    },
    restaurantRating: {
        marginLeft: 8,
        marginRight: 10,
    },
    tag: {
        marginRight: 5,
        flexDirection: "row",
        alignItems: "center",
    },
    tagText: {
        marginRight: 5,
    },
    tagSeparator: {
        width: 4,
        height: 4,
        borderRadius: 99,
        backgroundColor: theme.colors[200],
    },
    dollarFaded: {
        color: theme.colors[200],
    },
});
