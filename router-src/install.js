import View from './components/view'
import Link from './components/link'

export let _Vue

export function install(Vue) {
  if (install.installed && _Vue === Vue) return
  install.installed = true

  _Vue = Vue

  const isDef = v => v !== undefined

  const registerInstance = (vm, callVal) => {
    let i = vm.$options._parentVnode
    if (isDef(i) && isDef(i = i.data) && isDef(i = i.registerRouteInstance)) {
      i(vm, callVal)
    }
  }
  //混入全局： 最重要的一步就是利用 Vue.mixin 去把 beforeCreate 和 destroyed 钩子函数注入到每一个组件中
  Vue.mixin({
    beforeCreate() {
      if (isDef(this.$options.router)) {
        this._routerRoot = this
        this._router = this.$options.router
        this._router.init(this)
        Vue.util.defineReactive(this, '_route', this._router.history.current)
      } else {
        //全局根路由
        this._routerRoot = (this.$parent && this.$parent._routerRoot) || this
      }
      registerInstance(this, this)
    },
    destroyed() {
      registerInstance(this)
    }
  })
  // $router包含更多的路由信息：VueRouter 的实例 router，它是在 new Vue 的时候传入的
  Object.defineProperty(Vue.prototype, '$router', {
    get() {
      return this._routerRoot._router
    }
  })
  // 把 this._route 变成响应式对象
  Object.defineProperty(Vue.prototype, '$route', {
    get() {
      return this._routerRoot._route
    }
  })

  Vue.component('RouterView', View)
  Vue.component('RouterLink', Link)

  const strats = Vue.config.optionMergeStrategies
  // use the same hook merging strategy for route hooks
  strats.beforeRouteEnter = strats.beforeRouteLeave = strats.beforeRouteUpdate = strats.created
}