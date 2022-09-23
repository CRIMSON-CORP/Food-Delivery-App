import PropTypes from "prop-types";
import Animated, {
    useSharedValue,
    withTiming,
    withSpring,
    useAnimatedStyle,
} from "react-native-reanimated";
import { Pressable } from "react-native";
import { childrenPropType } from "../../../utils/constants";

const AnimatedPressableWrapper = Animated.createAnimatedComponent(Pressable);

function AnimatedPressable({ children, onPress }) {
    const scale = useSharedValue(1);

    function onPressIn() {
        scale.value = withTiming(0.95);
    }

    function onPressOut() {
        scale.value = withSpring(1, { damping: 5 });
    }

    const animatedPressableStyles = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    return (
        <AnimatedPressableWrapper
            style={animatedPressableStyles}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            onPress={onPress}
        >
            {children}
        </AnimatedPressableWrapper>
    );
}

AnimatedPressable.propTypes = {
    ...childrenPropType,
    onPress: PropTypes.func,
};

export default AnimatedPressable;
