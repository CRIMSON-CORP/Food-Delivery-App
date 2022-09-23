import { createContext, useContext } from "react";
import { createNavigationContainerRef, NavigationContainer } from "@react-navigation/native";
import { childrenPropType } from "../utils/constants";

const navigationContext = createContext();

export function useNavigation() {
    return useContext(navigationContext);
}

function NavigationProvider({ children }) {
    const navigationRef = createNavigationContainerRef();
    return (
        <NavigationContainer ref={navigationRef}>
            <navigationContext.Provider value={navigationRef}>
                {children}
            </navigationContext.Provider>
        </NavigationContainer>
    );
}

NavigationProvider.propTypes = childrenPropType;

export default NavigationProvider;
