import * as React from 'react';
import Form, { Input, Fieldlist, Errors } from 'react-formable';
import { map } from 'ramda';

const isRequired = (errorMessage) => {
    return (value) => {
        if (!value) {
            return errorMessage;
        }
    };
}

export default class SetupForm extends React.Component {
    onSubmit(form) {
        if (form.valid) {
            this.props.actions.updateConfig(form.fieldValues);
        }
    }

    addRepository(e) {
        e.preventDefault();

        this.props.actions.addRepository();
    }

    removeRepository(id, e) {
        e.preventDefault();

        this.props.actions.removeRepository(id);
    }

    renderRepositories() {
        const { selectedRepos } = this.props.defaultValues;

        return map(repo => {
            const fullname = `${repo.user}/${repo.name}`;

            return (
                <div key={repo.id}>
                    <Input type="hidden"
                        name="id"
                        defaultValue={repo.id}
                    />

                    <div className="repo-input-wrapper">
                        <Input type="text"
                            className="repo-owner-input"
                            name="user"
                            defaultValue={repo.user}
                            placeholder="Repository Owner"
                        />

                        <p className="slash">/</p>

                        <Input type="text"
                            className="repo-name-input"
                            name="name"
                            defaultValue={repo.name}
                            placeholder="Repository Name"
                        />
                    </div>

                    <button className="remove-repo-btn" onClick={this.removeRepository.bind(this, repo.id)}>
                        {`Remove ${repo.user ? fullname : 'Repo'}`}
                    </button>
                </div>
            );
        }, selectedRepos);
    }

    render() {
        const { githubAPIToken, dashboardName } = this.props.defaultValues;

        return (
            <Form onSubmit={::this.onSubmit}>

                <label>Github API Token *</label>

                <p>Add your github api token. Generate this by visiting <a href="https://github.com/settings/tokens" target="_blank">your settings page</a>. This will only be stored locally in localStorage and will be passed as a query parameter with every required github API request. To remove from localStorage, use dev tools or type <strong>localStorage.clear()</strong> in the dev console.</p>

                <Input type="password"
                    name="githubAPIToken"
                    placeholder="Github API Token"
                    defaultValue={githubAPIToken}
                    validators={[isRequired('API Token Required')]}
                />


                <label>Dashboard Name</label>

                <Input type="text"
                    name="dashboardName"
                    placeholder="Dashboard Name"
                    defaultValue={dashboardName}
                />


                <label>Repositories</label>

                <p>Add as may repositores as you would like. Note that each repository will cause two API requests per page refresh. You have 5000 github API requests per hour.</p>

                <Fieldlist name="selectedRepos">
                    {this.renderRepositories()}
                </Fieldlist>

                <button onClick={::this.addRepository}>Add Repository</button>

                <Errors />
                <button>Submit</button>
            </Form>
        );
    }
}
