import React, { useState, useEffect } from "react";
import { Image, Text, View, TouchableOpacity, Pressable, Vibration } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import FastImage from "react-native-fast-image";
import { useSelector } from "react-redux";
import Animated, { useSharedValue, withTiming, useAnimatedStyle } from 'react-native-reanimated';
import { addProductToCart, removeProductFromCart, updateCartProductQuantity } from "../redux/reducer/cartReducer";
import { addProduct, removeProduct } from "../redux/reducer/wishlistReducer";
import { Constant } from "../Constant";
import { useDebounce } from "../debounce";

export const Banner = ({ bgColor }) => {
    return (
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: bgColor }}>
            <View style={{ width: '40%', height: '100%', paddingHorizontal: 5, justifyContent: 'center', alignItems: 'flex-end' }}>
                <Image source={Constant.emptyImg} style={{ width: 80, height: 80, tintColor: Constant.ghost_white }} resizeMode="contain" />
            </View>
            <View style={{ width: '48%', height: '100%', justifyContent: 'center', alignItems: 'flex-start' }}>
                <Text style={{ fontFamily: Constant.manrope, fontSize: 22, fontWeight: '300', color: Constant.ghost_white }}>Get</Text>
                <Text style={{ fontFamily: Constant.manrope, fontSize: 28, fontWeight: '800', color: Constant.ghost_white }}>50% OFF</Text>
                <Text style={{ fontFamily: Constant.manrope, fontSize: 15, fontWeight: '500', color: Constant.ghost_white }}>On first 03 order</Text>
            </View>
        </View>
    );
}

export const ProductItem = ({ item, dispatch, navigation, disableAnimation }) => {

    const { debounce } = useDebounce();

    const CART = useSelector((state) => state.cart.productList);
    const WISHLIST = useSelector((state) => state.wishlist.productList);

    const [isLike, setLiked] = useState(false);
    const [isCart, setCart] = useState(false);

    const scaleVal = useSharedValue((disableAnimation == undefined) ? 0 : 1);
    const opacity = useSharedValue((disableAnimation == undefined) ? 0 : 1);

    const animeStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scaleVal.value }],
            opacity: opacity.value
        }
    });

    useEffect(() => {
        setCart(CART?.find((ele) => ele.id === item.id));
    }, [CART])

    useEffect(() => {
        setLiked(WISHLIST?.find((ele) => ele.id === item.id));
    }, [WISHLIST])

    useEffect(() => {
        if (disableAnimation == undefined) {
            setTimeout(() => {
                scaleVal.value = withTiming(1);
                opacity.value = withTiming(1);
            }, (100 * item.index));
        }
    }, [])

    const handleLikeEvent = () => {
        Vibration.vibrate(Constant.vibratePattern, false);
        setLiked(prev => {
            if (prev) {
                dispatch(removeProduct(item));
                return false;
            } else {
                dispatch(addProduct(item));
                return true;
            }
        });
    }

    const handleAddCartEvent = () => {
        Vibration.vibrate(Constant.vibratePattern, false);
        setCart(prev => {
            if (prev) {
                dispatch(removeProductFromCart(item));
                return false;
            } else {
                dispatch(addProductToCart({ ...item, qty: 1 }));
                return true;
            }
        })
    }

    const navigationEvent = () => {
        debounce(() =>
            navigation.push('ProductDetail', { item: item })
        );
    }

    return (
        <>
            <Animated.View style={[animeStyle, { width: (Constant.d_Width / 2) - 22.5, height: 200, borderWidth: 1, borderColor: Constant.bright_grey, overflow: 'hidden', backgroundColor: Constant.ghost_white, justifyContent: 'flex-start', alignItems: 'center', borderRadius: 13, marginHorizontal: 7.5, marginVertical: 7.5 }]}>
                <View style={{ width: '100%', height: '70%', position: 'relative', justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity onPress={handleLikeEvent} style={{ width: 40, height: 40, position: 'absolute', top: 0, justifyContent: 'center', alignItems: 'center', left: 0, zIndex: 2 }}>
                        <View style={{ width: 26, height: 26, backgroundColor: Constant.ghost_white, borderWidth: 1, borderColor: Constant.bright_grey, borderRadius: 25, justifyContent: 'center', alignItems: 'center' }}>
                            <AntDesign name={(isLike) ? "heart" : "hearto"} color={(isLike) ? 'red' : Constant.dark_gunmetal} size={16} />
                        </View>
                    </TouchableOpacity>
                    <Pressable style={{ width: '100%', height: '100%', position: 'absolute', zIndex: 1 }} onPress={navigationEvent} />
                    <FastImage
                        source={{ uri: item.thumbnail }}
                        resizeMode="cover"
                        style={{ width: '100%', height: '100%' }}
                    />
                </View>
                <View style={{ width: '100%', height: '30%', justifyContent: 'center' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15, position: 'relative' }}>
                        <View>
                            <Text style={{ fontFamily: Constant.manrope, fontSize: 16, fontWeight: '800', color: Constant.dark_gunmetal }}>${item.price}</Text>
                        </View>
                        <View style={{ width: 25, height: 25 }}>
                            <TouchableOpacity onPress={handleAddCartEvent} style={{ width: 25, height: 25, position: 'absolute', zIndex: 3, borderRadius: 25, backgroundColor: Constant.cyan_cobalt_blue, justifyContent: 'center', alignItems: 'center' }}>
                                <AntDesign name={(!isCart) ? "plus" : "minus"} color={Constant.ghost_white} size={15} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Pressable onPress={navigationEvent} style={{ width: '100%', height: '100%', position: 'absolute' }} />
                    <View style={{ paddingHorizontal: 15 }}>
                        <Text numberOfLines={1} style={{ textTransform: 'capitalize', fontFamily: Constant.manrope, fontSize: 13, fontWeight: '400', color: '#616A7D' }}>{item.title}</Text>
                    </View>
                </View>
            </Animated.View>
        </>
    );
}

export const CartChildItem = ({ item, index, dispatch, navigation }) => {

    const [qty, setQty] = useState(item.qty);

    const { debounce } = useDebounce();

    const handleQtyUpdate = (type) => {
        switch (type) {
            case 'plus':
                setQty(prev => {
                    dispatch(updateCartProductQuantity({ id: item.id, qty: prev + 1 }));
                    return prev + 1;
                });
                break;

            case 'minus':
                setQty(prev => {
                    if ((prev - 1) == 1) {
                        dispatch(updateCartProductQuantity({ id: item.id, qty: prev - 1 }));
                        return prev - 1;
                    } else {
                        dispatch(removeProductFromCart(item));
                    }
                });
                break;

            default:
                break;
        }
    }

    const navigationEvent = () => {
        debounce(() =>
            navigation.push('ProductDetail', { item: item })
        );
    }

    return (
        <>
            <View style={{ flex: 1, paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Pressable onPress={navigationEvent} style={{ width: '60%', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <FastImage
                        source={{ uri: item.thumbnail }}
                        resizeMode="cover"
                        style={{ width: 30, height: 30, borderRadius: 10, borderWidth: 1, borderColor: Constant.bright_grey }}
                    />
                    <View style={{ flex: 1, paddingVertical: 5, marginLeft: 20 }}>
                        <Text numberOfLines={1} style={{ fontFamily: Constant.manrope, lineHeight: 25, fontSize: 15, fontWeight: '600', color: Constant.dark_gunmetal }}>{item.title}</Text>
                        <Text style={{ fontFamily: Constant.manrope, lineHeight: 25, fontSize: 15, fontWeight: '600', color: Constant.dark_gunmetal, opacity: 0.6 }}>$ {item.price}</Text>
                    </View>
                </Pressable>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => handleQtyUpdate('minus')} style={{ width: 33, height: 33, backgroundColor: Constant.bright_grey, borderRadius: 25, justifyContent: 'center', alignItems: 'center' }}>
                        <AntDesign name="minus" color={Constant.dark_gunmetal} size={15} />
                    </TouchableOpacity>
                    <Text style={{ fontFamily: Constant.manrope, fontSize: 15, fontWeight: '600', color: Constant.dark_gunmetal, paddingHorizontal: 10 }}>{qty}</Text>
                    <TouchableOpacity onPress={() => handleQtyUpdate('plus')} style={{ width: 33, height: 33, backgroundColor: Constant.bright_grey, borderRadius: 25, justifyContent: 'center', alignItems: 'center' }}>
                        <AntDesign name="plus" color={Constant.dark_gunmetal} size={15} />
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
}