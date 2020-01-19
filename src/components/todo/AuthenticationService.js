import instance from "../../api/Api";
import { AUTHENTICATED_USER } from "./Constants";

class AuthenticaionService {
  executeBasicAuth = async (name, password) => {
    const response = instance.get("/basicAuth", {
      headers: { authorization: this.token }
    });
    return response.data;
  };
  executePostJWTToken = async (username, password) => {
    const response = await instance.post("/authenticate", {
      username,
      password
    });
    return response.data;
  };
  createBasicAuthToken = (username, password) => {
    return "Basic " + window.btoa(username + ":" + password);
  };

  createJWTToken=(token)=>{
return `Bearer ${token}`
  }
  registerSuccessfulLoginForJWT(username, token) {
    this.setupAxiosInteceptor(this.createJWTToken(token));

    // this.executePostJWTToken(username, password)
    //   .then(resp => {
    //       this.token = `Bearer ${resp.token}`
    //     // console.log(resp.token);
    //   })
    //   .catch(e => console.log(e));
    //   this.setupAxiosInteceptor(this.createJWTToken(username,password))
    console.log(token);

    sessionStorage.setItem(AUTHENTICATED_USER, username);
  }
  setupAxiosInteceptor = basicAuthInfo => {
    // console.log(basicAuthInfo);

    instance.interceptors.request.use(config => {
      if (this.isUserLoggedIn()) {
        config.headers.authorization = basicAuthInfo;
        // console.log(config.headers);
      }
      return config;
    });
  };
  logout() {
    sessionStorage.removeItem(AUTHENTICATED_USER);
  }
  isUserLoggedIn() {
    let user = sessionStorage.getItem(AUTHENTICATED_USER);
    return user ? true : false;
  }
  getLoggedInUser() {
    let user = sessionStorage.getItem(AUTHENTICATED_USER);
    return user ? user : "";
  }
}
export default new AuthenticaionService();
