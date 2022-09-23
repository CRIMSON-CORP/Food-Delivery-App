import PropTypes from "prop-types";
import { View, StyleSheet } from "react-native";
import theme from "../../../utils/theme";
import { Text } from "../ui";

function TopBar({ leftIcon, children, rightIcon }) {
    return (
        <View style={styles.topBar}>
            {leftIcon}
            <View style={styles.capsle}>
                <Text size={14} weight={500}>
                    {children}
                </Text>
            </View>
            {rightIcon}
        </View>
    );
}

TopBar.propTypes = {
    leftIcon: PropTypes.element,
    children: PropTypes.string,
    rightIcon: PropTypes.element,
};

export default TopBar;

const styles = StyleSheet.create({
    topBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    capsle: {
        backgroundColor: theme.colors[100],
        paddingHorizontal: 32,
        paddingVertical: 8,
        borderRadius: 99999,
    },
});
