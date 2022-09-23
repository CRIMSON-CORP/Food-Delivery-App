import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
    Easing,
    withTiming,
    withRepeat,
    useSharedValue,
    useAnimatedStyle,
} from "react-native-reanimated";
import theme from "../../../utils/theme";

export default function LoadingScreen() {
    const rotate = useSharedValue(0);

    const rotateAnimatedStyle = useAnimatedStyle(() => ({
        transform: [{ rotate: `${rotate.value}deg` }],
    }));

    useEffect(() => {
        rotate.value = withRepeat(
            withTiming(360, { duration: 1000, easing: Easing.out(Easing.quad) }),
            Infinity
        );
    }, []);

    return (
        <View style={styles.container}>
            <Animated.View style={[rotateAnimatedStyle, styles.circle]}>
                <View style={styles.dot} />
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    circle: {
        width: 40,
        height: 40,
        borderWidth: 5,
        borderColor: theme.colors.primary,
        padding: 6,
        borderRadius: 99999,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 99999,
        backgroundColor: theme.colors.primary,
    },
});
