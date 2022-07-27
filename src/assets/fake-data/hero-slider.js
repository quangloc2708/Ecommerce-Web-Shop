const img1 = require('../Images/Slider/slide1.png');
const img2 = require('../Images/Slider/slide2.jpeg');
const img3 = require('../Images/Slider/slide3.jpeg');
const img4 = require('../Images/Slider/slide4.jpeg');

const img_m1 = require('../Images/Slider/slide-m1.jpeg');
const img_m2 = require('../Images/Slider/slide-m2.jpeg');
const img_m3 = require('../Images/Slider/slide-m3.jpeg');
const img_m5 = require('../Images/Slider/slide-m5.jpeg');
const img_m4 = require('../Images/Slider/slide-m4.jpeg');

const data = [
    {
        title: '',
        img: img1,
        description: '',
        path: '/for-him',
        device: 'tablet',
    },
    {
        title: '',
        img: img2,
        description: '',
        path: '/for-her',
        device: 'tablet',
    },
    {
        title: '',
        img: img3,
        description: '',
        path: '/for-him',
        device: 'tablet',
    },
    {
        title: '',
        img: img4,
        description: '',
        path: '/for-him',
        device: 'tablet',
    },

    {
        title: '',
        img: img_m1,
        description: '',
        path: '/for-him',
        device: 'mobile',
    },
    {
        title: '',
        img: img_m2,
        description: '',
        path: '/for-him',
        device: 'mobile',
    },
    {
        title: '',
        img: img_m3,
        description: '',
        path: '/for-her',
        device: 'mobile',
    },
    {
        title: '',
        img: img_m4,
        description: '',
        path: '/for-him',
        device: 'mobile',
    },
    {
        title: '',
        img: img_m5,
        description: '',
        path: '/for-him',
        device: 'mobile',
    },
];

const getMobileSliderData = () => data.filter((e) => e.device === 'mobile');
const getTabletSliderData = () => data.filter((e) => e.device === 'tablet');

const heroSliderData = {
    getTabletSliderData,
    getMobileSliderData,
};

export default heroSliderData;
