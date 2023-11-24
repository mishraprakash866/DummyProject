import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Header from "../components/Header";
import { Constant } from "../Constant";
import { CartChildItem } from "../components/General";

const Cart = ({ navigation }) => {

    const CART = useSelector((state) => state.cart.productList);

    const dispatch = useDispatch();

    const [subtotal, setSubtotal] = useState(CART?.reduce(
        (acc, vale) => (acc += (vale.price * vale.qty)),
        0,
    ));

    useEffect(() => {
        setSubtotal(CART?.reduce(
            (acc, vale) => (acc += (vale.price * vale.qty)),
            0,
        ));
    }, [CART])

    const MemoChildItem = useCallback(({item, index}) => (
        <CartChildItem item={item} index={index} dispatch={dispatch} navigation={navigation} />
    ), []);

    return (
        <View style={{ flex: 1, backgroundColor: Constant.bg_color }}>
            <Header
                navigation={navigation}
                showBack={true}
                showTitle={false}
                showCart={false}
                isWhite={false}
                showShoppingLabel={true}
                borderColor={Constant.bg_color}
            />
            {CART.length > 0 ?
            <>
                <View style={{ flex: 0.63, paddingHorizontal: 15 }}>
                    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                        <View style={{paddingBottom:10}}>
                            {CART.map((ele, index) => (
                                <View key={index.toString()} style={{width:'100%', height:100, borderBottomWidth:(CART.length == (index+1)) ? 0 : 1, borderColor:Constant.bright_grey}}>
                                    <MemoChildItem item={ele} index={index} />
                                </View>
                            ))}
                        </View>
                    </ScrollView>
                </View>
                <View style={{ flex: 0.37, paddingHorizontal: 15, paddingTop: 5, paddingBottom: 15 }}>
                    <View style={{ backgroundColor: Constant.ghost_white, position: 'relative', borderRadius: 30, flex: 1, elevation: 1, paddingHorizontal: 20, paddingVertical: 20 }}>
                        <View style={{ paddingHorizontal: 15, paddingTop: 10 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 4 }}>
                                <Text style={{ color: '#616A7D', fontSize: 16, fontFamily: Constant.manrope, fontWeight: '400' }}>Subtotal</Text>
                                <Text style={{ color: Constant.dark_gunmetal, fontSize: 16, fontFamily: Constant.manrope, fontWeight: '700' }}>$ {subtotal.toFixed(2)}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 4 }}>
                                <Text style={{ color: '#616A7D', fontSize: 16, fontFamily: Constant.manrope, fontWeight: '400' }}>Delivery</Text>
                                <Text style={{ color: Constant.dark_gunmetal, fontSize: 16, fontFamily: Constant.manrope, fontWeight: '700' }}>$ 2.00</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 4 }}>
                                <Text style={{ color: '#616A7D', fontSize: 16, fontFamily: Constant.manrope, fontWeight: '400' }}>Subtotal</Text>
                                <Text style={{ color: Constant.dark_gunmetal, fontSize: 16, fontFamily: Constant.manrope, fontWeight: '700' }}>$ {(subtotal + 2).toFixed(2)}</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={{ position: 'absolute', width: '100%', height: 60, borderRadius: 20, backgroundColor: Constant.cyan_cobalt_blue, bottom: 20, alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontFamily: Constant.manrope, fontSize: 16, fontWeight: '600', color: Constant.ghost_white }}>Proceed To Checkout</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </>
            :
                <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                    <Text style={{fontFamily:Constant.manrope, fontSize:30, fontWeight:'400', letterSpacing:0.5, color:Constant.bright_grey}}>Cart is empty</Text>
                </View>
            }
        </View>
    );

}

export default Cart;