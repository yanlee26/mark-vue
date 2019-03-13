import { Store, install } from './store'
import { mapState, mapMutations, mapGetters, mapActions, createNamespacedHelpers } from './helpers'
/*集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化:
不管在树的哪个位置，任何组件都能获取状态或者触发行为*/
export default {
  Store,
  install,
  version: '__VERSION__',
  mapState,
  mapMutations,
  mapGetters,
  mapActions,
  createNamespacedHelpers
}
/**
 * 当我们的应用遇到多个组件共享状态时，单向数据流的简洁性很容易被破坏:
 * 多个视图依赖于同一状态:传参的方法对于多层嵌套(props)的组件将会非常繁琐，并且对于兄弟组件间的状态传递无能为力
 * 来自不同视图的行为需要变更同一状态:父子组件直接引用或者通过事件(emit/on)来变更和同步状态的多份拷贝
 */

 /**
  * Vuex 和单纯的全局对象有以下两点不同：
  * 1:Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。
  * 2:你不能直接改变 store 中的状态。改变 store 中的状态的唯一途径就是显式地提交 (commit) mutation
  *这样使得我们可以方便地跟踪每一个状态的变化，从而让我们能够实现一些工具帮助我们更好地了解我们的应用。
  */