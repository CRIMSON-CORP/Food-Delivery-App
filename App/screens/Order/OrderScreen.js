import { View, StyleSheet, Dimensions, Image, FlatList } from "react-native";
import PropTypes from "prop-types";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, {
    FadeInDown,
    interpolate,
    interpolateColor,
    useAnimatedStyle,
    useSharedValue,
} from "react-native-reanimated";
import theme from "../../../utils/theme";
import { AnimatedPressable, TopBar } from "../../components";
import {
    Fire,
    LeftArrow,
    List,
    LocationMarker,
    MasterCard,
    Minus,
    Plus,
} from "../../components/Icons";
import { Text } from "../../components/ui";
import data from "../../../utils/data";
import { Shadow } from "react-native-shadow-2";
import { useCallback, useMemo } from "react";
import { useCart } from "../../../context/cartContext";

const { width } = Dimensions.get("screen");
const FOOD_IMAGE_DIMENSION = 240;
function OrderScreen({ navigation, route }) {
    const selectedRestaurantId = route.params.id;
    const { name, rating } = data.restaurant.find(
        (restaurant) => restaurant.id === selectedRestaurantId
    );
    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.SafeAreaView}>
                <TopSection navigation={navigation} name={name} />
                <View style={styles.main}>
                    <FoodsSection />
                    <BottomSection navigation={navigation} name={name} rating={rating} />
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

function TopSection({ navigation, name }) {
    return (
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
    );
}

TopSection.propTypes = {
    name: PropTypes.string,
    navigation: PropTypes.object,
};

function FoodsSection() {
    const scrollPosition = useSharedValue(0);

    const onScroll = useCallback(
        ({
            nativeEvent: {
                contentOffset: { x },
            },
        }) => {
            scrollPosition.value = x;
        },
        []
    );

    return (
        <View style={styles.foodsContainer}>
            <FlatList
                horizontal
                pagingEnabled
                data={data.foods}
                onScroll={onScroll}
                scrollEventThrottle={1}
                keyExtractor={({ id }) => id}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => (
                    <FoodItem
                        {...item}
                        id={item.id}
                        index={index}
                        key={item.id}
                        scrollPosition={scrollPosition}
                    />
                )}
            />
            <View style={styles.indicatorDotsWrapper}>
                {data.foods.map((_, index) => (
                    <IndicatorDot key={index} index={index} scrollPosition={scrollPosition} />
                ))}
            </View>
        </View>
    );
}

function FoodItem({ id, index, image, title, price, description, calories, scrollPosition }) {
    const { cart, addToCart, removeFromCart } = useCart();

    const itemInCart = cart.find((item) => item.id === id);

    const minusDisabledStyles = useMemo(
        () => ({
            opacity: itemInCart ? 1 : 0.2,
        }),
        [itemInCart]
    );

    const interpolationInputRange = [(index - 1) * width, index * width, (index + 1) * width];
    const animatedRotaionStyles = useAnimatedStyle(() => ({
        transform: [
            {
                rotate: `${interpolate(
                    scrollPosition.value,
                    interpolationInputRange,
                    [120, 0, -120],
                    "clamp"
                )}deg`,
            },
        ],
    }));

    return (
        <View style={styles.foodItem}>
            <View style={styles.foodItemImageContainer}>
                <Animated.View style={animatedRotaionStyles}>
                    <Image source={image} style={styles.foodItemImage} resizeMode="cover" />
                </Animated.View>
                <View style={styles.counterPosition}>
                    <Shadow
                        distance={25}
                        startColor="#E5E5E5"
                        endColor="#FFFFFF00"
                        offset={[0, 25]}
                    >
                        <View style={styles.counter}>
                            <AnimatedPressable onPress={() => removeFromCart(id)}>
                                <View style={[styles.counterIcon, minusDisabledStyles]}>
                                    <Minus size={14} />
                                </View>
                            </AnimatedPressable>
                            <View style={styles.counterText}>
                                <Text size={26}>{itemInCart ? itemInCart.amount : 0}</Text>
                            </View>
                            <AnimatedPressable onPress={() => addToCart(id)}>
                                <View style={styles.counterIcon}>
                                    <Plus size={14} />
                                </View>
                            </AnimatedPressable>
                        </View>
                    </Shadow>
                </View>
            </View>
            <View style={styles.contentContainer}>
                <Text size={24} weight={600} styles={styles.textCenter}>
                    {title} - ${price}
                </Text>
                <Text styles={styles.textCenter}>{description}</Text>
                <View style={styles.calories}>
                    <View style={styles.fire}>
                        <Fire size={14} />
                    </View>
                    <Text weight={500} styles={styles.caloriesText}>
                        {calories} cal
                    </Text>
                </View>
            </View>
        </View>
    );
}

FoodItem.propTypes = {
    id: PropTypes.number,
    index: PropTypes.number,
    image: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    description: PropTypes.string,
    calories: PropTypes.number,
    scrollPosition: PropTypes.object,
};

function IndicatorDot({ index, scrollPosition }) {
    const interpolationInputRange = [(index - 1) * width, index * width, (index + 1) * width];
    const backgroundColorInterpolationOutput = [
        theme.colors[200],
        theme.colors.primary,
        theme.colors[200],
    ];
    const dotAnimatedStyles = useAnimatedStyle(() => ({
        transform: [
            {
                scale: interpolate(
                    scrollPosition.value,
                    interpolationInputRange,
                    [1, 1.5, 1],
                    "clamp"
                ),
            },
        ],
        backgroundColor: interpolateColor(
            scrollPosition.value,
            interpolationInputRange,
            backgroundColorInterpolationOutput,
            "RGB"
        ),
    }));
    return <Animated.View style={[styles.indicatorDot, dotAnimatedStyles]} />;
}

IndicatorDot.propTypes = {
    index: PropTypes.number,
    scrollPosition: PropTypes.object,
};

function BottomSection({ navigation, name, rating }) {
    const { cart } = useCart();

    const totalCostOfItems = useMemo(
        () =>
            cart.reduce((initial, accum) => {
                return initial + accum.price * accum.amount;
            }, 0),
        [cart]
    );

    const goToMap = useCallback(() => navigation.navigate("mapScreen", { name, rating }), []);

    return (
        <Animated.View entering={FadeInDown.delay(500).duration(500)} style={styles.actionTab}>
            <View style={styles.actionTabTop}>
                <Text weight={500} size={18}>
                    {cart.length} Items in Cart
                </Text>
                <Text weight={500} size={18}>
                    ${totalCostOfItems.toFixed(2)}
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
                <AnimatedPressable onPress={goToMap}>
                    <View style={styles.pressable}>
                        <Text size={18} weight={500} styles={styles.pressableText}>
                            Order
                        </Text>
                    </View>
                </AnimatedPressable>
            </View>
        </Animated.View>
    );
}

BottomSection.propTypes = {
    navigation: PropTypes.object,
    name: PropTypes.string,
    rating: PropTypes.number,
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
    foodsContainer: {
        marginVertical: 30,
    },
    foodItem: {
        width,
        alignItems: "center",
    },
    foodItemImage: {
        width: FOOD_IMAGE_DIMENSION,
        height: FOOD_IMAGE_DIMENSION,
    },
    foodItemImageContainer: {
        position: "relative",
        marginBottom: 30,
    },
    counterPosition: {
        position: "absolute",
        left: FOOD_IMAGE_DIMENSION / 2 - 60,
        bottom: 0,
    },
    counter: {
        justifyContent: "space-between",
        alignSelf: "center",
        width: 120,
        flexDirection: "row",
        paddingVertical: 4,
        paddingHorizontal: 16,
        borderRadius: 100,
        backgroundColor: "#FFFFFF",
    },
    counterIcon: {
        marginTop: 12,
    },
    textCenter: {
        textAlign: "center",
        marginBottom: 8,
    },
    contentContainer: {
        width: "80%",
        alignSelf: "center",
    },
    counterText: {
        marginTop: 3,
    },
    calories: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "center",
        marginBottom: 20,
    },
    fire: {
        marginTop: -4,
        marginRight: 5,
    },
    caloriesText: {
        opacity: 0.2,
    },
    indicatorDotsWrapper: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "center",
    },
    indicatorDot: {
        width: 5,
        height: 5,
        borderRadius: 10,
        marginRight: 6,
        backgroundColor: theme.colors[200],
    },
});
