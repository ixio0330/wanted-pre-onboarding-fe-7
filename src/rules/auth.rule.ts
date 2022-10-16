const inputRules = {
  email: (value: string) => {
    if (!value) return;
    if (!value.includes('@')) {
      return '이메일 형식이 올바르지 않습니다.';
    }
  },
  password: (value: string) => {
    if (!value) return;
    if (value.length < 8) {
      return '비밀번호는 8글자 이상이어야 합니다.';
    }
  }
};

export default inputRules;
