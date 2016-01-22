/// <reference path="../../../typings/tsd.d.ts" />

import * as React from 'react';

interface IAppProps {
    children?: Array<React.ReactElement<{}>>;
}

export default class App extends React.Component<IAppProps, {}> {
    public render(): React.ReactElement<{}> {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}
