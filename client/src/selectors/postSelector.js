export default (posts, { text, sortBy }) => {
  return posts
    .filter(post => {
      return post.title.toLowerCase().includes(text.toLowerCase());
    })
    .sort((current, next) => {
      if (sortBy === 'date') {
        return current.createdAt < next.createdAt ? 1 : -1;
      }

      if (sortBy === 'likes') {
        return current.likes.length < next.likes.length ? 1 : -1;
      }

      if (sortBy === 'comments') {
        return current.comments.length < next.comments.length ? 1 : -1;
      }

      return 0;
    });
};
