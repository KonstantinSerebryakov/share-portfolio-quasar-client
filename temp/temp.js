const routes = [
  'profiles.profile-credential.query',
  'profiles.profile-credential-default.query',
];
const topic = 'profiles.profile-credential-default.query';
const res = routes.find((route) => {
  if (route === topic) {
    console.log('equal');
    return true;
  }
  console.log(route);
  const regexString =
    '^' + route.replace(/\*/g, '([^.]+)').replace(/#/g, '([^.]+.?)+') + '$';
  console.log(regexString)
  return topic.search(regexString) !== -1;
});

console.log(res);

export { res };
