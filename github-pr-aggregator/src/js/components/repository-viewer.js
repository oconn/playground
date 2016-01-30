import * as React from 'react';
import IssueViewer from './issue-viewer';
import { initializeRepositoryIssues, createRepositoryWebhook } from '../actions/repositories';
import {
    append,
    difference,
    equals,
    filter,
    length,
    map,
    prop,
    reduce
} from 'ramda';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getMergableCriteria } from '../helpers/repo-config';

class RepositoryViewer extends React.Component {

    componentDidMount() {
        this.props.actions.initializeRepositoryIssues(this.props.repo);
        this.props.actions.createRepositoryWebhook(this.props.repo);
    }

    /**
     * Return only issues that have open PRs
     *
     * @param {Array} issues repository issues
     * @method filterIssues
     * @return {Array} issues
     */
    filterIssues(issues) {
        return filter(issue => {
            const hasPr = prop('pull_request', issue);
            const isOpen = equals(prop('state', issue), 'open');

            return  isOpen && hasPr;
        }, issues);
    }

    matchesCriteria(issues) {
        const matchesUserCriteria = (criteria, labels) => {
            return equals(0, length(difference(criteria, labels)));
        }

        return reduce((memo, issue) => {
            const { labels } = issue;
            const labelNames = map(prop('name'), labels);
            const criteria = getMergableCriteria(prop('full_name', this.props.repo));

            return matchesUserCriteria(criteria, labelNames) ?
                append(issue, memo) : memo;
        }, [], issues);
    }

    completeIssues(issues) {
        const userSpecifiedMatches = this.matchesCriteria(issues);

        // TODO Filter out merge conflicts
        return userSpecifiedMatches;
    }

    renderIssues() {
        const filteredIssues = this.filterIssues(this.props.repo.issues || []);
        const completeIssues = this.completeIssues(filteredIssues);
        const incompleteIssues = difference(filteredIssues, completeIssues);

        return (
            <div className="issue-list">
                <div className="incomplete">
                    {map((issue) => {
                        return <IssueViewer key={issue.id} issue={issue} />;
                    }, incompleteIssues)}
                </div>
                <div className="complete">
                    {map((issue) => {
                        return (
                            <IssueViewer
                                key={issue.id}
                                issue={issue}
                                isComplete={true}
                            />
                        );
                    }, completeIssues)}
                </div>
            </div>
        );
    }

    render() {
        const { repo } = this.props;

        return (
            <div className="repository-container">
                <h2 className="repository-name">{repo.full_name}</h2>

                { this.renderIssues() }
            </div>
        );
    }
}

export default connect(
    () => {return {}},
    (dispatch) => {
        return {
            actions: bindActionCreators({
                createRepositoryWebhook,
                initializeRepositoryIssues
            }, dispatch)
        };
    }
)(RepositoryViewer);
