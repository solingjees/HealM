import store from '@/store'
export default {
  inserted (el, binding) {
    const identity = store.state.user.identity // 获取用户角色
    if (!binding.value.includes(parseInt(identity))) {
      el.parentNode.removeChild(el)
    }
  }
}
