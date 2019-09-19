import postsReducer from 'reducers/posts';
import {
  FETCH_ALL_POSTS,
  FETCH_POST,
  ADD_POST,
  EDIT_POST,
  DELETE_POST,
  ADD_COMMENT,
  POST_ERROR,
  LIKE_POST,
  UNLIKE_POST
} from 'actions/types';
import posts from 'tests/fixtures/posts';
import moment from 'moment';

// setup initial state
const initialState = {
  posts: [],
  post: {},
  loading: true,
  error: ''
};

describe('postsReducer tests', () => {
  it('should set the default state', () => {
    const state = postsReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual({
      posts: [],
      post: {},
      loading: true,
      error: ''
    });
  });

  it('should fetch all posts', () => {
    const action = { type: FETCH_ALL_POSTS, payload: posts };
    const state = postsReducer(undefined, action);
    expect(state).toEqual({
      ...state,
      posts,
      loading: false
    });
  });

  it('should fetch a single post', () => {
    const action = { type: FETCH_POST, payload: posts[0] };
    const state = postsReducer(undefined, action);
    expect(state.post).toEqual(posts[0]);
  });

  it('should add a new post', () => {
    const newPost = {
      _id: '3',
      title: 'New Post',
      content: 'test three',
      createdAt: moment(0).add(4, 'days'),
      editedAt: moment(0).add(4, 'days'),
      name: 'sim',
      user: 'simuser',
      comments: [],
      likes: []
    };

    const action = { type: ADD_POST, payload: newPost };
    const state = postsReducer(undefined, action);
    expect(state.posts[0]).toEqual(newPost);
  });

  it('should edit a post by id', () => {
    const edits = { _id: '1', content: 'Edited post' };
    const action = { type: EDIT_POST, payload: edits };
    const currentState = { ...initialState, posts };
    const newState = postsReducer(currentState, action);
    expect(newState.posts[0]).toEqual({ ...posts[0], content: 'Edited post' });
  });

  it('should not edit a post if no matching id is found', () => {
    const edits = { _id: '6', content: 'Edited post' };
    const action = { type: EDIT_POST, payload: edits };
    const currentState = { ...initialState, posts };
    const newState = postsReducer(currentState, action);
    expect(newState.posts).toEqual(posts);
  });

  it('should delete a post by id', () => {
    const currentState = { ...initialState, posts };
    const postToDelete = posts[0];
    const action = { type: DELETE_POST, payload: postToDelete };
    const newState = postsReducer(currentState, action);
    expect(newState.posts.length).toBe(1);
    expect(newState.posts[0]).toEqual(posts[1]);
  });

  it('should not delete a post if no matching id found', () => {
    const currentState = { ...initialState, posts };
    const postToDelete = { _id: '678' };
    const action = { type: DELETE_POST, payload: postToDelete };
    const newState = postsReducer(currentState, action);
    expect(newState.posts).toEqual(posts);
  });

  it('should add a comment to a post', () => {
    const currentState = { ...initialState, posts };
    const newComment = {
      _id: '45',
      text: 'new comment added',
      name: 'jess',
      user: 'jessuser'
    };
    const updatedPost = {
      ...posts[0],
      comments: [...posts[0].comments, newComment]
    };
    const action = { type: ADD_COMMENT, payload: updatedPost };
    const newState = postsReducer(currentState, action);
    expect(newState.posts[0].comments[2]).toEqual(newComment);
  });

  it('should add a like to a post', () => {
    const currentState = { ...initialState, posts };
    const newLike = { _id: '45', user: 'jessuser' };
    const updatedPost = {
      ...posts[1],
      likes: [...posts[1].likes, newLike]
    };
    const action = { type: LIKE_POST, payload: updatedPost };
    const newState = postsReducer(currentState, action);
    expect(newState.posts[1].likes[2]).toEqual(newLike);
  });

  it('should remove a like from a post', () => {
    const currentState = { ...initialState, posts };
    const updatedPost = { ...posts[0], likes: [] };
    const action = { type: UNLIKE_POST, payload: updatedPost };
    const newState = postsReducer(currentState, action);
    expect(newState.posts[0].likes.length).toBe(0);
  });

  it('should handle the post error case', () => {
    const action = { type: POST_ERROR, payload: 'test error message' };
    const state = postsReducer(undefined, action);
    expect(state.error).toBe('test error message');
  });
});
