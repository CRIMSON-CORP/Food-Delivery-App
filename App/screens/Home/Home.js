import { View, StyleSheet, Image, FlatList } from "react-native";
import PropTypes from "prop-types";
import { SafeAreaView } from "react-native-safe-area-context";
import data from "../../../utils/data";
import { TopBar } from "../../components";
import { Location } from "../../components/Icons";
import Cart from "../../components/Icons/Cart";
import { Center, Text } from "../../components/ui";
import { Shadow } from "react-native-shadow-2";
import theme from "../../../utils/theme";
import { useState } from "react";

const CATEGORY_ITEM_WIDTH = 60;
const CATEGORY_ITEM_HEIGHT = 90;

function Home() {
    const [selectedCategory, setSelectedCategory] = useState("hot-dogs");
    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.container}>
                <View style={styles.topbarWrapper}>
                    <TopBar leftIcon={<Location />} rightIcon={<Cart />}>
                        {data.location}
                    </TopBar>
                </View>
                <View>
                    <View style={styles.mainHeader}>
                        <Text styles={styles.mainHeaderText} size={32} weight={500}>
                            Main
                        </Text>
                        <Text size={32} weight={500} styles={styles.mainHeaderText}>
                            Categories
                        </Text>
                    </View>
                    <FlatList
                        pagingEnabled
                        data={data.categories}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        snapToInterval={CATEGORY_ITEM_WIDTH + 20}
                        style={styles.categoryFlatList}
                        renderItem={({ item, index }) => <CategoryItem {...item} index={index} />}
                    />
                </View>
            </SafeAreaView>
        </View>
    );
}

export default Home;

function CategoryItem({ slug, icon, label, index }) {
    return (
        <View style={styles.categoryItemWrapper}>
            <Shadow distance={15} startColor="#F0F0F0" endColor="#FFFFFF00" offset={[0, 8]}>
                <View style={styles.categoryItem}>
                    <Center style={styles.iconWrapper}>
                        <Image source={icon} style={styles.categoryIcon} />
                    </Center>
                    <Text style={styles.categoryLabel} size={12} weight={500}>
                        {label}
                    </Text>
                </View>
            </Shadow>
        </View>
    );
}

function Indicator() {
    return (
        <View
            style={{
                width: CATEGORY_ITEM_WIDTH + 3,
                height: CATEGORY_ITEM_HEIGHT + 3,
                borderWidth: 3,
                borderColor: theme.colors.primary,
                borderRadius: 9999,
                alignItems: "center",
                position: "absolute",
                top: 10,
                left: 8,
                zIndex: 20,
                // transform: [{ translateX: 50 }],
            }}
        />
    );
}

CategoryItem.propTypes = {
    slug: PropTypes.string,
    icon: PropTypes.number,
    label: PropTypes.string,
    index: PropTypes.number,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: "#FFFFFF",
    },
    SafeAreaView: {
        flex: 1,
    },
    topbarWrapper: {
        // marginBottom: 30,
    },
    mainHeader: {
        marginVertical: 30,
        marginBottom: 10,
    },
    mainHeaderText: {
        lineHeight: 36,
    },
    categoryFlatList: {
        overflow: "visible",
        marginLeft: -10,
        position: "relative",
    },
    categoryItemWrapper: { padding: 10, paddingTop: 10, paddingBottom: 40, paddingRight: 10 },
    categoryItem: {
        width: CATEGORY_ITEM_WIDTH,
        height: CATEGORY_ITEM_HEIGHT,
        backgroundColor: "#FFFFFF",
        borderRadius: 9999,
        alignItems: "center",
        padding: 5,
        position: "relative",
    },
    iconWrapper: {
        backgroundColor: theme.colors[100],
        padding: 5,
        borderRadius: 9999,
        width: 45,
        height: 45,
        margin: 0,
        marginBottom: 5,
    },
    categoryIcon: {
        width: 20,
        height: 20,
    },
    categoryLabel: {},
});
