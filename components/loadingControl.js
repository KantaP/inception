/** @jsx jsx */

import {  useRecoilState } from 'recoil';
import { loadingState } from '../lib/recoil-atoms';
import ClipLoader from "react-spinners/ClipLoader";


import { css , jsx } from '@emotion/react'
import { useEffect } from 'react';

const loadingColor = 'white';

const loadingStyle = css`
    border-color: ${loadingColor};
`;

const loadingContainer = css`
    position: absolute;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0,0,0,0.5);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-Index: 2
`;


const LoadingControl = () => {

    const [loading , setLoading] = useRecoilState(loadingState);
    
    useEffect(()=>{
        console.log('loading ' , loading);
    },[loading])

    if(loading)
    return (
        <div css={loadingContainer}>
            <ClipLoader color="#fff" loading={loading} css={loadingStyle} size={64} />
        </div>
    )
    else return null
}

export default LoadingControl