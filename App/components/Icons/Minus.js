import Svg, { Rect } from "react-native-svg";
import { iconDefaultProps, iconPropTypes } from "../../../utils/constants";

function Minus({ size, color }) {
    return (
        <Svg width={size} height={size} viewBox="0 0 306 38">
            <Rect width="306" height="38" rx="19" fill={color} />
        </Svg>
    );
}

Minus.defaultProps = iconDefaultProps;

Minus.propTypes = iconPropTypes;

export default Minus;
