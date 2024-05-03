import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

const Star = (props: SvgProps) => <Svg width={24} height={24} fill="yellow" viewBox="0 0 24 24" {...props}><Path stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4.75L13.75 10.25H19.25L14.75 13.75L16.25 19.25L12 15.75L7.75 19.25L9.25 13.75L4.75 10.25H10.25L12 4.75Z" /></Svg>;

export default Star;