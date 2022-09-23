import { Children } from "react";
import PropTypes from "prop-types";
import { childrenPropType } from "../../../../utils/constants";
import { View, StyleSheet } from "react-native";

function HStack({ children, space }) {
    return (
        <View style={styles.container}>
            {Children.toArray(children).map((child, index, list) => {
                return (
                    <View key={index} style={{ marginRight: index === list.length ? 0 : space }}>
                        {child}
                    </View>
                );
            })}
        </View>
    );
}

HStack.defaultProps = {
    space: 0,
};

HStack.propTypes = {
    ...childrenPropType,
    space: PropTypes.number,
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
    },
});

export default HStack;
