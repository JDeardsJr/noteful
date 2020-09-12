import React from 'react';

class BackButton extends React.Component {
    render() {
        const { tag, className, children, ...otherProps } = this.props

        return React.createElement(
            tag,
            {
                className: className, 
                ...otherProps
            },
            children
        )
    }
}

/*NavCircleButton.defaultProps ={
    tag: 'a',
}*/

export default BackButton;