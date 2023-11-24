import React, { useMemo } from "react";
import { View, FlatList, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Constant } from "../Constant";
import { ProductItem } from "../components/General";
import Header from "../components/Header";

const Wishlist = ({ navigation }) => {

    const WISHLIST = useSelector((state) => state.wishlist.productList);

    const dispatch = useDispatch();

    const renderItem = ({ item, index }) => {
        return (
            <>
                <ProductItem item={item} dispatch={dispatch} navigation={navigation} disableAnimation={true} />
            </>
        );
    }

    const memoRender = useMemo(() => renderItem, []);

    return (
        <View style={{ flex: 1, backgroundColor: Constant.bg_color }}>
            <Header
                navigation={navigation}
                showBack={false}
                showTitle={true}
                showCart={true}
                title={'Wishlist'}
                isWhite={false}
                showShoppingLabel={false}
                borderColor={Constant.bg_color}
            />
            {WISHLIST.length > 0 ?
                <FlatList
                    data={WISHLIST}
                    numColumns={2}
                    contentContainerStyle={{ justifyContent: 'center', alignItems: 'flex-start' }}
                    renderItem={memoRender}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(_, index) => index.toString()}
                    ListFooterComponentStyle={{ height: 100, width: '100%', justifyContent: 'flex-start', alignItems: 'center' }}
                    ListFooterComponent={() => (
                        <>
                        </>
                    )}
                />
                :
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{fontFamily:Constant.manrope, fontSize:30, fontWeight:'400', letterSpacing:0.5, color:Constant.bright_grey}}>Wishlist is empty</Text>
                </View>
            }
        </View>
    );

}

export default Wishlist;