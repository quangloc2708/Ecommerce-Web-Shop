import React from 'react';

import { Link } from 'react-router-dom';

import Grid from './Grid';

import Forhim from '../assets/Images/classify/forhim.jpeg';
import Forher from '../assets/Images/classify/forher.jpeg';

const Classify = () => {
    return (
        <Grid col={2} mdCol={2} smCol={2} gap={20}>
            <Link to="/for-him">
                <div className="categories__banner">
                    <img src={Forhim} alt="Forhim" />
                </div>
            </Link>
            <Link to="/for-her">
                <div className="categories__banner">
                    <img src={Forher} alt="Forher" />
                </div>
            </Link>
        </Grid>
    );
};

export default Classify;
