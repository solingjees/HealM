import moment from 'moment'
class Storage {
  constructor (key) {
    this.key = key
  }

  setValue (value) {
    if (!(value instanceof String)) {
      value = JSON.stringify(value)
    }
    try {
      localStorage.setItem(this.key, value)
    } catch (err) {
      console.error(err)
    }
  }

  getValue () {
    let value = ''
    try {
      value = JSON.parse(localStorage.getItem(this.key))
    } catch (err) {
      console.log(err)
    }
    return value
  }

  clear () {
    try {
      localStorage.removeItem(this.key)
    } catch (err) {
      console.error(err)
      return false
    }
    return true
  }
}

const UserInfoStorage = new Storage('userInfo')

export {
  UserInfoStorage
}
