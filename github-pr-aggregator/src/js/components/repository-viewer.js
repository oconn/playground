import * as React from 'react';
import IssueViewer from './issue-viewer';
import { initializeRepositoryIssues } from '../actions/repositories';
import { equals, filter, map, prop } from 'ramda';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class RepositoryViewer extends React.Component {

    componentDidMount() {
        this.props.actions.initializeRepositoryIssues(this.props.repo);
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

    renderIssues() {
        const filteredIssues = this.filterIssues(this.props.repo.issues || []);

        return map((issue) => {
            return <IssueViewer key={issue.id} issue={issue} />;
        }, filteredIssues);
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
            actions: bindActionCreators({ initializeRepositoryIssues }, dispatch)
        };
    }
)(RepositoryViewer);
