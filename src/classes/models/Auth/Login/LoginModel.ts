import LoginInterface from "./LoginInterface"

class LoginModel implements LoginInterface {
    email: string
    password: string
}

export default LoginModel