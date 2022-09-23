import PropTypes from "prop-types";
import { StyleSheet, View, Pressable } from "react-native";
import { Svg, Path } from "react-native-svg";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withDelay,
    Easing,
    useAnimatedProps,
    withSequence,
} from "react-native-reanimated";
import { useCallback, useEffect, useState } from "react";
import theme from "../../../utils/theme";
import { useNavigation } from "../../../context/navigationContext";
import { Center } from "../ui";
import { LinearGradient } from "expo-linear-gradient";

const CURVED_BACKGROUND_HEIGHT = 70;

const BALL_DIMENSIONS = 52;
const BALL_STARTING_POINT = 26;

const ICON_SIZE = 24;
const ICON_ACTIVE_COLOR = theme.colors.primary;
const ICON_INACTIVE_COLOR = theme.colors[200];

const HORIZONTAL_TRANSLATE_DURATION = 800;
const HORIZONTAL_TRANSLATE_EASING = Easing.bezier(0.27, 0.29, 0.31, 0.99);

const ICON_DEFAULT_PROP_VALUES = {
    visible: true,
    color: ICON_INACTIVE_COLOR,
};

const ICONS_PROPTYPES = {
    visible: PropTypes.bool,
    active: PropTypes.bool,
    color: PropTypes.string,
};

const SHAPES_STOPS = {
    home: 0,
    search: 85,
    saved: 170,
    profile: 255,
};

const AnimatedView = Animated.createAnimatedComponent(View);
const AnimatedPath = Animated.createAnimatedComponent(Path);

export default function BottomNavigation() {
    return (
        <View style={styles.container}>
            <BottomNavigationUnderlay />
            <BottomNavigationBackground />
            <IndicatorBall />
            <BottomNavigationTabs />
        </View>
    );
}

function BottomNavigationUnderlay() {
    return (
        <LinearGradient
            colors={["#00000000", "#00000015", "#00000040"]}
            style={styles.underlayContainer}
        />
    );
}

function BottomNavigationBackground() {
    const translateX = useSharedValue(0);

    const navigationRef = useNavigation();

    useEffect(() => {
        navigationRef.addListener("state", () => {
            translateX.value = withTiming(SHAPES_STOPS[navigationRef?.getCurrentRoute()?.name], {
                duration: HORIZONTAL_TRANSLATE_DURATION,
                easing: HORIZONTAL_TRANSLATE_EASING,
            });
        });
    }, []);

    const translateXAnimatedStyles = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }],
    }));

    return (
        <View style={styles.background}>
            <AnimatedView style={translateXAnimatedStyles}>
                <Svg height={CURVED_BACKGROUND_HEIGHT} width={900} viewBox="0 0 900 70">
                    <Path
                        fill="#fff"
                        d="M380.71,0a24.6,24.6,0,0,0-21.93,13.54,30,30,0,0,1-53.56,0A24.6,24.6,0,0,0,283.29,0H0V70H900V0Z"
                    />
                </Svg>
            </AnimatedView>
        </View>
    );
}

function BottomNavigationTabs() {
    const navigationRef = useNavigation();
    const [currentRouteName, setCurrentRouteName] = useState("");

    useEffect(() => {
        navigationRef.addListener("state", () =>
            setCurrentRouteName(navigationRef?.getCurrentRoute()?.name)
        );
    }, []);

    const isHome = currentRouteName === "home";
    const isSearch = currentRouteName === "search";
    const isSaved = currentRouteName === "saved";
    const isProfile = currentRouteName === "profile";

    const goToHome = useCallback(() => !isHome && navigationRef.navigate("home"), [isHome]);
    const goToSearch = useCallback(() => !isSearch && navigationRef.navigate("search"), [isSearch]);
    const goToSaved = useCallback(() => !isSaved && navigationRef.navigate("saved"), [isSaved]);
    const goToProfile = useCallback(
        () => !isProfile && navigationRef.navigate("profile"),
        [isProfile]
    );

    return (
        <View style={styles.tabsContainer}>
            <Pressable onPress={goToHome}>
                <Cutlery visible={!isHome} />
            </Pressable>
            <Pressable onPress={goToSearch}>
                <Search visible={!isSearch} />
            </Pressable>
            <Pressable onPress={goToSaved}>
                <Heart visible={!isSaved} />
            </Pressable>
            <Pressable onPress={goToProfile}>
                <User visible={!isProfile} />
            </Pressable>
        </View>
    );
}

//ICONS
function Cutlery({ active, color, visible }) {
    const PATH_LENGTH = 388.319;
    const { pathAnimatedProps, pathAnimatedStyles } = useAnimatedPath(PATH_LENGTH, active, visible);

    return (
        <Svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 74.6 111.16">
            <AnimatedPath
                stroke={color}
                strokeWidth={9}
                strokeLinecap="round"
                strokeMiterlimit={10}
                style={[styles.indicatorPath, pathAnimatedStyles]}
                strokeDasharray={PATH_LENGTH}
                animatedProps={pathAnimatedProps}
                d="M2,4V36.18a5.4,5.4,0,0,0,5.4,5.4h4.7a4.69,4.69,0,0,1,4.7,4.7v62.88M32.08,28.62H2m24.32,13h0a5.76,5.76,0,0,0,5.76-5.76V3.9M16.8,4V28.62M72.6,56.53V3.9L59.93,13a11.07,11.07,0,0,0-4.61,9V60.32a8.62,8.62,0,0,0,8.62,8.62h2.7a6,6,0,0,1,6,6v34.26"
            />
        </Svg>
    );
}

function Search({ active, color, visible }) {
    const PATH_LENGTH = 54.486;
    const { pathAnimatedProps, pathAnimatedStyles } = useAnimatedPath(PATH_LENGTH, active, visible);
    return (
        <Svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24">
            <AnimatedPath
                strokeWidth={2}
                stroke={color}
                style={[styles.indicatorPath, pathAnimatedStyles]}
                strokeDasharray={PATH_LENGTH}
                animatedProps={pathAnimatedProps}
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
        </Svg>
    );
}

function Heart({ active, color, visible }) {
    const PATH_LENGTH = 56.579;
    const { pathAnimatedProps, pathAnimatedStyles } = useAnimatedPath(PATH_LENGTH, active, visible);
    return (
        <Svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24">
            <AnimatedPath
                stroke={color}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                style={[styles.indicatorPath, pathAnimatedStyles]}
                strokeDasharray={PATH_LENGTH}
                animatedProps={pathAnimatedProps}
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
        </Svg>
    );
}

function User({ active, color, visible }) {
    const PATH_LENGTH = 62.354;
    const { pathAnimatedProps, pathAnimatedStyles } = useAnimatedPath(PATH_LENGTH, active, visible);
    return (
        <Svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24">
            <AnimatedPath
                stroke={color}
                strokeWidth={2}
                style={[styles.indicatorPath, pathAnimatedStyles]}
                strokeDasharray={PATH_LENGTH}
                animatedProps={pathAnimatedProps}
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
        </Svg>
    );
}

//Icons Default values
Cutlery.defaultProps = ICON_DEFAULT_PROP_VALUES;
Search.defaultProps = ICON_DEFAULT_PROP_VALUES;
Heart.defaultProps = ICON_DEFAULT_PROP_VALUES;
User.defaultProps = ICON_DEFAULT_PROP_VALUES;

//Icons PropTypes
Cutlery.propTypes = ICONS_PROPTYPES;
Search.propTypes = ICONS_PROPTYPES;
Heart.propTypes = ICONS_PROPTYPES;
User.propTypes = ICONS_PROPTYPES;

function IndicatorBall() {
    const navigationRef = useNavigation();
    const [currentRouteName, setCurrentRouteName] = useState("home");

    const translateX = useSharedValue(0);
    const translateYInner = useSharedValue(0);

    useEffect(() => {
        navigationRef.addListener("state", () => {
            setCurrentRouteName(navigationRef.getCurrentRoute().name);

            translateX.value = withTiming(SHAPES_STOPS[navigationRef.getCurrentRoute().name], {
                duration: HORIZONTAL_TRANSLATE_DURATION,
                easing: HORIZONTAL_TRANSLATE_EASING,
            });
            translateYInner.value = withSequence(
                withTiming(50, { duration: 100, easing: Easing.out(Easing.quad) }),
                withTiming(0, { duration: 600, easing: Easing.out(Easing.quad) })
            );
        });
    }, []);

    const animatedOuterViewStyles = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }],
    }));
    const animatedInnerViewStyles = useAnimatedStyle(() => ({
        transform: [{ translateY: translateYInner.value }],
    }));

    const isHome = currentRouteName === "home";
    const isSearch = currentRouteName === "search";
    const isSaved = currentRouteName === "saved";
    const isProfile = currentRouteName === "profile";

    console.log({
        isHome,
        isSearch,
        isSaved,
        isProfile,
    });

    return (
        <AnimatedView style={[styles.indicatorBallOuter, animatedOuterViewStyles]}>
            <AnimatedView style={[styles.indicatorBall, animatedInnerViewStyles]}>
                <Center flex={1} style={styles.indicatorBallIcon}>
                    <Cutlery active={isHome} visible={isHome} color={ICON_ACTIVE_COLOR} />
                </Center>
                <Center flex={1} style={styles.indicatorBallIcon}>
                    <Search active={isSearch} visible={isSearch} color={ICON_ACTIVE_COLOR} />
                </Center>
                <Center flex={1} style={styles.indicatorBallIcon}>
                    <Heart active={isSaved} visible={isSaved} color={ICON_ACTIVE_COLOR} />
                </Center>
                <Center flex={1} style={styles.indicatorBallIcon}>
                    <User active={isProfile} visible={isProfile} color={ICON_ACTIVE_COLOR} />
                </Center>
            </AnimatedView>
        </AnimatedView>
    );
}

function useAnimatedPath(pathLength, active, visible) {
    const opacity = useSharedValue(1);

    const strokeDashOffset = useSharedValue(0);

    useEffect(() => {
        if (visible) {
            opacity.value = withTiming(1, { duration: 300 });
        } else {
            opacity.value = withTiming(0, { duration: 300 });
        }
    }, [visible]);

    useEffect(() => {
        if (active !== undefined) {
            if (active) {
                strokeDashOffset.value = withDelay(
                    500,
                    withTiming(0, { duration: 1500, easing: Easing.out(Easing.quad) })
                );
            } else {
                strokeDashOffset.value = pathLength;
            }
        }
    }, [active]);

    const pathAnimatedStyles = useAnimatedStyle(() => ({
        opacity: opacity.value,
    }));

    const pathAnimatedProps = useAnimatedProps(() => ({
        strokeDashoffset: strokeDashOffset.value,
    }));

    return { pathAnimatedProps, pathAnimatedStyles };
}

const styles = StyleSheet.create({
    container: {
        bottom: 0,
        left: 0,
        width: "100%",
        position: "absolute",
    },
    background: {
        position: "absolute",
        bottom: -5,
        left: -280,
    },
    underlayContainer: { height: 100, position: "absolute", bottom: 0, width: "100%" },
    tabsContainer: {
        flexDirection: "row",
        paddingHorizontal: 40,
        justifyContent: "space-between",
        bottom: 24,
    },
    indicatorBallInner: {
        flex: 1,
    },
    indicatorBallOuter: {
        position: "absolute",
        left: BALL_STARTING_POINT,
        bottom: CURVED_BACKGROUND_HEIGHT - BALL_DIMENSIONS / 2 - 2,
    },
    indicatorBall: {
        width: BALL_DIMENSIONS,
        height: BALL_DIMENSIONS,
        borderRadius: 9999,
        backgroundColor: "white",
        overflow: "hidden",
    },
    indicatorBallIcon: {
        position: "absolute",
        width: "100%",
        height: "100%",
    },
    indicatorPath: {
        opacity: 1,
    },
});
