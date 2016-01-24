import * as React from 'react';

class Label extends React.Component {

    render() {
        const { label } = this.props;
        const styles = {
            backgroundColor: `#${label.color}`
        };

        return (
            <div style={styles} className="label">
                <p className="label-name">{label.name}</p>
            </div>
        );
    }
}

export default Label;
