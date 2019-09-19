import React from 'react';
import { shallow } from 'enzyme';
import { AddComment } from 'components/AddComment';
import moment from 'moment';

describe('AddComment component tests', () => {
  let addComment, history, id, createdAt, wrapper;

  beforeEach(() => {
    addComment = jest.fn();
    history = jest.fn();
    id = '1';
    createdAt = moment().valueOf();
    wrapper = shallow(
      <AddComment addComment={addComment} id={id} history={history} />
    );
  });

  it('should render AddComment component correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render AddComment component correctly when there is an error message to display', () => {
    wrapper.find('form').simulate('submit', { preventDefault: () => {} });
    expect(wrapper).toMatchSnapshot();
  });

  it('should handle changes to the text area', () => {
    const value = 'new text';
    wrapper.find('textarea').simulate('change', { target: { value } });
    expect(wrapper.state('text')).toBe(value);
  });

  it('should handle valid form submission', () => {
    const value = 'new text';
    wrapper.find('textarea').simulate('change', { target: { value } });
    wrapper.find('form').simulate('submit', { preventDefault: () => {} });

    expect(wrapper.state('error')).toBe('');
    expect(addComment).toHaveBeenLastCalledWith({
      text: value,
      createdAt,
      id,
      history
    });
  });

  it('should handle invalid form submission', () => {
    wrapper.find('form').simulate('submit', { preventDefault: () => {} });
    expect(wrapper.state('error')).toBe('You cannot add an empty comment');
    // expect(resetError).toHaveBeenCalled();
  });
});
