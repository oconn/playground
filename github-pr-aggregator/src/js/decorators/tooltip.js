import React from 'react';

export default (Tooltip) => {
    return (DecoratedComponent) => {
        return class Tooltip extends React.Component {
            mouseEnter(e) {
                console.log(e);
            }

            mouseLeave(e) {
                console.log(e);
            }

            render() {
                return (
                    <div
                        className="tooltip-container"
                        onMouseEnter={this.mouseEnter}
                        onMouseLeave={this.mouseLeave}>

                        <DecoratedComponent {...this.props} />

                        <div className="tooltip">
                            <Tooltip {...this.props} />
                        </div>
                    </div>
                );
            }
        }
    };
}
