import Svg, { Path } from "react-native-svg";
import { iconDefaultProps, iconPropTypes } from "../../../utils/constants";

function LeftArrow({ size, color }) {
    return (
        <Svg width={size} height={size} viewBox="0 0 294 294">
            <Path
                d="M133.219 68.9062L50.5312 151.594M50.5312 151.594L133.219 234.281M50.5312 151.594H225.469"
                stroke={color}
                strokeWidth="23"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
}

LeftArrow.defaultProps = iconDefaultProps;

LeftArrow.propTypes = iconPropTypes;

export default LeftArrow;
