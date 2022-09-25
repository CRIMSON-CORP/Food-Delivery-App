import { Image, StyleSheet, View } from "react-native";
import PropTypes from "prop-types";
import Animated, { Layout, ZoomIn, ZoomOut } from "react-native-reanimated";
import { Shadow } from "react-native-shadow-2";
import { useNavigation } from "../../../context/navigationContext";
import theme from "../../../utils/theme";
import AnimatedPressable from "../AnimatedPressable";
import { Star } from "../Icons";
import { Text } from "../ui";

const RESTAURANT_CARD_HEIGHT = 200;

function Restaurant({ id, image, name, minTime, maxTime, rating, tags }) {
    const navigationRef = useNavigation();
    return (
        <Animated.View
            layout={Layout.springify()}
            entering={ZoomIn.duration(600)}
            exiting={ZoomOut}
            style={styles.restaurantCard}
        >
            <AnimatedPressable
                onPress={() =>
                    navigationRef.navigate("order", {
                        screen: "orderScreen",
                        params: { id },
                    })
                }
            >
                <Shadow
                    distance={25}
                    startColor="#dddddd"
                    endColor="#FFFFFF00"
                    offset={[0, 8]}
                    style={styles.restaurantCardShadow}
                >
                    <View style={styles.restaurantCardImageWrapper}>
                        <Image
                            source={image}
                            style={styles.restaurantCardImage}
                            resizeMode="cover"
                        />
                        <View style={styles.time}>
                            <Text weight={500}>
                                {minTime}-{maxTime}min
                            </Text>
                        </View>
                    </View>
                </Shadow>
            </AnimatedPressable>
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
        </Animated.View>
    );
}

Restaurant.propTypes = {
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

export default Restaurant;

const styles = StyleSheet.create({
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
    emptyRestaurantView: {
        justifyContent: "center",
        flexDirection: "row",
        marginTop: 100,
    },
});
