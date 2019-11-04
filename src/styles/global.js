import { css } from '@emotion/core';
import { orange, orangeDark } from './colors';


const globalClass = css`
	body {
		color: #3a3a3a;
		background: #fff;
		margin: 0;
		font-family: 'Rubik', sans-serif;
		font-weight: 400;
		line-height: 1.65;
  }

  a {
    color: ${orange};
    text-decoration: none;
    &:hover {
      color: ${orangeDark};
      text-decoration: none;
    }
  }
`;

export default globalClass;
