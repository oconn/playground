import React from 'react';
import cx from 'classnames';

export default class Loading extends React.Component {

    render() {
        const className = cx('fa fa-spinner fa-pulse fa-5x', this.props.className);

        return <i className={className} />;
    }
}
