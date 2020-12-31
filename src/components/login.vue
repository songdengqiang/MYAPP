<template>
  <div class="LG_container">
      <header class="c_header">
          <nav>
              <ul>
                  <li>个人图库</li>
                  <li>个人颜色表</li>
                  <li>音乐</li>
              </ul>
              <ul>
                  <li id="lg_li">登录</li>
                  <li>注册</li>
              </ul>
          </nav>
      </header>
      <main class="c_main">
          <aside class="aside_l">左侧悬浮条</aside>
          <div class="mainDiv">
              <div class="ulList">
                  <ul class="ulList_ul">
                      <li class="ulList_li titles">{{title}}</li>
                      <li class="ulList_li titles">在一起的时间:{{togethers}}</li>
                      <li class="ulList_li titles">提示:{{memorial_day}}</li>
                      <li class="ulList_li titles">{{times}}</li>
                      <li class="ulList_li titles">{{weathers}}</li>
                  </ul>
              </div>
            <!-- <hr>
            <div></div>
            <hr> -->
          </div>
          <aside class="aside_r">右侧悬浮条</aside>
      </main>
      <footer class="c_footer">
      </footer>
  </div>
</template>

<script>
import commonF from '../assets/js/common';
import axios from 'axios';
export default {
    name: 'login',
    data () {
        return {
            title: '生活是一支舞，傻瓜你是我唯一的舞伴!',
            togethers: '3年',
            memorial_day: '傻瓜的生日:1月1日',
            times: '2020-12-24-12:43',
            weathers: '🌤'
        }
    },
    mounted () {
        const _this = this;
        const pathId = _this.globelV.pathID + '/user/weathers'
        _this.times = commonF.getTime();
        // 时间的刷新
        setInterval(()=>{
            _this.times = commonF.getTime();
        },1000)
        // 在一起的时间计算
        let todays = new Date();
        let together = new Date('2016-06-26');
        _this.togethers = parseInt((todays-together)/1000/60/60/24) + '天';
        // 获取本地的天气状况（使用免费的API）
        axios.get(pathId).then((res)=>{
            _this.weathers = `${res.data.descript} - ${res.data.temperature} - ${res.data.wind}`
        })
    }
}
</script>

<style scoped>
@import url('../assets/css/common/header.css');
@import url('../assets/css/common/main.css');
@import url('../assets/css/common/footer.css');
@import url('../assets/css/common/ulList.css');
@import url('../assets/css/common/fontColor.css');
@import url('../assets/css/login.css');

</style>