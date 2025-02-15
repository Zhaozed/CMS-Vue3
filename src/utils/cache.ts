// 但有时候需要缓存一些复杂的对象，例如用户信息对象、设置配置等。直接使用原生浏览器缓存API存储这些对象时需要手动进行JSON序列化和反序列化操作，过程相对繁琐
// 为了方便管理和操作浏览器的本地缓存和会话缓存，所以封装一个通用的工具类来处理这些操作
enum CacheType {
  Local,
  Session
}

class Cache {
  storage: Storage

  constructor(type: CacheType) {
    this.storage = type === CacheType.Local ? localStorage : sessionStorage
  }

  setCache(key: string, value: any) {
    // JSON.stringify() 方法用于将 JavaScript 值转换为 JSON 字符串
    this.storage.setItem(key, JSON.stringify(value))
  }

  getCache(key: string) {
    const value = this.storage.getItem(key)

    // 避免 "undefined"（字符串）或 null/undefined 影响 JSON 解析
    if (!value || value === 'undefined' || value === 'null') {
      return null // 直接返回 null，避免 JSON 解析错误
    }

    try {
      return JSON.parse(value)
    } catch (error) {
      console.error(`Failed to parse JSON for key "${key}":`, error)
      this.removeCache(key) // 解析失败后清除缓存
      return null
    }
  }

  removeCache(key: string) {
    this.storage.removeItem(key)
  }

  clear() {
    this.storage.clear()
  }
}

const localCache = new Cache(CacheType.Local)
const sessionCache = new Cache(CacheType.Session)

export { localCache, sessionCache }
