import MainNavigation from './MainNavigation';
import { Fragment } from 'react';

const Layout = (props) => {
    return (
        <Fragment>
            <MainNavigation onShowCart={props.onShowCart} />
            <main>{props.children}</main>
        </Fragment>
    )
}

export default Layout;