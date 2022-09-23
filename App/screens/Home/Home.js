import { View, StyleSheet, Image, FlatList } from "react-native";
import PropTypes from "prop-types";
import { SafeAreaView } from "react-native-safe-area-context";
import data from "../../../utils/data";
import { TopBar } from "../../components";
import { Location } from "../../components/Icons";
import Cart from "../../components/Icons/Cart";
import { Text } from "../../components/ui";
import { Shadow } from "react-native-shadow-2";
// import Carousel from "react-native-reanimated-carousel";

const CATEGORY_ITEM_WIDTH = 80;
const CATEGORY_ITEM_HEIGHT = 120;

function Home() {
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
                    {/* <Carousel
                        loop={false}
                        pagingEnabled
                        data={data.categories}
                        width={CATEGORY_ITEM_WIDTH + 20}
                        height={CATEGORY_ITEM_HEIGHT}
                        scrollAnimationDuration={500}
                        style={{
                            overflow: "visible",
                            width: 360,
                        }}
                        renderItem={({ item }) => <CategoryItem {...item} />}
                    /> */}
                </View>
            </SafeAreaView>
        </View>
    );
}

export default Home;

function CategoryItem({ slug, icon, label }) {
    return (
        <Shadow distance={15} startColor="#eeeeee" endColor="#FFFFFF00" offset={[3, 4]}>
            <View style={styles.categoryItem}>
                <Image source={icon} style={styles.categoryIcon} />
                <Text>{label}</Text>
            </View>
        </Shadow>
    );
}

CategoryItem.propTypes = {
    slug: PropTypes.string,
    icon: PropTypes.number,
    label: PropTypes.string,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
    },
    SafeAreaView: {
        flex: 1,
    },
    topbarWrapper: {
        // marginBottom: 30,
    },
    mainHeader: {
        marginVertical: 30,
    },
    mainHeaderText: {
        lineHeight: 36,
    },
    categoryFlatList: {
        width: 360,
        overflow: "visible",
    },
    categoryItem: {
        width: CATEGORY_ITEM_WIDTH,
        height: CATEGORY_ITEM_HEIGHT,
        backgroundColor: "#FFFFFF",
        borderRadius: 9999,
        marginRight: 20,
    },
    categoryIcon: {
        width: 40,
        height: 40,
    },
});
