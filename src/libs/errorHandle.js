import store from '@/store'
import Router from 'vue-router'

// const addErrorLog = errorInfo => {
//   const { statusText, status, request: { responseURL } } = errorInfo
//   const info = {
//     type: 'ajax',
//     code: status,
//     mes: statusText,
//     url: responseURL
//   }
//   if (!responseURL.includes('save_error_logger')) store.dispatch('addErrorLog', info)
// }

const errorHandle = (err) => {
  console.log(err)
  // this.$Message.error(err.script || err)
  // addErrorLog(err)
}

export default errorHandle
