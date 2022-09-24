import Svg, { Rect } from "react-native-svg";
import { iconDefaultProps, iconPropTypes } from "../../../utils/constants";

function Plus({ size, color }) {
    return (
        <Svg width={size} height={size} viewBox="0 0 306 306">
            <Rect y="134" width="306" height="38" rx="19" fill={color} />
            <Rect
                x="172"
                width="306"
                height="38"
                rx="19"
                transform="rotate(90 172 0)"
                fill={color}
            />
        </Svg>
    );
}

Plus.defaultProps = iconDefaultProps;

Plus.propTypes = iconPropTypes;

export default Plus;
