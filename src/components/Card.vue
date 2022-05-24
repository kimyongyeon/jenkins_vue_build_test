<template>
  <div v-for="(product, i) in products" :key="product.id">
    <!-- 왜 이미지 태그에서 :src에서 i를 넘기면 사진로드를 바로 못하지? -->
    <img class="room-img" :src="product.image" alt="" />
    <h4 @click="detailOpen(product)" class="red cur-pointer" :style="스타일">
      {{ product.title }}
    </h4>
    <p>{{ priceFormat(product.price) }} 만원</p>
    <button @click="increase(i)">허위매물신고</button>
    <span>신고수: {{ counts[i] }}</span>
  </div>
</template>

<script>
export default {
  name: "CaRd",
  props: {
      products: Array,
      priceFormat: Function,
      increase: Function,
      counts: Number,
      detailOpen: Function,
  },
};
</script>

<style></style>
