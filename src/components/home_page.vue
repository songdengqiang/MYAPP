<template>
  <div class="LG_container">
    <header class="c_header">
      <nav>
        <ul>
          <li @click="module_choose(1)">电影</li>
          <li @click="module_choose(2)">颜色表</li>
          <li @click="module_choose(3)">音乐</li>
          <li @click="module_choose(4)">个人计划</li>
          <li @click="module_choose(5)">功能模块</li>
          <li @click="module_choose(6)">项目</li>
        </ul>
        <ul>
          <li id="lg_li" v-show="showR">登录</li>
          <li v-show="showR">注册</li>
          <li v-show="!showR" list="setting">
            <img :src="author_icon" alt="登录头像" class="author_icon" />
            <select class="setting_value">
              <option value="设置">设置</option>
              <option value="退出登录">退出登录</option>
              <option value="退出登录">切换用户</option>
            </select>
          </li>
        </ul>
      </nav>
    </header>
    <main class="c_main">
      <aside class="aside_l aside_2">
        <ul class="aside_text img_con"></ul>
      </aside>
      <div class="mainDiv">
        <!-- 默认显示内容 -->
        <div class="ulList" v-show="display">
          <ul class="ulList_ul">
            <li class="ulList_li titles" id="li_style">{{ title }}</li>
            <li class="ulList_li titles" id="li_style">
              在一起的时间:{{ togethers }}
            </li>
            <li class="ulList_li titles" id="li_style">
              提示:{{ memorial_day }}
            </li>
            <li class="ulList_li titles" id="li_style">{{ times }}</li>
            <li class="ulList_li titles" id="li_style">{{ weathers }}</li>
          </ul>
        </div>
        <!-- 主要的功能界面 -->
        <div class="moduless" v-show="!display">
          <div>
            <img
              src="../assets/icon/delete.svg"
              alt="关闭"
              @click="module_choose(0)"
            />
          </div>
          <div>
            <router-view></router-view>
          </div>
        </div>
      </div>
      <aside class="aside_r">右侧悬浮条</aside>
    </main>
    <footer class="c_footer">
      <ul v-show="!display">
        <li class="titles">在一起的时间:{{ togethers }}</li>
        <li class="titles">提示:{{ memorial_day }}</li>
        <li class="titles">{{ times }}</li>
        <li class="titles">{{ weathers }}</li>
      </ul>
    </footer>
  </div>
</template>

<script>
import commonF from "../assets/js/common";
import axios from "axios";
import * as d3 from "d3";
export default {
  name: "home_page",
  data() {
    return {
      title: "生活是一支舞，傻瓜你是我唯一的舞伴!",
      togethers: "3年",
      memorial_day: "傻瓜的生日:1月1日",
      times: "2020-12-24-12:43",
      display: true,
      weathers: "🌤",
      showR: false,
      author_icon: require("../assets/img/im_login11.jpg"),
    };
  },
  methods: {
    module_choose(num) {
      const _this = this;
      _this.display = false;
      switch (num) {
        case 0:
          _this.display = true;
          _this.$router.push({ path: "/home_page" });
          break;
        case 1:
          _this.$router.push({ path: "/home_page/movies" });
          break;
        case 2:
          _this.$router.push({ path: "/home_page/colorGrid" });
          break;
        case 3:
          _this.$router.push({ path: "/home_page/musics" });
          break;
        case 4:
          _this.$router.push({ path: "/home_page/schedule" });
          break;
        case 5:
          _this.$router.push({ path: "/home_page/funpage" });
          break;
        case 6:
          _this.$router.push({ path: "/home_page/projectpage" });
          break;
      }
    },
  },
  mounted() {
    const _this = this;
    const pathId = _this.globelV.pathID + "/user/weathers";
    _this.times = commonF.get_today_time()[0];
    setInterval(() => {
      _this.times = commonF.get_today_time()[0];
    }, 1000);
    // 在一起的时间计算
    let todays = new Date();
    let together = new Date("2016-06-26");
    _this.togethers =
      parseInt((todays - together) / 1000 / 60 / 60 / 24) + "天";
    // 获取本地的天气状况（使用免费的API）
    axios.get(pathId).then((res) => {
      _this.weathers = `${res.data.descript} - ${res.data.temperature} - ${res.data.wind}`;
    });
  },
};
</script>

<style scoped>
@import url("../assets/css/common/option.css");
@import url("../assets/css/common/fontColor.css");
@import url("../assets/css/common/main.css");
@import url("../assets/css/common/header.css");
@import url("../assets/css/common/footer.css");
@import url("../assets/css/common/ulList.css");
@import url("../assets/css/common/module.css");
@import url("../assets/css/home_pageC/home_page.css");
</style>