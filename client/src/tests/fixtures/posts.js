import moment from 'moment';

export default [
  {
    _id: '1',
    title: 'first post',
    content: 'test one',
    createdAt: moment(0).add(1, 'day'),
    editedAt: moment(0).add(2, 'days'),
    name: 'sim',
    user: 'simuser',
    comments: [
      {
        _id: '1',
        text: 'comment one',
        name: 'sim',
        user: 'simuser'
      },
      {
        _id: '1',
        text: 'comment two',
        name: 'sim',
        user: 'simuser'
      }
    ],
    likes: [
      {
        _id: '1',
        user: 'simuser'
      }
    ]
  },
  {
    _id: '2',
    title: 'second post',
    content: 'test one',
    createdAt: moment(0).add(3, 'day'),
    editedAt: moment(0).add(3, 'days'),
    name: 'sim',
    user: 'simuser',
    comments: [
      {
        _id: '2',
        text: 'comment one',
        name: 'sim',
        user: 'simuser'
      }
    ],
    likes: [
      {
        _id: '2',
        user: 'simuser'
      },
      {
        _id: '3',
        user: 'simuser'
      }
    ]
  }
];
