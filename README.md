# vue 源码解析

> Vue.js 提供了 2 个版本，一个是 Runtime + Compiler 的，一个是 Runtime only 的，前者是包含编译代码的，可以把编译过程放在运行时做，后者是不包含编译代码的，需要借助 webpack 的 vue-loader 事先把模板编译成 render函数。
##  目录结构

```
├── flow: facebook 出品的 JavaScript 静态类型检查工具（类型推断，类型注释）。
│   ├── compiler.js
│   ├── component.js
│   ├── global-api.js
│   ├── modules.js
│   ├── options.js
│   ├── ssr.js
│   ├── vnode.js
│   └── weex.js
├── .flowconfig flow配置文件
├── package.json
├── packages
│   ├── vue-server-renderer
│   │   ├── basic.js
│   │   ├── build.dev.js
│   │   ├── build.prod.js
│   │   ├── client-plugin.d.ts
│   │   ├── client-plugin.js
│   │   ├── index.js
│   │   ├── package.json
│   │   ├── README.md
│   │   ├── server-plugin.d.ts
│   │   ├── server-plugin.js
│   │   └── types
│   │       ├── index.d.ts
│   │       ├── plugin.d.ts
│   │       └── tsconfig.json
│   ├── vue-template-compiler
│   │   ├── browser.js
│   │   ├── build.js
│   │   ├── index.js
│   │   ├── package.json
│   │   ├── README.md
│   │   └── types
│   │       ├── index.d.ts
│   │       ├── test.ts
│   │       └── tsconfig.json
│   ├── weex-template-compiler
│   │   ├── build.js
│   │   ├── index.js
│   │   ├── package.json
│   │   └── README.md
│   └── weex-vue-framework
│       ├── factory.js
│       ├── index.js
│       ├── package.json
│       └── README.md
├── README.md
├── scripts： Vue.js 所有编译相关的代码。它包括把模板解析成 ast 语法树，ast 语法树优化，代码生成等功能。
│   ├── alias.js
│   ├── build.js
│   ├── config.js
│   ├── feature-flags.js
│   ├── gen-release-note.js
│   ├── get-weex-version.js
│   ├── git-hooks
│   │   ├── commit-msg
│   │   └── pre-commit
│   ├── release-weex.sh
│   ├── release.sh
│   └── verify-commit-msg.js
├── src Vue源码所在
│   ├── compiler 编译
│   │   ├── codeframe.js
│   │   ├── codegen
│   │   │   ├── events.js
│   │   │   └── index.js
│   │   ├── create-compiler.js
│   │   ├── directives
│   │   │   ├── bind.js
│   │   │   ├── index.js
│   │   │   ├── model.js
│   │   │   └── on.js
│   │   ├── error-detector.js
│   │   ├── helpers.js
│   │   ├── index.js
│   │   ├── optimizer.js
│   │   ├── parser
│   │   │   ├── entity-decoder.js
│   │   │   ├── filter-parser.js
│   │   │   ├── html-parser.js
│   │   │   ├── index.js
│   │   │   └── text-parser.js
│   │   └── to-function.js
│   ├── core 核心：内置组件、全局 API 封装，Vue 实例化、观察者、虚拟 DOM、工具函数等等
│   │   ├── components
│   │   │   ├── index.js
│   │   │   └── keep-alive.js
│   │   ├── config.js
│   │   ├── global-api
│   │   │   ├── assets.js
│   │   │   ├── extend.js
│   │   │   ├── index.js
│   │   │   ├── mixin.js
│   │   │   └── use.js
│   │   ├── index.js <mark>初始化Vue
│   │   ├── instance
│   │   │   ├── events.js
│   │   │   ├── index.js
│   │   │   ├── init.js
│   │   │   ├── inject.js
│   │   │   ├── lifecycle.js
│   │   │   ├── proxy.js
│   │   │   ├── render-helpers
│   │   │   │   ├── bind-dynamic-keys.js
│   │   │   │   ├── bind-object-listeners.js
│   │   │   │   ├── bind-object-props.js
│   │   │   │   ├── check-keycodes.js
│   │   │   │   ├── index.js
│   │   │   │   ├── render-list.js
│   │   │   │   ├── render-slot.js
│   │   │   │   ├── render-static.js
│   │   │   │   ├── resolve-filter.js
│   │   │   │   ├── resolve-scoped-slots.js
│   │   │   │   └── resolve-slots.js
│   │   │   ├── render.js
│   │   │   └── state.js
│   │   ├── observer
│   │   │   ├── array.js
│   │   │   ├── dep.js
│   │   │   ├── index.js
│   │   │   ├── scheduler.js
│   │   │   ├── traverse.js
│   │   │   └── watcher.js
│   │   ├── util
│   │   │   ├── debug.js
│   │   │   ├── env.js
│   │   │   ├── error.js
│   │   │   ├── index.js
│   │   │   ├── lang.js
│   │   │   ├── next-tick.js
│   │   │   ├── options.js
│   │   │   ├── perf.js
│   │   │   └── props.js
│   │   └── vdom
│   │       ├── create-component.js
│   │       ├── create-element.js
│   │       ├── create-functional-component.js
│   │       ├── helpers
│   │       │   ├── extract-props.js
│   │       │   ├── get-first-component-child.js
│   │       │   ├── index.js
│   │       │   ├── is-async-placeholder.js
│   │       │   ├── merge-hook.js
│   │       │   ├── normalize-children.js
│   │       │   ├── normalize-scoped-slots.js
│   │       │   ├── resolve-async-component.js
│   │       │   └── update-listeners.js
│   │       ├── modules
│   │       │   ├── directives.js
│   │       │   ├── index.js
│   │       │   └── ref.js
│   │       ├── patch.js
│   │       └── vnode.js
│   ├── platforms多平台
│   │   ├── web：web上
│   │   │   ├── compiler
│   │   │   │   ├── directives
│   │   │   │   │   ├── html.js
│   │   │   │   │   ├── index.js
│   │   │   │   │   ├── model.js
│   │   │   │   │   └── text.js
│   │   │   │   ├── index.js
│   │   │   │   ├── modules
│   │   │   │   │   ├── class.js
│   │   │   │   │   ├── index.js
│   │   │   │   │   ├── model.js
│   │   │   │   │   └── style.js
│   │   │   │   ├── options.js
│   │   │   │   └── util.js
│   │   │   ├── entry-compiler.js
│   │   │   ├── entry-runtime-with-compiler.js <mark>Vue总入口文件
│   │   │   ├── entry-runtime.js
│   │   │   ├── entry-server-basic-renderer.js
│   │   │   ├── entry-server-renderer.js
│   │   │   ├── runtime
│   │   │   │   ├── class-util.js
│   │   │   │   ├── components
│   │   │   │   │   ├── index.js
│   │   │   │   │   ├── transition-group.js
│   │   │   │   │   └── transition.js
│   │   │   │   ├── directives
│   │   │   │   │   ├── index.js
│   │   │   │   │   ├── model.js
│   │   │   │   │   └── show.js
│   │   │   │   ├── index.js <mark>Vue入口
│   │   │   │   ├── modules
│   │   │   │   │   ├── attrs.js
│   │   │   │   │   ├── class.js
│   │   │   │   │   ├── dom-props.js
│   │   │   │   │   ├── events.js
│   │   │   │   │   ├── index.js
│   │   │   │   │   ├── style.js
│   │   │   │   │   └── transition.js
│   │   │   │   ├── node-ops.js
│   │   │   │   ├── patch.js
│   │   │   │   └── transition-util.js
│   │   │   ├── server
│   │   │   │   ├── compiler.js
│   │   │   │   ├── directives
│   │   │   │   │   ├── index.js
│   │   │   │   │   ├── model.js
│   │   │   │   │   └── show.js
│   │   │   │   ├── modules
│   │   │   │   │   ├── attrs.js
│   │   │   │   │   ├── class.js
│   │   │   │   │   ├── dom-props.js
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── style.js
│   │   │   │   └── util.js
│   │   │   └── util
│   │   │       ├── attrs.js
│   │   │       ├── class.js
│   │   │       ├── compat.js
│   │   │       ├── element.js
│   │   │       ├── index.js
│   │   │       └── style.js
│   │   └── weex：native上
│   │       ├── compiler
│   │       │   ├── directives
│   │       │   │   ├── index.js
│   │       │   │   └── model.js
│   │       │   ├── index.js
│   │       │   └── modules
│   │       │       ├── append.js
│   │       │       ├── class.js
│   │       │       ├── index.js
│   │       │       ├── props.js
│   │       │       ├── recycle-list
│   │       │       │   ├── component-root.js
│   │       │       │   ├── component.js
│   │       │       │   ├── index.js
│   │       │       │   ├── recycle-list.js
│   │       │       │   ├── text.js
│   │       │       │   ├── v-bind.js
│   │       │       │   ├── v-for.js
│   │       │       │   ├── v-if.js
│   │       │       │   ├── v-on.js
│   │       │       │   └── v-once.js
│   │       │       └── style.js
│   │       ├── entry-compiler.js
│   │       ├── entry-framework.js
│   │       ├── entry-runtime-factory.js
│   │       ├── runtime
│   │       │   ├── components
│   │       │   │   ├── index.js
│   │       │   │   ├── richtext.js
│   │       │   │   ├── transition-group.js
│   │       │   │   └── transition.js
│   │       │   ├── directives
│   │       │   │   └── index.js
│   │       │   ├── index.js
│   │       │   ├── modules
│   │       │   │   ├── attrs.js
│   │       │   │   ├── class.js
│   │       │   │   ├── events.js
│   │       │   │   ├── index.js
│   │       │   │   ├── style.js
│   │       │   │   └── transition.js
│   │       │   ├── node-ops.js
│   │       │   ├── patch.js
│   │       │   ├── recycle-list
│   │       │   │   ├── render-component-template.js
│   │       │   │   └── virtual-component.js
│   │       │   └── text-node.js
│   │       └── util
│   │           ├── element.js
│   │           ├── index.js
│   │           └── parser.js
│   ├── server服务端:服务端node
│   │   ├── bundle-renderer
│   │   │   ├── create-bundle-renderer.js
│   │   │   ├── create-bundle-runner.js
│   │   │   └── source-map-support.js
│   │   ├── create-basic-renderer.js
│   │   ├── create-renderer.js
│   │   ├── optimizing-compiler
│   │   │   ├── codegen.js
│   │   │   ├── index.js
│   │   │   ├── modules.js
│   │   │   ├── optimizer.js
│   │   │   └── runtime-helpers.js
│   │   ├── render-context.js
│   │   ├── render-stream.js
│   │   ├── render.js
│   │   ├── template-renderer
│   │   │   ├── create-async-file-mapper.js
│   │   │   ├── index.js
│   │   │   ├── parse-template.js
│   │   │   └── template-stream.js
│   │   ├── util.js
│   │   ├── webpack-plugin
│   │   │   ├── client.js
│   │   │   ├── server.js
│   │   │   └── util.js
│   │   └── write.js
│   ├── sfc .vue文件解析:.vue->JSObject
│   │   └── parser.js
│   └── shared (B/S)共享代码
│       ├── constants.js
│       └── util.js
└── yarn.lock
```