import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Constant } from '../Constant';

const RatingStars = ({ rating }) => {
    const filledStars = Math.floor(rating);
    const halfStar = rating - filledStars >= 0.5;

    const renderStars = () => {
        const stars = [];
        for (let i = 0; i < filledStars; i++) {
            stars.push(
                <View key={`gold-${i}-${filledStars}`} style={{paddingRight: 4}}>
                    <Icon name="star" size={16} color={Constant.bright_yellow} />
                </View>
            );
        }

        if (halfStar) {
            stars.push(
                <View style={{paddingRight: 4, position:'relative'}}>
                    <Icon name="star" size={16} color={Constant.dark_gunmetal} />
                    <Icon name="star-half" size={16} color={Constant.bright_yellow} style={{position:'absolute'}} />
                </View>
            );
        }

        const remainingStars = 5 - filledStars - (halfStar ? 1 : 0);
        for (let i = 0; i < remainingStars; i++) {
            stars.push(
                <View key={`dark-${i}-${remainingStars}`} style={{paddingRight: 4}}>
                    <Icon name="star" size={16} color={Constant.dark_gunmetal} />
                </View>
            );
        }

        return stars;
    };

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {renderStars()}
        </View>
    );
};

export default RatingStars;
