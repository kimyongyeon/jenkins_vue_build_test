import { createWebHistory, createRouter } from "vue-router";
import List from "./components/List";
import Card from './components/Card';
import Detail from './components/Detail';
import Home from './components/Home';
import Author from './components/Author';
import Comment from './components/Comment';

const isLogin = true;

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/list",
    component: List,
    beforeEnter: (to, from) => { 
        console.log(from.fullPath); // 출발 페이지 
        return to.fullPath; // 목적지 페이지 
    }
  },
  {
      path: '/card', // 순서 유의해서 위에서 부터 보여준다. 아래는 안보임.
      component: Card,
      beforeEnter: () => { // 가로챈다. 로그인 체크 이후 페이지를 전환하고 싶을때... 
        // 모든 페이지를 전체 적용할려면 어떻게 해야 할까? 함수를 만들어서 각각 라우터 beforeEnter에 넣어줘야 하나?
        // 필터 같은 기능은 없나?
        // 공통에서 AOP같이 처리할 순 없나?
        // 뭔가 편리한데 sugar syntax가 너무 많다. 
        // 보일러플레이트 코드가 많으면 피곤하고 버그가 많아지는데 이게 과연 옳은 코드인가 의심스럽다. 
          if (isLogin == false) {
              return "/list";
          }
      }
  },
  {
      path: '/detail/:id', // /detail/아무문자 
      component: Detail,
      children: [
          {
              path: "author",
              component: Author
          },
          {
              path: "comment",
              component: Comment
          }
      ]
  },
//   {
//       path: '/detail/:anything(.*)', // 404 페이지 
//       component: Detail,
//   },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
