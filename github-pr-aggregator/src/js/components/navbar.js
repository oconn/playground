import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { map } from 'ramda';
import cx from 'classnames';

export default class Navbar extends React.Component {

    static contextTypes = {
        router: PropTypes.object.isRequired
    };

    renderLinks() {
        const { isActive } = this.context.router;
        const links = [
            {
                path: '/setup',
                display: 'Setup'
            },
            {
                path: '/dashboard',
                display: 'Dashboard'
            }
        ];

        return map(link => {
            const className = cx('nav-link', {
                active: isActive(link.path)
            });

            return (
                <li className={className} key={link.path}>
                    <Link to={link.path}>{link.display}</Link>
                </li>
            );
        }, links);
    }

    render() {
        return (
            <nav className="navbar">
                <ul className="links">
                    {this.renderLinks()}
                </ul>
            </nav>
        );
    }
}
