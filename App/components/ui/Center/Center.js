import { useMemo } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import { childrenPropType } from "../../../../utils/constants";

/**
 * @typedef CenterProps
 * @property {JSX.Element | Array<JSX.Element>} children
 * @property {number} flex
 * @property {CSSStyleDeclaration} style
 */

/**
 *
 * @param {CenterProps} CenterProps
 * @returns {JSX.Element}
 */

function Center({ children, flex, style, ...props }) {
    const styles = useMemo(
        () => ({
            flex,
            justifyContent: "center",
            alignItems: "center",
            ...style,
        }),
        [flex, style]
    );
    return (
        <View style={styles} {...props}>
            {children}
        </View>
    );
}

Center.propTypes = { ...childrenPropType, flex: PropTypes.number };

export default Center;
