import React, { PropTypes } from 'react';
import Label from './label';
import { map } from 'ramda';
import moment from 'moment';
import cx from 'classnames';

class IssueViewer extends React.Component {

    static propTypes = {
        isComplete: PropTypes.bool
    };

    renderLabels() {
        const labels = map((label) => {
            return <Label key={label.name} label={label} />;
        }, this.props.issue.labels);

        return <div className="label-container">{labels}</div>;
    }

    render() {
        const { issue } = this.props;
        const { comments, user, updated_at, number, html_url } = issue;
        const updatedAt = moment(updated_at).format('MMMM Do');

        const className = cx('issue-container');

        return (
            <div className={className} onHover={this.showToolTip}>
                <div className="issue-title-line">
                    <a href={html_url()}
                       className="issue-link"
                       target="_blank"
                    >
                        <h3 className="issue-name">{issue.title}</h3>
                    </a>

                    <span className="fa-stack fa-lg comment-container">
                        <i className="fa fa-comment fa-stack-1x" />
                        <i className="comment-count fa-stack-1x">{comments}</i>
                    </span>


                    { this.props.isComplete && (
                        <i className="fa fa-check completed" />
                    )}
                </div>

                <div className="issue-details">
                    <h4 className="detail-header">
                        <span className="issue-number">#{number}</span>
                        <span className="issue-originator">{user.login}</span>
                        <span className="updated-at">{updatedAt}</span>
                    </h4>
                    { this.renderLabels() }
                </div>
            </div>
        );
    }
}

export default IssueViewer;
