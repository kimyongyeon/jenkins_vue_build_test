<template>
  <div class="black-bg" v-if="modalOpen === true">
    <div class="white-bg">
      <h4>제목 - {{ products[idx].title }}</h4>
      <img :src="products[idx].image" alt="" />
      <p>{{ products[idx].content }}</p>
      <p>{{ priceFormat(products[idx].price) }} 만원</p>
      <!-- props에서 받은 값은 수정이 안된다. props를 쓰면 복잡도가 늘어난다.  -->
      <!-- 데이터 만드는 공간/위치가 중요하다. -->
      <!-- 자식위치에서 데이터를 만들 수 있지만, 부모도 쓰면 부모한테 만들어라 -> 원칙 -->
      <!-- 위로는 보내기 어렵다. 아래로 보내는건 props로 쉽게 전송가능 하다.  -->
      <input v-model="month" />
      <input type="range" min="1" max="12">
      <!-- <input @input="month = $event.target.value" /> -->
      <p> {{ priceFormat(month) }} 개월 선택함 : {{priceFormat(products[idx].price * month)}} 원</p>
      <button @click="messageSend">닫기</button>
    </div>
  </div>
  <!-- <div v-else>모달창숨김 - 닫기버튼 구현 남음 <br /></div> -->
</template>

<script>
export default {
  name: "MoDal",
  props: {
    products: Array,
    idx: Number,
    modalOpen: Boolean,
    priceFormat: Function,
  },
  data() {
      return {
          month: 0,
          date: 1234,
      }
  },
  watch: { // 감시, 변수와 똑같은 이름으로 만들면 감시한다. 
      month(a, b){ // a: 변경전 데이터, b: 변경후 데이터 
          // 사용자가 month에 입력한 데이터가 13보다 크면
          // 경고문 띄우기 
          if (a.length >= 2) {
              alert('13이상 입력하지 마셈' + b);
              a = b;
              // 더이상 진행 하기 싫다?
          }
          // 사용자가 month를 글자로 입력하면
          // 경고문을 띄워주셈 
      },
      date() {

      }
  },
  methods: {
      messageSend() {
          // 자식에서 부모로 데이터를 보낼때는 메세지를 이용하라. $emit
          // 부모에서는 자식이 보낸 메세지를 $event로 받을 수 있다.
          this.$emit('openModal', false);
      }
  }
};
</script>

<style>
.black-bg {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  padding: 20px;
}

.white-bg {
  width: 100%;
  background: white;
  border-radius: 8px;
  padding: 20px;
}

.white-bg img {
  width: 100%;
}
</style>
