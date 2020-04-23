<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  mounted() {
    this.$send({
      url: 'https://v1.alapi.cn/api/hitokoto',
      method: 'get',
      barShow: true,
      containerShow: true,
      targetDom: '.home'
    }).then(res => console.log(res))

    // myServer.send('get','https://v1.alapi.cn/api/hitokoto',{},{},'.home')
  }
}
</script>
