import Svg, { Path } from "react-native-svg";
import { iconDefaultProps, iconPropTypes } from "../../../utils/constants";

function LocationMarker({ size, color }) {
    return (
        <Svg width={size} height={size} viewBox="0 0 117 150">
            <Path
                fill={color}
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.199951 58.3C0.199951 26.193 26.2929 0.1 58.3999 0.1C90.5069 0.1 116.6 26.193 116.6 58.3C116.6 77.894 105.251 94.287 92.059 105.733C91.5293 106.189 90.9495 106.679 90.3277 107.205C86.0527 110.819 79.7876 116.117 74.1139 123.484C66.9359 132.893 60.4369 142.981 58.3999 149.771C56.3629 142.981 49.864 132.893 42.686 123.484C37.0123 116.117 30.7472 110.819 26.4722 107.205C25.8504 106.679 25.2706 106.189 24.741 105.733C11.549 94.287 0.199951 77.894 0.199951 58.3ZM82 58C82 70.7025 71.7025 81 59 81C46.2975 81 36 70.7025 36 58C36 45.2974 46.2975 35 59 35C71.7025 35 82 45.2974 82 58Z"
            />
        </Svg>
    );
}

LocationMarker.defaultProps = iconDefaultProps;

LocationMarker.propTypes = iconPropTypes;

export default LocationMarker;
