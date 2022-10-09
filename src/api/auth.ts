import http from ".";
import { LoginDto, RegisterDto, ResponseLogin, ResponseRegister } from "./auth.dto";

const authApi = {
  async login(loginInfo: LoginDto): Promise<ResponseLogin> {
    return await http.post('auth/signin', { ...loginInfo });
  },
  async register(registerInfo: RegisterDto): Promise<ResponseRegister> {
    return await http.post('auth/signup', registerInfo);
  }
};

export default authApi;