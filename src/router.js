import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

import Layout from "@/layout";
/**
 * baseRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const baseRoutes = [
  {
    path: "/404",
    component: () => import(/* webpackChunkName: "404" */ "@/views/404"),
    hidden: true
  },
  {
    path: "/",
    component: Layout,
    redirect: "/index"
  },
  {
    path: "/index",
    component: Layout,
    redirect: "/index/index",
    children: [
      {
        path: "index",
        name: "index",
        component: () =>
          import(/* webpackChunkName: "helper" */ "@/views/index/index.vue"),
        meta: {
          title: "组件布局",
        },
        hidden: true
      }
    ],
    meta: { title: "组件布局" }
  },
  {
    path: "/manage",
    component: Layout,
    redirect: "/manage/manage",
    children: [
      {
        path: "manage",
        name: "manage",
        component: () =>
          import(/* webpackChunkName: "helper" */ "@/views/manage/index.vue"),
        meta: {
          title: "组件管理",
        },
        hidden: true
      }
    ],
    meta: { title: "组件管理" }
  },
  {
    path: "/dynamic",
    component: Layout,
    redirect: "/dynamic/dynamic",
    children: [
      {
        path: "dynamic",
        name: "dynamic",
        component: () =>
          import(/* webpackChunkName: "helper" */ "@/views/dynamic/index.vue"),
        meta: {
          title: "动态组件",
        },
        hidden: true
      }
    ],
    meta: { title: "动态组件" }
  },
  // 404 page must be placed at the end !!!
  { path: "*", redirect: "/404", hidden: true }
];

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: baseRoutes
  });
const router = createRouter();

export default router;
