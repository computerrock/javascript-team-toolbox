import React, {Fragment, useRef, useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {withStyles, withStylesPropTypes, withStylesDefaultProps} from '../withStyles';
import styles from './Overlay.module.scss';
import * as positions from './positions';

const Overlay = ({cx, className, children, id, position}) => {
    const containerRef = useRef(document.getElementById(`#overlay-${id}`) || document.createElement('div'));
    const [isContainerMounted] = useState(!!containerRef.current.parentElement);
    const containerClassName = cx('adc-c-overlay', `adc-c-overlay--${id}`, className);

    useEffect(() => {
        const containerElement = containerRef.current;

        if (!isContainerMounted) {
            containerElement.setAttribute('id', `overlay-${id}`);
            containerElement.className = containerClassName;
            containerElement.style.top = `${position.top}px`;
            containerElement.style.left = `${position.left}px`;

            document.body.appendChild(containerElement);
        }

        return () => {
            if (containerElement.parentElement) {
                containerElement.parentElement.removeChild(containerElement);
            }
        };
    }, [id, position, isContainerMounted, containerClassName]);

    return (
        <Fragment>
            {ReactDOM.createPortal(
                children,
                containerRef.current,
            )}
        </Fragment>
    );
};

Overlay.propTypes = {
    ...withStylesPropTypes,
    id: PropTypes.string.isRequired,
    position: PropTypes.shape({
        top: PropTypes.number,
        left: PropTypes.number,
    }),
};

Overlay.defaultProps = {
    ...withStylesDefaultProps,
    position: positions.DEFAULT_POSITION,
};

export default withStyles(styles)(Overlay);
