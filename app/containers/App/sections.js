export const sections = {
  works: {
    path: '/works',
    title: 'Works',
    matchPath: [{
      path: '/works',
      exact: false,
      strict: false,
    }, {
      path: '/',
      exact: true,
      strict: false,
    }],
  },
  skills: {
    path: '/skills',
    title: 'Skills',
    matchPath: [{
      path: '/skills',
      exact: false,
      strict: false,
    }],
  },
};
