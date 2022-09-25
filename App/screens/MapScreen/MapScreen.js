import PropTypes from "prop-types";
import { View, StyleSheet, Image } from "react-native";
import { Shadow } from "react-native-shadow-2";
import data from "../../../utils/data";
import { PushPin, Star } from "../../components/Icons";
import { Text } from "../../components/ui";
import avatar from "../../../assets/images/avatar.jpg";
import map from "../../../assets/images/map.png";
import theme from "../../../utils/theme";

function MapScreen({ route }) {
    return (
        <View style={styles.container}>
            <Image source={map} style={styles.mapImage} />
            <TopBar />
            <BottomBar params={route.params} />
        </View>
    );
}

MapScreen.propTypes = {
    route: PropTypes.object,
};

export default MapScreen;

function TopBar() {
    return (
        <View style={styles.topBarPosition}>
            <Shadow
                style={styles.topBarShadow}
                distance={15}
                startColor="#00000015"
                endColor="#00000000"
                offset={[0, 10]}
            >
                <View style={styles.topBar}>
                    <View style={styles.location}>
                        <View style={styles.marker}>
                            <PushPin size={14} />
                        </View>
                        <Text weight={500}>{data.location}, New York</Text>
                    </View>
                    <Text weight={500}>7mins</Text>
                </View>
            </Shadow>
        </View>
    );
}

function BottomBar({ params }) {
    const { name, rating } = params;
    return (
        <View style={styles.bottomBarPosition}>
            <Shadow
                style={styles.topBarShadow}
                distance={15}
                startColor="#00000015"
                endColor="#00000000"
                offset={[0, 10]}
            >
                <View style={[styles.topBar, { flexDirection: "column" }]}>
                    <View style={[styles.bottomBarTop, { marginBottom: 16 }]}>
                        <View style={styles.avatarContainer}>
                            <Image source={avatar} style={styles.avatar} />
                            <View>
                                <Text weight={700} size={18}>
                                    Bruce Evans
                                </Text>
                                <Text size={16} styles={styles.muted}>
                                    {name}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.rating}>
                            <Star size={14} color={theme.colors.primary} />
                            <Text styles={styles.ratingText}>{rating}</Text>
                        </View>
                    </View>
                    <View style={styles.bottombarBottom}>
                        <View style={[styles.button, styles.main]}>
                            <Text weight={500} styles={styles.mainText}>
                                Call
                            </Text>
                        </View>
                        <View style={styles.spacer} />
                        <View style={[styles.button, styles.secondary]}>
                            <Text weight={500}>Message</Text>
                        </View>
                    </View>
                </View>
            </Shadow>
        </View>
    );
}

BottomBar.propTypes = {
    params: PropTypes.object,
};

const styles = StyleSheet.create({
    container: {
        position: "relative",
        flex: 1,
    },
    topBarPosition: {
        position: "absolute",
        paddingHorizontal: 32,
        top: 50,
        width: "100%",
    },
    topBarShadow: {
        width: "100%",
    },
    topBar: {
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 20,
        paddingVertical: 14,
        paddingBottom: 10,
        width: "100%",
        borderRadius: 25,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    location: {
        flexDirection: "row",
    },
    marker: {
        marginTop: 2,
        marginRight: 5,
    },
    bottomBarPosition: {
        position: "absolute",
        paddingHorizontal: 32,
        bottom: 30,
        width: "100%",
    },
    bottomBarTop: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
    avatarContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 999,
        resizeMode: "cover",
        marginRight: 16,
    },
    muted: {
        opacity: 0.2,
    },
    rating: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "flex-start",
    },
    ratingText: {
        marginLeft: 7,
        marginTop: 7,
    },
    bottombarBottom: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
    button: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        width: "100%",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 14,
    },
    spacer: {
        width: 10,
    },
    main: {
        backgroundColor: theme.colors.primary,
    },
    mainText: {
        color: "white",
    },
    secondary: {
        backgroundColor: theme.colors[100],
    },
    mapImage: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
});
