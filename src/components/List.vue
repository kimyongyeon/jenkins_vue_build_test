<template>
  <div v-for="(blog, id) in rxBlogs" :key="blog.id">
    <h5 @click="$router.push('/detail/' + id)">{{ blog.title }}</h5>
    <p>등록일자: {{ blog.date }}, 조회수: {{ blog.number }}</p>
    <pre>{{ blog.content }}</pre>
  </div>
</template>

<script>
import { blogs } from "../assets/blogs";

export default {
  name: "LiSt",
  beforeCreate() {
    console.log("List beforeCreate");
  },
  mounted() {
    console.log("List mounted");
    blogs.subscribe(
      (x) => {
        this.rxBlogs = x
        console.log(this.rxBlogs);
        },
      (err) => {
        console.log(err);
        this.rxBlogs = [];
      },
      () => console.log(),
    ); // 구독
  },
  data() {
    return {
      rxBlogs: [],
    };
  },
  // props: {
  //   blogs: Array,
  // },
};
</script>

<style></style>
