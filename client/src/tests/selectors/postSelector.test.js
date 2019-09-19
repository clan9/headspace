import postSelector from 'selectors/postSelector';
import posts from 'tests/fixtures/posts';

describe('postSelector tests', () => {
  it('should show posts with matching text in title', () => {
    const text = 'second';
    const selectedPosts = postSelector(posts, { text });
    expect(selectedPosts[0]).toEqual(posts[1]);
  });

  it('should show posts in order of most recent first when sortBy value is date', () => {
    const text = '';
    const sortBy = 'date';
    const selectedPosts = postSelector(posts, { text, sortBy });
    expect(selectedPosts).toEqual([posts[1], posts[0]]);
  });

  it('should show posts in order of most commented first when sortBy value is comments', () => {
    const text = '';
    const sortBy = 'comments';
    const selectedPosts = postSelector(posts, { text, sortBy });
    expect(selectedPosts).toEqual([posts[0], posts[1]]);
  });

  it('should show posts in order of most liked first when sortBy value is likes', () => {
    const text = '';
    const sortBy = 'likes';
    const selectedPosts = postSelector(posts, { text, sortBy });
    expect(selectedPosts).toEqual([posts[1], posts[0]]);
  });
});
