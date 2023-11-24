import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import { Constant } from '../Constant';
import HomeScreen from '../screens/HomeScreen';
import Wishlist from '../screens/Wishlist';

const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
    const [label, setLabel] = useState('Home');

    const homeHighScale = useSharedValue(1);
    const homeHighOpacity = useSharedValue(1);

    const wishlistHighScale = useSharedValue(0);
    const wishlistHighOpacity = useSharedValue(0);

    const homeHighlightStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: homeHighScale.value }],
            opacity: homeHighOpacity.value,
        };
    });

    const wishlistHighlightStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: wishlistHighScale.value }],
            opacity: wishlistHighOpacity.value,
        };
    });

    const activeEvent = key => {
        switch (key) {
            case 'Home':
                homeHighScale.value = withTiming(1);
                homeHighOpacity.value = withTiming(1);

                wishlistHighOpacity.value = withTiming(0);
                wishlistHighScale.value = withTiming(0);
                break;

            case 'Wishlist':
                homeHighScale.value = withTiming(0);
                homeHighOpacity.value = withTiming(0);

                wishlistHighOpacity.value = withTiming(1);
                wishlistHighScale.value = withTiming(1);
                break;

            default:
                break;
        }
    };

    return (
        <>
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: { ...styles.parentTabBar, position: 'absolute' },
                    tabBarShowLabel: false,
                    tabBarActiveTintColor: Constant.bright_yellow,
                    tabBarInactiveTintColor: Constant.dark_gunmetal,
                }}>
                <Tab.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <>
                                {label == 'Home' ? (
                                    <Animated.View
                                        style={[styles.highlightTab, homeHighlightStyle]}>
                                        <AntDesign name="home" color={color} size={size} />
                                    </Animated.View>
                                ) : (
                                    <AntDesign name="home" color={color} size={size/1.3} />
                                )}
                            </>
                        ),
                    }}
                    listeners={({ _, route }) => ({
                        tabPress: () => {
                            setLabel(route.name);
                            activeEvent(route.name);
                        },
                    })}
                />
                <Tab.Screen
                    name="Wishlist"
                    component={Wishlist}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <>
                                {label == 'Wishlist' ? (
                                    <Animated.View
                                        style={[styles.highlightTab, wishlistHighlightStyle]}>
                                        <AntDesign name="heart" color={color} size={size} />
                                    </Animated.View>
                                ) : (
                                    <AntDesign name="heart" color={color} size={size/1.3} />
                                )}
                            </>
                        ),
                    }}
                    listeners={({ _, route }) => ({
                        tabPress: () => {
                            setLabel(route.name);
                            activeEvent(route.name);
                        },
                    })}
                />
            </Tab.Navigator>
        </>
    );
};

const styles = StyleSheet.create({
    parentTabBar: {
        backgroundColor: Constant.ghost_white,
        height: 50,
        borderRadius: 15,
        paddingBottom: 0,
        paddingTop: 0,
        marginBottom: 10,
        marginHorizontal: 10,
        elevation: 2,
        borderWidth: 1,
        borderColor: Constant.bright_grey,
    },
    highlightTab: {
        width: 60,
        height: 60,
        backgroundColor: Constant.dark_gunmetal,
        borderRadius: 50,
        position: 'absolute',
        top: -10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth:5,
        borderColor:Constant.ghost_white
    },
});

export default BottomNavigator;
