export const normalLogin = req => {
  return {
    status: true,
    script: '登录成功',
    data: {
      token: '12345566666'
    }
  }
}

export const sendPhoneVerify = req => {
  const body = JSON.parse(req.body)
  if (body.phoneNumber === '11111111111') {
    return {
      status: true,
      script: '发送验证码成功',
      data: []
    }
  } else {
    return {
      status: false,
      script: '发送验证码失败',
      data: []
    }
  }
}

export const checkPhoneVerify = req => {
  const body = JSON.parse(req.body)
  if (body.phoneNumber === '11111111111' && body.verifyCode === '1111') {
    return {
      status: true,
      script: '验证成功',
      data: {
        token: '11111111111'
      }
    }
  } else {
    return {
      status: false,
      script: '验证失败',
      data: []
    }
  }
}
