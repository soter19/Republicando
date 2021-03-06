import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const NavBar = styled.div`
  text-align: center;
`;

export const DefaultNavBar = ({ children }) =>
  ReactDOM.createPortal(
    <div>{children}</div>,
    document.getElementById('portal-header'),
  );
