/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import { View, StyleSheet } from "react-native";
import { Text } from "../ui";
import { useEffect } from "react";
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withTiming,
} from "react-native-reanimated";
import { useMemo } from "react";

let index = 0;

/**
 * @typedef AnimatedTextProps
 * @property {string} children - Must be a `string`, this is the text to be animated
 * @property {number} delay - Time delay before the animation starts, default is `0`
 * @property {number} duration - Time duration for how long each character takes to animate in, default is `450`
 * @property {number} stagger - Time delay between each character animating in, defualt is `35`
 * @property {number} size - Font Size
 * @property {number} weight - Font Weight
 *
 * @typedef EachWordProps
 * @property {string} word
 * @property {number} wordIndex
 * @property {number} delay
 */

/**
 * @param {AnimatedTextProps} AnimatedTextProps
 * @returns {JSX.Element}
 */

function AnimatedText({ children, delay, duration, stagger, size, weight, styles: textStyles }) {
    const TextArray = children.split(" ");
    const TextJSX = useMemo(
        () =>
            TextArray.map((word, index) => {
                return (
                    <View key={index} style={styles.animatedWordWrapper}>
                        <EachWord
                            word={word}
                            index={index}
                            wordIndex={index}
                            delay={delay}
                            duration={duration}
                            stagger={stagger}
                            size={size}
                            weight={weight}
                            textStyles={textStyles}
                        />
                        <Text>{index === TextArray.length - 1 ? "" : "   "}</Text>
                    </View>
                );
            }),
        [children, delay, duration, stagger, size, weight, styles]
    );

    useEffect(() => {
        return () => {
            index = 0;
        };
    }, []);

    return <View style={styles.animatedTextWrapper}>{TextJSX}</View>;
}

export default AnimatedText;

/**
 * @param {EachWordProps} EachWordProps
 * @returns {JSX.Element}
 */

function EachWord({ word, wordIndex, delay, duration, stagger, size, weight, textStyles }) {
    const EachChar = word.split("");
    const TextJSX = EachChar.map((t, index) => {
        return (
            <View key={index} style={styles.animatedWordWrapper}>
                <EachLetter
                    char={t}
                    index={index}
                    wordIndex={wordIndex}
                    delay={delay}
                    duration={duration}
                    stagger={stagger}
                    size={size}
                    weight={weight}
                    textStyles={textStyles}
                />
            </View>
        );
    });
    return <View style={styles.animatedWordContainer}>{TextJSX}</View>;
}
function EachLetter({ char, delay, duration, stagger, size, weight, textStyles }) {
    const transition = useSharedValue(50);
    const styles = useAnimatedStyle(() => ({
        transform: [{ translateY: transition.value }],
    }));
    useEffect(() => {
        transition.value = withDelay(
            delay + index * stagger,
            withTiming(0, {
                duration: duration + index * 20,
                easing: Easing.bezier(0.2, 0.65, 0.3, 1.125),
            })
        );
        index++;
    }, []);
    return (
        <Animated.View style={styles}>
            <Text size={size} weight={weight} styles={textStyles}>
                {char}
            </Text>
        </Animated.View>
    );
}

AnimatedText.defaultProps = {
    delay: 0,
    duration: 450,
    stagger: 35,
};

AnimatedText.propTypes = {
    children: PropTypes.string,
    delay: PropTypes.number,
};

EachWord.propTypes = {
    word: PropTypes.string,
    wordIndex: PropTypes.number,
    delay: PropTypes.number,
};

EachLetter.propTypes = {
    char: PropTypes.string,
    index: PropTypes.number,
    wordIndex: PropTypes.number,
    delay: PropTypes.number,
};

const styles = StyleSheet.create({
    animatedTextWrapper: {
        flexWrap: "wrap",
        flexDirection: "row",
    },
    animatedWordWrapper: {
        overflow: "hidden",
        flexDirection: "row",
    },
    animatedWordContainer: {
        flexDirection: "row",
    },
});
