import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _4886100d = () => interopDefault(import('../client/pages/dogs/index.vue' /* webpackChunkName: "pages/dogs/index" */))
const _4a36196c = () => interopDefault(import('../client/pages/dogs/_breed.vue' /* webpackChunkName: "pages/dogs/_breed" */))
const _a9949ae2 = () => interopDefault(import('../client/pages/index.vue' /* webpackChunkName: "pages/index" */))

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/dogs",
    component: _4886100d,
    name: "dogs"
  }, {
    path: "/dogs/:breed",
    component: _4a36196c,
    name: "dogs-breed"
  }, {
    path: "/",
    component: _a9949ae2,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
