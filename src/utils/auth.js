import Cookies from "js-cookie";
import store from "../store";

const LoggedIn = "logged-in";
const AccessToken = "AccessToken";
const RefreshToken = "RefreshToken";

export function IsLoggedIn() {
  return Cookies.get(LoggedIn);
}

export function getAccessToken() {
  return Cookies.get(AccessToken);
}

export function getRefreshToken() {
  return Cookies.get(RefreshToken);
}

export function setToken(data) {
  const parsedToken = parseJwt(data.access_token);

  Cookies.set(LoggedIn, true);
  Cookies.set(AccessToken, data.access_token, {
    expires: new Date(parsedToken.exp * 1000),
  });
  Cookies.set(RefreshToken, data.refresh_token, {
    expires: new Date(parsedToken.exp_rf * 1000),
  });

  return new Promise((resolve, reject) => {
    if (getAccessToken()) {
      store.commit("SET_IS_LOGGED_IN", true);
      resolve();
    } else {
      reject(new Error("Не удалось записать токен авторизации в cookies!"));
    }
  });
}

export function removeToken() {
  Cookies.remove(LoggedIn);
  Cookies.remove(AccessToken);
  return Cookies.remove(RefreshToken);
}

const whiteList = ["Dashboard", "NotFoundPage"];

export function checkUserRole(res, to, next) {
  if (whiteList.includes(to.name)) {
    next();
  } else if (
    to.meta.group &&
    res.data.groups.find((group) => to.meta.group.includes(group))
  ) {
    next();
  } else {
    next({ name: "NotFoundPage" });
  }
}

export function getUserInfo(to, next) {
  return store
    .dispatch("GetUserInfo")
    .then((res) => {
      return checkUserRole(res, to, next);
    })
    .catch((err) => {
      store
        .dispatch("ShowAlert", {
          text: err.message,
          type: "error",
        })
        .then(() => {});
    });
}

export function throwTokenErrorMsg() {
  const err = new Error();
  err.response = {
    data: {
      message: "Необходимо обновление ключа сессии",
    },
  };
  throw err;
}
