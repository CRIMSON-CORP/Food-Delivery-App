import { View, StyleSheet, Dimensions, Image, ScrollView } from "react-native";
import PropTypes from "prop-types";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, { FadeInDown } from "react-native-reanimated";
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

const { width } = Dimensions.get("screen");
const FOOD_IMAGE_DIMENSION = 240;
function OrderScreen({ navigation, route }) {
    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.SafeAreaView}>
                <TopSection navigation={navigation} route={route} />
                <View style={styles.main}>
                    <FoodsSection />
                    <BottomSection />
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

function TopSection({ navigation, route }) {
    const selectedRestaurantId = route.params.id;
    const { name } = data.restaurant.find((restaurant) => restaurant.id === selectedRestaurantId);

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
    route: PropTypes.object,
    navigation: PropTypes.object,
};

function FoodsSection() {
    return (
        <View style={styles.foodsContainer}>
            <ScrollView
                horizontal
                pagingEnabled
                data={data.foods}
                keyExtractor={({ id }) => id}
                showsHorizontalScrollIndicator={false}
            >
                {data.foods.map((item, index) => (
                    <FoodItem key={item.id} {...item} index={index} />
                ))}
            </ScrollView>
        </View>
    );
}

function FoodItem({ image, title, price, description, calories }) {
    return (
        <View style={styles.foodItem}>
            <View style={styles.foodItemImageContainer}>
                <Image source={image} style={styles.foodItemImage} resizeMode="cover" />
                <View style={styles.counterPosition}>
                    <Shadow
                        distance={25}
                        startColor="#E5E5E5"
                        endColor="#FFFFFF00"
                        offset={[0, 25]}
                    >
                        <View style={styles.counter}>
                            <View style={styles.counterIcon}>
                                <Minus size={14} />
                            </View>
                            <View>
                                <Text>2</Text>
                            </View>
                            <View style={styles.counterIcon}>
                                <Plus size={14} />
                            </View>
                        </View>
                    </Shadow>
                </View>
            </View>
            <View style={styles.contentContainer}>
                <Text
                    size={24}
                    weight={600}
                    styles={styles.textCenter}
                >{`${title}-$${price}`}</Text>
                <Text styles={styles.textCenter}>{description}</Text>
                <View style={styles.calories}>
                    <View style={styles.fire}>
                        <Fire size={14} />
                    </View>
                    <Text weight={500} styles={styles.caloriesText}>{`${calories} cal`}</Text>
                </View>
            </View>
        </View>
    );
}

FoodItem.propTypes = {
    index: PropTypes.number,
    image: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    description: PropTypes.string,
    calories: PropTypes.number,
};

function BottomSection() {
    return (
        <Animated.View entering={FadeInDown.delay(500).duration(500)} style={styles.actionTab}>
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
    );
}

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
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderRadius: 100,
        backgroundColor: "#FFFFFF",
    },
    counterIcon: {
        marginTop: 5,
    },
    textCenter: {
        textAlign: "center",
        marginBottom: 8,
    },
    contentContainer: {
        width: "80%",
        alignSelf: "center",
    },
    calories: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "center",
    },
    fire: {
        marginTop: -4,
        marginRight: 5,
    },
    caloriesText: {
        opacity: 0.2,
    },
});
