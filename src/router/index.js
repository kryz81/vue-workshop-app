import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
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
        path: "session-review",
        name: "SessionReview",
        props: true,
        components: {
          session: () =>
            import(
              /* webpackChunkName: "sessions" */ "../views/SessionReview.vue"
            )
        }
      }
    ]
  },
  {
    path: "/planner",
    name: "Planner",
    components: {
      default: Home
    }
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
