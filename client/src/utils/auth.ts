import { jwtDecode } from 'jwt-decode';

class AuthService {
  getProfile() {
    // TODO: return the decoded token
    const token = this.getToken()
    return jwtDecode(token)
  }

  loggedIn() {
    // TODO: return a value that indicates if the user is logged in
    const token = this.getToken();
    if(token && !this.isTokenExpired(token)){
      return true
    } else {
      return false
    }
  }
  
  isTokenExpired(token: string) {
    // TODO: return a value that indicates if the token is expired
      const decoded = jwtDecode(token);
      if(decoded && decoded.exp &&  decoded.exp <= Date.now()  )  {
        return true;
      }
  }

  getToken(): string {
    // TODO: return the token
    const token = localStorage.getItem('jwtToken') || '';
    return token;
  }

  login(idToken: string) {
    // TODO: set the token to localStorage
    // TODO: redirect to the home page
    localStorage.setItem('jwtToken', idToken);
    window.location.assign('/');
  }

  logout() {
    // TODO: remove the token from localStorage
    // TODO: redirect to the login page
    localStorage.removeItem('jwtToken');
    window.location.assign('/');
  }
}

export default new AuthService();
