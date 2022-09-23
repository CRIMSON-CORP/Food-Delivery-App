import { ScrollView, View, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { SafeAreaView } from "react-native-safe-area-context";
import theme from "../../../utils/theme";
import { TopBar } from "../../components";
import { LeftArrow, List } from "../../components/Icons";
import { Text } from "../../components/ui";
import data from "../../../utils/data";

function OrderScreen({ route }) {
    const selectedRestaurantId = route.params.id;
    const { name } = data.restaurant.find((restaurant) => restaurant.id === selectedRestaurantId);
    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.container}>
                <TopBar leftIcon={<LeftArrow />} rightIcon={<List />}>
                    {name}
                </TopBar>
                <View style={styles.SafeAreaView}>
                    <View style={styles.mainHeader}>
                        <Text styles={styles.mainHeaderText} size={32} weight={500}>
                            Main
                        </Text>
                        <Text size={32} weight={500} styles={styles.mainHeaderText}>
                            Categories
                        </Text>
                    </View>
                    <View></View>
                    <ScrollView
                        style={styles.restaurantScrollView}
                        showsVerticalScrollIndicator={false}
                    ></ScrollView>
                </View>
            </SafeAreaView>
        </View>
    );
}

export default OrderScreen;

OrderScreen.propTypes = {
    route: PropTypes.object,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors[50],
    },
    SafeAreaView: {
        flex: 1,
    },
});
