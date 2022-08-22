const getIdTokenFromUser = (user) => {
  let dataKey = user.userDataKey;
  dataKey = dataKey.replace(".userData", ".idToken");
  const idToken = user.storage[dataKey];
  return idToken;
};

export { getIdTokenFromUser };
