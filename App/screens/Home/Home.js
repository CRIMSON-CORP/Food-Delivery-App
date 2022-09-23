import { View, StyleSheet, Image, Pressable } from "react-native";
import PropTypes from "prop-types";
import { SafeAreaView } from "react-native-safe-area-context";
import data from "../../../utils/data";
import { TopBar } from "../../components";
import { Location } from "../../components/Icons";
import Cart from "../../components/Icons/Cart";
import { Center, Text } from "../../components/ui";
import { Shadow } from "react-native-shadow-2";
import theme from "../../../utils/theme";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import Animated, {
    interpolateColor,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withSpring,
    withTiming,
} from "react-native-reanimated";

const CATEGORY_ITEM_WIDTH = 60;
const CATEGORY_ITEM_HEIGHT = 90;

function Home() {
    const [selectedCategory, setSelectedCategory] = useState("hot-dogs");
    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.container}>
                <View style={styles.topbarWrapper}>
                    <TopBar leftIcon={<Location />} rightIcon={<Cart />}>
                        {data.location}
                    </TopBar>
                </View>
                <View>
                    <View style={styles.mainHeader}>
                        <Text styles={styles.mainHeaderText} size={32} weight={500}>
                            Main
                        </Text>
                        <Text size={32} weight={500} styles={styles.mainHeaderText}>
                            Categories
                        </Text>
                    </View>
                    <ScrollView
                        horizontal
                        pagingEnabled
                        style={styles.categoryFlatList}
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
            </SafeAreaView>
        </View>
    );
}

export default Home;

function CategoryItem({ slug, icon, label, selectedCategory, setSelectedCategory }) {
    const animatedColor = useSharedValue(slug === selectedCategory ? 1 : 0);

    useEffect(() => {
        if (slug === selectedCategory) {
            animatedColor.value = withDelay(350, withTiming(1));
        } else animatedColor.value = withTiming(0);
    }, [selectedCategory]);

    const animatedBackgroundStyles = useAnimatedStyle(() => ({
        backgroundColor: interpolateColor(
            animatedColor.value,
            [0, 1],
            ["#FFFFFF", theme.colors.primary]
        ),
    }));
    const animatedTextStyles = useAnimatedStyle(() => ({
        color: interpolateColor(animatedColor.value, [0, 1], ["#000000", "#FFFFFF"]),
    }));
    return (
        <Pressable onPress={() => setSelectedCategory(slug)}>
            <View style={styles.categoryItemWrapper}>
                <Shadow distance={15} startColor="#F0F0F0" endColor="#FFFFFF00" offset={[0, 8]}>
                    <Animated.View style={[styles.categoryItem, animatedBackgroundStyles]}>
                        <Center style={styles.iconWrapper}>
                            <Image source={icon} style={styles.categoryIcon} />
                        </Center>
                        <Animated.Text style={[styles.categoryLabel, animatedTextStyles]}>
                            {label}
                        </Animated.Text>
                    </Animated.View>
                </Shadow>
            </View>
        </Pressable>
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
            style={[
                {
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
                    // transform: [{ translateX: 50 }],
                },
                indicatorAnmatedStyles,
            ]}
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
    selectedCategory: PropTypes.string,
    setSelectedCategory: PropTypes.func,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: "#FFFFFF",
    },
    SafeAreaView: {
        flex: 1,
    },
    topbarWrapper: {
        // marginBottom: 30,
    },
    mainHeader: {
        marginVertical: 30,
        marginBottom: 10,
    },
    mainHeaderText: {
        lineHeight: 36,
    },
    categoryFlatList: {
        overflow: "visible",
        marginLeft: -10,
        position: "relative",
    },
    categoryItemWrapper: { padding: 10, paddingTop: 10, paddingBottom: 40, paddingRight: 10 },
    categoryItem: {
        width: CATEGORY_ITEM_WIDTH,
        height: CATEGORY_ITEM_HEIGHT,
        backgroundColor: "#FFFFFF",
        borderRadius: 9999,
        alignItems: "center",
        padding: 5,
        position: "relative",
    },
    iconWrapper: {
        backgroundColor: theme.colors[100],
        padding: 5,
        borderRadius: 9999,
        width: 45,
        height: 45,
        margin: 0,
        marginBottom: 5,
    },
    categoryIcon: {
        width: 20,
        height: 20,
    },
    categoryLabel: {
        fontFamily: "poppins-medium",
        fontSize: 12,
    },
});
