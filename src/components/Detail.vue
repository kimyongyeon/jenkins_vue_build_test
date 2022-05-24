<template>
  <div v-if="rxBlogs.length > 0">
    {{ rxBlogs[$route.params.id].title }}
    <router-view>
        
    </router-view>
  </div>
  <div v-else>
      loading...
  </div>
</template>

<script>
import { blogs } from "../assets/blogs";

export default {
  name: "DeTail",
  data() {
    return {
      rxBlogs: [],
    };
  },
  beforeCreate() {
    console.log("List mounted");
    blogs.subscribe( // rxjs로 로드하고 나서 화면에 출력하는 방법은 없을까?
      (x) => {
        this.rxBlogs = [...x];
      },
      (err) => {
        console.log(err);
        this.rxBlogs = [];
      },
      () => console.log()
    ); // 구독
  },
  mounted() {
      // 스스로 자답 : 화면에 플러그를 주고 처리하면 로딩을 하고 나서 그리는 것처럼 처리 됨
      // 무조건 로직에서만 풀려는 습성을 버리자. UI측면에서 가능한 부분을 고려해 보자. 
  },
};
</script>

<style></style>
