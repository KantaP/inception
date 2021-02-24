import { RecoilRoot } from 'recoil'
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";
/** @jsx jsx */

import { Container } from 'react-bootstrap';
import NavControl from '../components/navControl';

import { css , jsx } from '@emotion/react'
import LoadingControl from '../components/loadingControl';


const pageLayout = css`
  padding: 10px;
`;

function MyApp({ Component, pageProps }) {
  
  return (
    <RecoilRoot>
      <LoadingControl />
      <Container css={pageLayout}>
        <NavControl />
        <Component {...pageProps} />
      </Container>
    </RecoilRoot>
  )
}


export default MyApp;