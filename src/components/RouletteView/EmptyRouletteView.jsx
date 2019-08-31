import React from 'react';
import * as ROUTES from '../../constants/routes';
import { Link } from 'react-router-dom';

import './RouletteView.scss';

export const EmptyRouletteView = () => {
    return(
        <div className="empty-roulette-view">
            <span>It seems there are no people who can maybe start.</span>
            <Link className="members-button" to={ROUTES.OPTIONS}>CREATE SOME!</Link>
        </div>
    )
}

export default EmptyRouletteView;