import * as React from 'react';
import Label from './label';
import { map } from 'ramda';
import moment from 'moment';
// import tooltip from '../decorators/tooltip';

// class IssueTooltip extends React.Component {
//     render() {
//         return (
//             <div>
//
//             </div>
//         );
//     }
// }

// @tooltip(IssueTooltip)
class IssueViewer extends React.Component {

    renderLabels() {
        const labels = map((label) => {
            return <Label key={label.name} label={label} />;
        }, this.props.issue.labels);

        return <div className="label-container">{labels}</div>;
    }

    render() {
        const { issue } = this.props;
        const { user, updated_at, number, html_url } = issue;
        const updatedAt = moment(updated_at).format('MMMM Do');

        return (
            <div className="issue-container" onHover={this.showToolTip}>
                <a href={html_url()}
                   className="issue-link"
                   target="_blank"
                >
                    <h3 className="issue-name">{issue.title}</h3>
                </a>

                <div className="issue-details">
                    <h4 className="detail-header">
                        {` #${number}: ${user.login} | ${updatedAt}`}
                    </h4>
                    { this.renderLabels() }
                </div>
            </div>
        );
    }
}

export default IssueViewer;
