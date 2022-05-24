<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <router-link class="navbar-brand" aria-current="page" to="/"
        >VueJS3 World</router-link
      >
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/list">목록</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/card">카드</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/detail">상세페이지</router-link>
          </li>
        </ul>
        <form class="d-flex">
          <input
            class="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
    </div>
  </nav>

  <!-- 트랜지션 태그를 쓰면 빡대가리이여도 개발하기 쉽다. -->
  <transition name="fade">
    <Modal
      @openModal="modalOpen = $event"
      :products="products"
      :modalOpen="modalOpen"
      :idx="idx"
      :priceFormat="priceFormat"
    />
  </transition>

  <!-- <Menu /> -->

  <div class="mt-2">
    <button @click="priceSort">가격순정렬</button>
    <button @click="priceRevertSort">가격역순정렬</button>
    <button @click="ganaSort">가나다순정렬</button>
    <button @click="sortBack">되돌리기</button>
  </div>

  <transition name="fade">
    <Discount :class="disCountHide ? 'discount-hidden' : ''" />
  </transition>

  <div class="mt-5"></div>

  <router-view
      :products="products"
      :counts="counts"
      :detailOpen="detailOpen"
      :priceFormat="priceFormat"
      :increase="increase"
    ></router-view>

  <!-- <Card
    :products="products"
    :counts="counts"
    :detailOpen="detailOpen"
    :priceFormat="priceFormat"
    :increase="increase"
  /> -->
</template>

<script>
import oneroom from "@/assets/oneroom";
import Discount from "@/components/Discount.vue";
import Modal from "@/components/Modal.vue";
// import Menu from "@/components/Menu.vue";
// import Card from "@/components/Card.vue";

export default {
  name: "App",
  setup() {
    // onMounted(() => {
    //   // ajax 하고 나서 호출하는 코드 작성
    //   // this를 못찾는다. 이유가 뭘까?
    //   console.log(this);
    //   console.log("컴포넌트가 mounted 되었습니다.!");
    //   setTimeout(() => {
    //     console.log(this);
    //     this.disCountHide = true;
    //   }, 3000);
    // });
  },
  mounted() {
    setTimeout(() => {
      console.log(this);
      this.disCountHide = true;
    }, 3000);
  },
  beforeCreate() {
    // 훅: 낚시를 건다.
  },
  data() {
    return {
      modalOpen: false,
      disCountHide: false,
      modalTitle: "",
      modalDetail: "",
      modalPrice: 0,
      idx: 0,
      스타일: "color: red;",
      backProducts: [...oneroom],
      products: [...oneroom], // products 내용을 모달로 어떻게 보낼까?
      counts: [1, 2, 3],
      menus: [
        { title: "Home", url: "/home" },
        { title: "Products", url: "/products" },
        { title: "about", url: "/about" },
      ],
    };
  },
  methods: {
    increase(i) {
      this.counts[i]++;
    },
    isModalOpen() {
      this.modalOpen = false;
    },
    detailOpen(p) {
      this.modalOpen = !this.modalOpen;
      // 데이터 중심적으로 생각해야 한다.
      // 왜 나는 처음부터 products를 올려서 index를 넘겨 처리할 생각을 못했을까?
      // 점점 코딩을 안하니 바보가 되는거 같다.
      // this.modalTitle = p.title; // 이렇게 만들어서 반드시 넘겨야 하는가?
      // this.modalDetail = p.content;
      // this.modalPrice = p.price;
      this.idx = p.id;
    },
    priceFormat(n) {
      return new Intl.NumberFormat().format(n);
    },
    priceSort() {
      var array = [3, 5, 2]; // 문자순 정렬
      array.sort((a, b) => a - b); // a-b가 음수면 왼쪽으로 보낸다.
      this.products.sort((a, b) => a.price - b.price); // 원본데이터 보존 안됨
    },
    sortBack() {
      this.products = [...this.backProducts];
    },
    priceRevertSort() {
      // 역순
      this.products.sort((a, b) => b.price - a.price);
    },
    ganaSort() {
      // 가나다라순
      this.products.sort((a, b) => (a.title[0] < b.title[0] ? -1 : 1));
    },
  },
  components: {
    Discount,
    Modal,
    // Menu,
    // Card,
  },
};
</script>

<style>
.fade-leave-from {
  transform: translateY(0px);
  opacity: 1;
}
.fade-leave-active {
  transition: all 1s;
}
.fade-leave-to {
  opacity: 0;
  transform: translateY(-1000px);
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(-1000px);
}
.fade-enter-active {
  transition: all 1s;
}
.fade-enter-to {
  opacity: 1;
  transform: translateY(0px);
}

.start {
  opacity: 0;
  transition: all 1s;
}

.end {
  opacity: 1;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.discount-hidden {
  display: none;
}

a {
  text-decoration: none;
  font-weight: bold;
}

.cur-pointer {
  cursor: pointer;
}

button {
  border-radius: 5px;
  background: darkolivegreen;
  color: white;
  font-weight: bold;
  border: 3px solid darkgoldenrod;
  cursor: pointer;
  height: 40px;
  box-sizing: border-box;
}

.room-img {
  width: 100%;
  margin-top: 40px;
}

body {
  margin: 0;
}

div {
  box-sizing: border-box;
}
</style>
