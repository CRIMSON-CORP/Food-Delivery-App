import Svg, { Circle } from "react-native-svg";
import { iconDefaultProps, iconPropTypes } from "../../../utils/constants";

function MasterCard({ size, color }) {
    return (
        <Svg width={size} height={size} viewBox="0 0 198 123">
            <Circle cx="136.5" cy="61.5" r="57" stroke={color} strokeWidth={9} />
            <Circle cx="61.5" cy="61.5" r="61.5" fill={color} />
        </Svg>
    );
}

MasterCard.defaultProps = iconDefaultProps;

MasterCard.propTypes = iconPropTypes;

export default MasterCard;
