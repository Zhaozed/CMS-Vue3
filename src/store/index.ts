import { createPinia } from 'pinia'
import type { App } from 'vue'
import useLoginStore from './login/login'
import useMainStore from './main/main'
const pinia = createPinia()

async function registerStore(app: App<Element>) {
  // 注册pinia
  app.use(pinia)
  //加载本地数据
  const loginStore = useLoginStore()
  loginStore.loadLocalDataAction()
  const mainStore = useMainStore()
  await mainStore.fetchEntireDataAction()
}

export default registerStore
