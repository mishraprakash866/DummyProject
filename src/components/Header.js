import React from 'react';
import { Image, View, TouchableOpacity, Text } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useSelector } from 'react-redux';
import { Constant } from '../Constant';

const Header = ({
    navigation,
    showBack,
    showTitle,
    title,
    showShoppingLabel,
    showCart,
    isWhite,
    borderColor
}) => {

    const COLOR = isWhite ? Constant.bg_color : Constant.dark_gunmetal;
    const CART = useSelector((state) => state.cart.productList);

    return (
        <>
            <View
                style={{
                    width: '100%',
                    height: 50,
                    marginVertical: 15,
                    paddingHorizontal: 15,
                }}>
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                    {showTitle &&
                        <View style={{ flex: 1 }}>
                            <Text style={{ color: COLOR, fontFamily: Constant.manrope, fontSize: 22, fontWeight: '600' }}>{(title) ? title : 'Hey, Rahul'}</Text>
                        </View>
                    }
                    {showBack &&
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                            <TouchableOpacity
                                onPress={() => {
                                    if (navigation.canGoBack()) {
                                        navigation.goBack();
                                    }
                                }}
                                style={{
                                    width: 25,
                                    elevation: 1,
                                    height: 25,
                                    backgroundColor: Constant.ghost_white,
                                    paddingRight: 2,
                                    borderRadius: 25,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                <AntDesign name="left" color={COLOR} size={10} />
                            </TouchableOpacity>
                            {showShoppingLabel &&
                                <Text style={{ fontFamily: Constant.manrope, fontSize: 17, fontWeight: '500', color: Constant.dark_gunmetal, paddingLeft: 20 }}>Shopping Cart {`(${CART.length})`}</Text>
                            }
                        </View>
                    }
                    {showCart &&
                        <TouchableOpacity
                            onPress={() => navigation.push('Cart')}
                            style={{ width: 100, height: 20, position: 'relative', alignItems: 'flex-end' }}>
                            <Image
                                source={Constant.bagImg}
                                resizeMode="contain"
                                style={{ width: 25, height: 25, tintColor: COLOR }}
                            />
                            {(CART.length > 0) &&
                                <View style={{ position: 'absolute', backgroundColor: Constant.bright_yellow, right: -8, top: -8, minWidth: 25, maxWidth: 100, borderWidth: 2, borderColor: borderColor, paddingVertical: 2, borderRadius: 20 }}>
                                    <Text
                                        style={{
                                            textAlign: 'center',
                                            fontFamily: Constant.manrope,
                                            fontSize: 14,
                                            paddingHorizontal: 5,
                                            fontWeight: '600',
                                            color: Constant.bg_color,
                                        }}>
                                        {CART.length}
                                    </Text>
                                </View>
                            }
                        </TouchableOpacity>
                    }
                </View>
            </View>
        </>
    );
};

export default Header;
