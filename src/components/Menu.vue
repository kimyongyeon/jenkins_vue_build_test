<template>
  <div class="menu">
    <a v-for="(menu, i) in menus" :key="i" :href="menu.url">{{ menu.title }}</a>
  </div>
</template>

<script>
export default {
  name: "MeNu",
  data() {
    return {
      menus: [
        { title: "Home", url: "/home" },
        { title: "Products", url: "/products" },
        { title: "about", url: "/about" },
      ],
    };
  },
};
</script>

<style>
.menu {
  background: darkslateblue;
  padding: 15px;
  border-radius: 5px;
}

.menu a {
  color: white;
  padding: 10px;
}
</style>
