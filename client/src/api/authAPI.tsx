import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  // TODO: make a POST request to the login route
  try {
    const res = await fetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify(userInfo)
    })

    const data = await res.json();

    if(res.ok) {
      return data;
    }
  } catch(error) {
    console.log(error);
  }
}



export { login };
