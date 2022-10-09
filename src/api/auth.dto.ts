export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto extends LoginDto {}

export interface ResponseLogin {
  access_token: string;
}

export interface ResponseRegister extends ResponseLogin {}