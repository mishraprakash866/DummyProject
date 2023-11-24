import React, { useMemo, useRef, useState, useEffect } from "react";
import { View, FlatList, ScrollView, Pressable, Image, TextInput, Text, ActivityIndicator, Alert } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useDispatch } from "react-redux";
import { Constant } from "../Constant";
import Header from "../components/Header";
import { Banner, ProductItem } from "../components/General";
import { getProductList } from "../APIs";

const HomeScreen = ({ navigation }) => {

    const inputFocus = useRef(null);
    const dispatch = useDispatch();

    const [data, setData] = useState([]);
    const [spinner, setSpinner] = useState(true);
    const [load, setload] = useState(true);
    const total = useRef(null);
    const skip = useRef(0);

    useEffect(() => {
        callProductAPI(skip.current);
    }, []);

    const callProductAPI = (size) => {
        getProductList({skip:size})
            .then((res) => {
                setload(false);
                if(res.data.total){
                    const newList = res.data.products?.map((ele, index) => {
                        return {
                            ...ele,
                            index: index * 2
                        }
                    })
                    setData(prev => [...prev, ...newList]);
                    total.current = res.data.total;
                    skip.current += res.data.limit;
                }
                if(res.data.total == (res.data.skip + res.data.limit)){
                    setSpinner(false);
                }
            })
            .catch((e) => {
                console.log(e.response);
                Alert.alert('Message', 'Oops somthing went wrong, Plese check internet connection.', [
                    {
                        text: 'Retry',
                        onPress: () => callProductAPI(skip.current)
                    }
                ]);
            })
    }

    const renderItem = ({ item, index }) => {
        return (
            <>
                <ProductItem item={item} dispatch={dispatch} navigation={navigation} />
            </>
        );
    }

    const memoRender = useMemo(() => renderItem, []);

    const handleEndReached = () => {
        if(spinner && !load){
            setload(true);
            callProductAPI(skip.current);
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: Constant.bg_color }}>
            <View style={{ width: '100%', backgroundColor: Constant.cyan_cobalt_blue, position: 'absolute', zIndex: 2 }}>
                <Header
                    navigation={navigation}
                    showBack={false}
                    showTitle={true}
                    showCart={true}
                    isWhite={true}
                    borderColor={Constant.cyan_cobalt_blue}
                />
            </View>

            <FlatList
                data={data}
                numColumns={2}
                contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
                renderItem={memoRender}
                showsVerticalScrollIndicator={false}
                keyExtractor={(_, index) => index.toString()}
                onEndReachedThreshold={0.5}
                maxToRenderPerBatch={20}
                onEndReached={handleEndReached}
                ListHeaderComponentStyle={{ width: Constant.d_Width }}
                ListHeaderComponent={() => (
                    <>
                        <View style={{ width: '100%', height: 290, position: 'relative', paddingHorizontal: 15, backgroundColor: Constant.cyan_cobalt_blue }}>
                            <View style={{ width: '100%', height: 120 }} />
                            <Pressable onPress={() => inputFocus.current.focus()} style={{ width: '100%', height: 65, borderRadius: 65, backgroundColor: Constant.catalina_blue, justifyContent: 'flex-start', paddingLeft: 25, paddingRight: 15, flexDirection: 'row', alignItems: 'center' }}>
                                <Image source={Constant.searchIcon} resizeMode="contain" style={{ width: 22, height: 22 }} />
                                <TextInput
                                    ref={inputFocus}
                                    placeholder="Search Products or Store"
                                    placeholderTextColor={'#8891A5'}
                                    style={{ fontFamily: Constant.manrope, fontSize: 16, fontWeight: '600', paddingHorizontal: 10, color: '#A9B4BC', flex: 1 }}
                                />
                            </Pressable>

                            <View style={{ width: '100%', position: 'absolute', bottom: 0, height: 60, alignSelf: 'center' }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <View>
                                        <Text style={{ fontFamily: Constant.manrope, fontSize: 12, fontWeight: '800', color: Constant.ghost_white, opacity: 0.6 }}>DELIVERY TO</Text>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text style={{ fontFamily: Constant.manrope, paddingRight: 14, fontSize: 16, fontWeight: '500', color: '#FFF', lineHeight: 24 }}>
                                                Green Way 3000, Sylhet
                                            </Text>
                                            <AntDesign name="down" color={'#FFF'} size={12} style={{opacity:0.6}} />
                                        </View>
                                    </View>
                                    <View>
                                        <Text style={{ fontFamily: Constant.manrope, fontSize: 12, fontWeight: '800', color: Constant.ghost_white, opacity: 0.6 }}>WITHIN</Text>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text style={{ fontFamily: Constant.manrope, paddingRight: 14, fontSize: 16, fontWeight: '500', color: '#FFF', lineHeight: 24 }}>
                                                1 Hour
                                            </Text>
                                            <AntDesign name="down" color={'#FFF'} size={12} style={{opacity:0.6}} />
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={{ width: '100%', height: 170 }}>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ flex: 1 }}>
                                <View style={{ height: '100%', paddingHorizontal: 15, flexDirection: 'row', paddingVertical: 15 }}>
                                    <View style={{ flex: 1, width: Constant.d_Width * 0.8, borderRadius: 16, overflow: 'hidden' }}>
                                        <Banner bgColor={Constant.bright_yellow} />
                                    </View>
                                    <View style={{ flex: 1, width: 15 }} />
                                    <View style={{ flex: 1, width: Constant.d_Width * 0.8, borderRadius: 16, overflow: 'hidden' }}>
                                        <Banner bgColor={Constant.chinese_sliver} />
                                    </View>
                                </View>
                            </ScrollView>
                        </View>
                        <View style={{paddingHorizontal:15, paddingBottom:10}}>
                            <Text style={{fontFamily:Constant.manrope, fontSize:31, fontWeight:'400', color:'#1E222B'}}>Recommended</Text>
                        </View>
                    </>
                )}
                ListFooterComponentStyle={{ height: 100, width: '100%', justifyContent:'flex-start', alignItems:'center' }}
                ListFooterComponent={() => (
                    <>
                        {(spinner) &&
                            <ActivityIndicator size={'large'} color={Constant.cyan_cobalt_blue} />
                        }
                    </>
                )}
            />

        </View >
    );

}

export default HomeScreen;