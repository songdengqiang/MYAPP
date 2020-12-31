<template>
  <div id="app" :style="{'background-image':`url(${img_path})`}">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      img_path: require('./assets/img/im_login0.jpg'),

    }
  },
  mounted () {
    const _this = this;
    let imgNameIndex = 1;
        //图片文本的添加
    setInterval(() => {
      if(imgNameIndex>11){
                imgNameIndex = 0;
      }
      _this.img_path = require(`./assets/img/im_login${imgNameIndex}.jpg`)
      imgNameIndex++;
    }, 11985);
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  position: absolute;
}
</style>
