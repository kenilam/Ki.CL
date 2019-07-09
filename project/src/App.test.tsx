import * as React from 'react';
import Component from './App';
import ShallowRenderer from 'react-test-renderer/shallow';

describe('App', () => {
  test('should match with snapshot', () => {
    // @ts-ignore
    const renderer = new ShallowRenderer();
    expect(
      renderer.render(
        <Component>
          <div>Child</div>
        </Component>
      )
    ).toMatchSnapshot();
    
  });
});
