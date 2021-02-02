<template>
  <div class="zb_papar_qa">
    <div class="top_mainPanel">
      <input type="text" class="searchQa"  v-model="qustion"/>
      <button class="btn_pro_green btn1">查询</button>
    </div>
    <div class="bottom_mainPanel">
      <div class="left_bottom_mainPanel">
        <div class="bottom_mainPanel1">
          <ul>
            <li v-for="x in myKG11.nodes" :key="x.id">
              <span>实体名:</span>
              <h2>{{ x.name }}</h2>
              <span>实体标签:</span>
              <h2>{{ x.labels[0] }}</h2>
            </li>
          </ul>
        </div>
        <div class="bottom_mainPanel2">
          <ul>
            <li v-for="x in myKG11.links" :key="x.id">
              <span>三元组:</span>
              <h2>{{ x.target.name }}->{{ x.relation }}->{{ x.source.name }}</h2>
            </li>
          </ul>
        </div>
      </div>
      <div class="center_bottom_mainPanel"></div>
      <div class="right_bottom_mainPanel">
        <div class="qustion">
          <p>你提出的问题如下：</p>
          <h2>{{qustion}}</h2>
        </div>
        <div class="answer">
          <p>系统给出的结果如下：</p>
          <h2>{{answer}}</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import drawKG from "../../../assets/js/creatKG";
import axios from "axios";
export default {
  name: "kg_zb_qa",
  data() {
    return {
      path: this.globelV.pathID + "/user/project/zbSystem",
      qustion: '张三的朋友有哪些？',
      answer: '张三的朋友包括：李四，小红，小米等',
      myKG11: {
        nodes: [{ id: 0, color: "red", labels: ["person"], name: "机床1" }],
        links: [],
      },
    };
  },
  methods: {
    displayKg() {
      const _this = this;
      axios.get(_this.path + "/getAllEntity").then((res) => {
        _this.myKG11.nodes = res.data;
        axios.get(_this.path + "/getAllKg").then((res) => {
          _this.myKG11.links = res.data;
          // console.log(_this.myKG11.links);
          _this.myKG1.updataGraphs(_this.myKG11);
        });
      });
    }, //绘制知识图
  },
  mounted() {
    const _this = this;
    _this.myKG1 = new drawKG("center_bottom_mainPanel");
    _this.displayKg();
  },
};
</script>

<style scoped>
@import url("../../../assets/css/common/button.css");
@import url("../../../assets/css/zb_system/zb_papar_qa.css");
</style>