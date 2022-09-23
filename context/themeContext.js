import { createContext, useContext } from "react";
import { childrenPropType } from "../utils/constants";
import theme from "../utils/theme";

const themeContext = createContext();

export function useTheme() {
    return useContext(themeContext);
}

function ThemeProvider({ children }) {
    return <themeContext.Provider value={theme}>{children}</themeContext.Provider>;
}

ThemeProvider.propTypes = childrenPropType;

export default ThemeProvider;
