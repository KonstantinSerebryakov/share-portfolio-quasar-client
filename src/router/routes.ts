import { validateJWT } from 'src/services/utility/jwtLocalStorage';
import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      //TODO: pages
      //list of personal documents !auth
      { path: '', component: () => import('src/pages/Index.Page.vue') },
      //profile settings !AUTH
      {
        path: 'account',
        component: () => import('src/pages/Account.Page.vue'),
      },
      //document editing !AUTH
      {
        path: 'document/:id',
        component: () => import('src/pages/DocumentEdit.Page.vue'),
      },
      /*
      //list of all docs !?AUTH?
      {
        path: 'public',
        component: () => import('src/pages/ErrorNotFound.vue'),
      },
       */
      //public document page !PUBLIC
      {
        path: 'public/<email>/<name>',
        component: () => import('src/pages/ErrorNotFound.vue'),
      },
    ],
    beforeEnter: (to, from, next) => {
      // Check authentication before entering any child route
      console.log(to.path);
      switch (to.path) {
        case '': {
          break;
        }
      }
      if (!validateJWT()) {
        next('/signin'); // Redirect to the login page or another route for unauthenticated users
      } else {
        next(); // Proceed to the requested child route
      }
    },
  },
  {
    path: '/signin',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/SignIn.Page.vue') },
    ],
  },
  {
    path: '/signup',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/SignUp.Page.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
