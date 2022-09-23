import PropTypes from "prop-types";

export const childrenPropType = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element]),
};

export const iconPropTypes = {
    size: PropTypes.number,
    color: PropTypes.string,
};

export const iconDefaultProps = {
    size: 20,
    color: "#000000",
};
