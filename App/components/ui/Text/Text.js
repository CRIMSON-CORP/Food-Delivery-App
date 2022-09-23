import { useMemo } from "react";
import PropTypes from "prop-types";
import { Text as RNText } from "react-native";
import theme from "../../../../utils/theme";

function Text({ children, size, weight, styles: customStyles }) {
    const styles = useMemo(
        () => ({
            fontSize: size,
            fontFamily: theme.fontWeight[weight],
            ...customStyles,
        }),
        [size, weight, customStyles]
    );

    return <RNText style={styles}>{children}</RNText>;
}

Text.defaultProps = {
    size: 16,
    weight: 400,
};

Text.propTypes = {
    size: PropTypes.number,
    weight: PropTypes.number,
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    styles: PropTypes.object,
};

export default Text;
