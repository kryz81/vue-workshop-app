import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home";
import Login from "../views/Login";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/sessions",
    name: "Sessions",
    component: () =>
      import(/* webpackChunkName: "sessions" */ "../views/Sessions.vue")
  },
  {
    path: "/sessions/:sessionId",
    name: "SessionDetails",
    props: true,
    component: () =>
      import(/* webpackChunkName: "sessions" */ "../views/SessionDetails.vue"),
    children: [
      {
        path: "add-session-review",
        name: "AddSessionReview",
        props: true,
        components: {
          session: () =>
            import(
              /* webpackChunkName: "sessions" */ "../views/AddSessionReview.vue"
            )
        }
      },
      {
        path: "session-reviews",
        name: "SessionReviews",
        props: true,
        components: {
          session: () =>
            import(
              /* webpackChunkName: "sessions" */ "../views/SessionReviews.vue"
            )
        }
      }
    ]
  },
  {
    path: "/planner",
    name: "Planner",
    component: () =>
      import(/* webpackChunkName: "planner" */ "../views/Planner.vue")
  },
  {
    path: "*",
    name: "NotFound",
    component: () =>
      import(/* webpackChunkName: "notfound" */ "../views/NotFound.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
