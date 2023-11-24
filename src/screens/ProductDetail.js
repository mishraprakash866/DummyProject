import React, { useState } from "react";
import { Image, ScrollView, Text, View, TouchableOpacity, Vibration } from "react-native";
import FastImage from "react-native-fast-image";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useDispatch, useSelector } from "react-redux";
import { removeProductFromCart, addProductToCart } from "../redux/reducer/cartReducer";
import { addProduct, removeProduct } from "../redux/reducer/wishlistReducer";
import Header from "../components/Header";
import RatingStars from "../components/RatingStar";
import { Constant } from "../Constant";

const ProductDetail = ({ navigation, route }) => {

    const { item } = route.params;
    const dispatch = useDispatch();

    const CART = useSelector((state) => state.cart.productList);
    const WISHLIST = useSelector((state) => state.wishlist.productList);

    const cartToggle = CART?.find((ele) => ele.id === item.id);
    const likeToggle = WISHLIST?.find((ele) => ele.id === item.id);

    const [isLike, setLiked] = useState(likeToggle);
    const [isCart, setCart] = useState(cartToggle);

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

    return (
        <View style={{ flex: 1, backgroundColor: Constant.bg_color }}>
            <Header
                navigation={navigation}
                showBack={true}
                showTitle={false}
                showCart={true}
                isWhite={false}
                showShoppingLabel={false}
                borderColor={Constant.bg_color}
            />
            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                <View style={{ paddingHorizontal: 15 }}>
                    <Text style={{ fontFamily: Constant.manrope, textTransform: 'capitalize', fontSize: 50, fontWeight: '300', color: Constant.dark_gunmetal }}>{item.title}</Text>
                </View>
                <View style={{ paddingHorizontal: 15, paddingTop: 15, paddingBottom: 30 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <RatingStars rating={item.rating} />
                        <View style={{ paddingLeft: 6 }}>
                            <Text style={{ fontSize: 16, fontFamily: Constant.manrope, color: '#A1A1AB', fontWeight: '400' }}>110 Reviews</Text>
                        </View>
                    </View>
                </View>
                <View style={{ width: '100%', height: 250, backgroundColor: Constant.ghost_white, position: 'relative', justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity onPress={handleLikeEvent} style={{ width: 55, height: 55, position: 'absolute', top: 15, justifyContent: 'center', alignItems: 'center', right: 15, zIndex: 2 }}>
                        <View style={{ width: 55, height: 55, backgroundColor: Constant.ghost_white, borderWidth: 1, borderColor: Constant.bright_grey, borderRadius: 50, justifyContent: 'center', alignItems: 'center' }}>
                            <AntDesign name={(isLike) ? "heart" : "hearto"} color={(isLike) ? 'red' : Constant.dark_gunmetal} size={20} />
                        </View>
                    </TouchableOpacity>
                    {(item.images && item.images.length > 0) ?
                        <ScrollView pagingEnabled={true} horizontal={true} showsHorizontalScrollIndicator={false} style={{ flex: 1, flexDirection: 'row' }}>
                            {item.images?.map((img, index) => (
                                <FastImage
                                    key={index.toString()}
                                    source={{ uri: img }}
                                    style={{ width: Constant.d_Width, height: 250 }}
                                    resizeMode="contain"
                                />
                            ))}
                        </ScrollView>
                        :
                        <Image source={Constant.emptyImg} resizeMethod="resize" resizeMode="contain" style={{ width: 80, height: 80 }} />
                    }
                </View>
                <View style={{ paddingHorizontal: 15, paddingTop: 34, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <View>
                        <Text style={{ fontFamily: Constant.manrope, fontSize: 22, color: Constant.cyan_cobalt_blue, fontWeight: '600' }}>$ {item.price}</Text>
                    </View>
                    <View style={{ marginHorizontal: 7 }} />
                    <View style={{ backgroundColor: Constant.cyan_cobalt_blue, borderRadius: 100, paddingHorizontal: 17, height: 25, justifyContent: 'center' }}>
                        <Text style={{ fontFamily: Constant.manrope, fontSize: 15, color: Constant.ghost_white, fontWeight: '600' }}>$ {item.discountPercentage} OFF</Text>
                    </View>
                </View>
                <View style={{ flex: 1, paddingTop: 25, paddingBottom: 10, flexDirection: 'row', paddingHorizontal: 15, justifyContent: 'space-between', alignItems: 'center' }}>
                    <TouchableOpacity onPress={handleAddCartEvent} style={{ width: '46%', height: 60, backgroundColor: (isCart) ? Constant.cyan_cobalt_blue : Constant.bg_color, borderWidth: 2, borderColor: Constant.cyan_cobalt_blue, borderRadius: 15, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontFamily: Constant.manrope, fontSize: 16, fontWeight: '600', color: (isCart) ? Constant.ghost_white : Constant.cyan_cobalt_blue }}>{(isCart) ? 'Remove Cart' : 'Add To Cart'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ width: '46%', height: 60, borderWidth: 2, backgroundColor: Constant.cyan_cobalt_blue, borderColor: Constant.cyan_cobalt_blue, borderRadius: 15, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontFamily: Constant.manrope, fontSize: 16, fontWeight: '600', color: Constant.ghost_white }}>Buy Now</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ paddingHorizontal: 15, paddingBottom: 20, paddingTop: 10 }}>
                    <Text style={{ fontSize: 18, fontFamily: Constant.manrope, fontWeight: '600', color: Constant.dark_gunmetal }}>Details</Text>
                    <View style={{ paddingTop: 10 }}>
                        <Text style={{ fontFamily: Constant.manrope, fontSize: 18, fontWeight: '400', color: '#8891A5' }}>{item.description}</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    );

}

export default ProductDetail;