import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

class Button extends React.Component {
    render() {
        const { tag, className, children, ...otherProps } = this.props

        return React.createElement(
            tag,
            {
                className: ['Button', className].join(' '), 
                ...otherProps
            },
            children
        )
    }
}

Button.propTypes = {
    className: PropTypes.string
};

Button.defaultProps ={
    tag: 'a',
}

export default Button;