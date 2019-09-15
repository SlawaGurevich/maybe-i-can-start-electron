import React from 'react';
import * as ROUTES from '../../constants/routes';
import { Link } from 'react-router-dom';
import Button from '@pluralsight/ps-design-system-button/react'

import './SelectorView.scss';

export const EmptySelectorView = () => {
    return(
        <div className="empty-roulette-view">
            <span className="empty-message">It seems there are no people who can maybe start.</span>
            <Button href={`#${ROUTES.OPTIONS}`}>CREATE SOME!</Button>
        </div>
    )
}

export default EmptySelectorView;