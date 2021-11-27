const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };

const getLocalJwt = () => {
    const token = localStorage.getItem("token");
    const user = token && parseJwt(token);
    return {
        'token': token,
        'user': user,
    }
}

const setLocalJwt = (token) => {
    localStorage.setItem("token", token);
}

export { parseJwt, getLocalJwt, setLocalJwt };