import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import styled from '../';

const render = element => ReactTestRenderer.create(element).toJSON();

describe('specific', () => {
  it('supports mail-specific props', () => {
    const MsoComponent = styled.center`
      mso-hide: all;
    `;
    expect(render(<MsoComponent />)).toMatchSnapshot();
  });

  it('supports vml specific elements', () => {
    const AnchorLock = styled('w:anchorlock')``;
    expect(render(<AnchorLock />)).toMatchSnapshot();
  });

  it('outputs correct units', () => {
    const Box = styled.center`
      padding: 10px;
      margin: 10in;
      left: -1em;
      right: 5pt;
    `;
    expect(render(<Box />)).toMatchSnapshot();
  });

  it('expands color to 6 digits', () => {
    const Color = styled.p`
      color: #000;
      border: 1px solid #333;
    `;
    expect(render(<Color />)).toMatchSnapshot();
  });
});