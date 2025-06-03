export default {
  install(app) {
    app.config.globalProperties.$notification = {
      open({ message }) {
        if (typeof window !== 'undefined') {
          alert(message)
        } else {
          console.error(message)
        }
      },
    }
  },
}
