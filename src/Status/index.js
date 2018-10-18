import React from 'react'
import classNames from 'classnames';
import './style.css';

const Status = ({status}) => {
    const statusClass = classNames('status', {
        'status-low': status === 'low',
        'status-middle': status === 'middle',
    });
    return(
        <div className={statusClass}></div>
    )
}

export default Status