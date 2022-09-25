import { Svg, Path, Circle, Defs, LinearGradient, RadialGradient, Stop } from "react-native-svg";
import { iconDefaultProps, iconPropTypes } from "../../../utils/constants";

function PushPIn({ size }) {
    return (
        <Svg width={size} height={size} viewBox="0 0 143 324">
            <Path
                d="M56.9419 113.923C56.9419 113.414 57.3544 113.001 57.8633 113.001H85.1365C85.6454 113.001 86.0579 113.414 86.0579 113.923V309.442C86.0579 317.482 79.54 324 71.4999 324V324C63.4597 324 56.9419 317.482 56.9419 309.442V113.923Z"
                fill="url(#paint0_linear_88_11)"
            />
            <Circle cx="71.5" cy="71.7229" r="71.5" fill="url(#paint1_radial_88_11)" />
            <Circle
                style="mix-blend-mode:screen"
                cx="84.9524"
                cy="67.1211"
                r="46.0696"
                fill="url(#paint2_radial_88_11)"
            />
            <Defs>
                <LinearGradient
                    id="paint0_linear_88_11"
                    x1="50.8607"
                    y1="178.236"
                    x2="93.2447"
                    y2="178.236"
                    gradientUnits="userSpaceOnUse"
                >
                    <Stop stopColor="#0E0500" />
                    <Stop offset="0.609375" stopColor="#772B00" />
                    <Stop offset="1" />
                </LinearGradient>
                <RadialGradient
                    id="paint1_radial_88_11"
                    cx="0"
                    cy="0"
                    r="1"
                    gradientUnits="userSpaceOnUse"
                    gradientTransform="translate(71.5 71.7229) rotate(90) scale(71.5)"
                >
                    <Stop stopColor="#F92F2F" />
                    <Stop offset="1" stopColor="#9C0404" />
                </RadialGradient>
                <RadialGradient
                    id="paint2_radial_88_11"
                    cx="0"
                    cy="0"
                    r="1"
                    gradientUnits="userSpaceOnUse"
                    gradientTransform="translate(84.9524 67.1211) rotate(90) scale(46.0696)"
                >
                    <Stop stopColor="#E8E8E8" stopOpacity="0.58" />
                    <Stop offset="1" stopColor="#CA1919" stopOpacity="0" />
                </RadialGradient>
            </Defs>
        </Svg>
    );
}

PushPIn.defaultProps = iconDefaultProps;

PushPIn.propTypes = iconPropTypes;

export default PushPIn;
