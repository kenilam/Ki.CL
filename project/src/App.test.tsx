import * as React from 'react';
import renderer, {
  ReactTestRenderer,
  ReactTestRendererJSON,
} from 'react-test-renderer';
import Component from './App';

let component: ReactTestRenderer;
let instance: ReactTestRendererJSON;

describe('App', () => {
  beforeEach(() => {
    component = renderer.create(<Component />);

    instance = component.toJSON();
  });

  test('should match with snapshot', () => {
    expect(instance).toMatchSnapshot();
  });
});
