import About from "../views/About";
import Sessions from "../views/Sessions";
import SessionDetails from "../views/SessionDetails";
import AddSessionReview from "../views/AddSessionReview";
import SessionReviews from "../views/SessionReviews";

const routes = [
  {
    path: "/",
    name: "Home",
    redirect: "/sessions"
  },
  {
    path: "/about",
    name: "About",
    component: About
  },
  {
    path: "/sessions",
    name: "Sessions",
    component: Sessions
  },
  {
    path: "/sessions/:sessionId",
    name: "SessionDetails",
    props: true,
    component: SessionDetails,
    children: [
      {
        path: "add-session-review",
        name: "AddSessionReview",
        props: true,
        components: {
          session: AddSessionReview
        }
      },
      {
        path: "session-reviews",
        name: "SessionReviews",
        props: true,
        components: {
          session: SessionReviews
        }
      }
    ]
  }
];

export default routes;
