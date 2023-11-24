import { Dimensions } from "react-native";

export const Constant = {

    d_Width: Dimensions.get('window').width,
    d_Height: Dimensions.get('window').height,


    // Colors

    bg_color: '#FFF',
    dark_gunmetal: '#1B262E',
    arsenic: '#354349',
    dark_eletric_blue: '#606D76',
    cadet_blue: '#A9B4BC',
    chinese_sliver: '#C5CDD2',
    bright_grey: '#E7ECF0',
    ghost_white: '#F8F9FB',

    cyan_cobalt_blue: '#2A4BA0',
    catalina_blue: '#153075',
    bright_yellow: '#F9B023',
    sunglow: '#FFC83A',

    // Font family

    manrope: 'Manrope',


    // Empty Image
    emptyImg: require('./assets/empty_icon.png'),
    bagImg: require('./assets/bag.png'),
    searchIcon: require('./assets/SearchIcon.png'),

    //Vibration pattern
    vibratePattern:100

}