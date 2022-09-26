import { Svg, Path } from "react-native-svg";
import { iconDefaultProps, iconPropTypes } from "../../../utils/constants";

function Search({ size, color }) {
    return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
            <Path
                strokeWidth={2}
                stroke={color}
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
        </Svg>
    );
}

Search.defaultProps = iconDefaultProps;

Search.propTypes = iconPropTypes;

export default Search;
