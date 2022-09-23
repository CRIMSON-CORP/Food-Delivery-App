import Svg, { Path } from "react-native-svg";
import { iconDefaultProps, iconPropTypes } from "../../../utils/constants";

function Star({ size, color }) {
    return (
        <Svg width={size} height={size} viewBox="0 0 536 512">
            <Path
                d="M239.3 17.8L174 150.2L27.9 171.5C1.69999 175.3 -8.80001 207.6 10.2 226.1L115.9 329.1L90.9 474.6C86.4 500.9 114.1 520.6 137.3 508.3L268 439.6L398.7 508.3C421.9 520.5 449.6 500.9 445.1 474.6L420.1 329.1L525.8 226.1C544.8 207.6 534.3 175.3 508.1 171.5L362 150.2L296.7 17.8C285 -5.8 251.1 -6.1 239.3 17.8Z"
                fill={color}
            />
        </Svg>
    );
}

Star.defaultProps = iconDefaultProps;

Star.propTypes = iconPropTypes;

export default Star;
