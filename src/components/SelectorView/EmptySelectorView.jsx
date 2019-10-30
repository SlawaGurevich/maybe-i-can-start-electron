import React from 'react';
import * as ROUTES from '../../constants/routes';
import { Button } from 'antd';

import './SelectorView.scss';

export const EmptySelectorView = () => {
    return(
        <div className="empty-roulette-view">
            <span className="empty-message">It seems there are no people who can maybe start.</span>
            <Button href={`#${ROUTES.OPTIONS}`} type="primary" size="large">CREATE SOME!</Button>
        </div>
    )
}

export default EmptySelectorView;