import React from 'react';
import { shallow } from 'enzyme';
import { AddPost } from 'components/AddPost';
import posts from 'tests/fixtures/posts';

describe('AddPost component', () => {
  let addPost, history, wrapper;

  beforeEach(() => {
    addPost = jest.fn();
    history = jest.fn();
    wrapper = shallow(<AddPost addPost={addPost} history={history} />);
  });

  it('should render the component correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should handle onSubmit', () => {
    console.log(wrapper.debug());
    // wrapper.find('PostForm').prop('onSubmit')(posts[0]);
    // expect(addPost).toHaveBeenCalled();
  });
});
