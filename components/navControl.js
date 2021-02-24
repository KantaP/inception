/** @jsx jsx */

import {
    Nav
} from 'react-bootstrap';


import { css , jsx } from '@emotion/react'

const navControlContainer = css`
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #000;
    padding: 4px;
    margin-bottom: 10px;
`;

const NavControl = () => {
    return (
        <Nav
            css={navControlContainer}
            activeKey="/"
            // onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
        >
            <Nav.Item>
                <Nav.Link href="/">Incidents</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/add">New Incident</Nav.Link>
            </Nav.Item>
        </Nav>
    )
}

export default NavControl;