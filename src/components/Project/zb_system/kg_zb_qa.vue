<template>
  <div class="zb_papar_qa">
    <div class="top_mainPanel">
      <input type="text" class="searchQa" v-model="qustion" />
      <button class="btn_pro_green btn1" @click="searchQ()">查询</button>
    </div>
    <div class="bottom_mainPanel">
      <div class="left_bottom_mainPanel">
        <div class="qustion">
          <p>问题中头实体相似实体分析：</p>
          <table class="table" v-show="qustions">
            <thead>
              <tr>
                <td>相似实体：</td>
                <td>相似度：</td>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="x in similars"
                :key="x.id"
                class="trclick"
                @click="drawgg(x)"
              >
                <td>{{ x.name }}</td>
                <td>{{ x.number }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="answer">
          <div class="titile">
            <p>系统给出的结果如下：</p>
            <div class="dropdown">
              <button
                type="button"
                class="btn btn-secondary dropdown-toggle"
                data-toggle="dropdown"
              >
                关系层级选择
              </button>
              <div class="dropdown-menu">
                <a class="dropdown-item" href="#">层级 1</a>
                <a class="dropdown-item" href="#">层级 2</a>
                <a class="dropdown-item" href="#">层级 3</a>
              </div>
            </div>
          </div>
          <div class="entityG1"></div>
        </div>
      </div>
      <div class="center_bottom_mainPanel"></div>
      <div class="right_bottom_mainPanel">
        <div class="qustion">
          <p>你提出的问题拆解如下：</p>
          <h2>实体名：{{ headers }}</h2>
          <h2>查询关系：{{ relations }}</h2>
          <div class="circle" v-show="qustions">
            <div class="circle1">{{ headers }}</div>
            <div class="circle2">{{ relations }}</div>
            <div class="circle1">？</div>
          </div>
        </div>
        <div class="answer">
          <div class="titile">
            <p>系统给出的结果如下：</p>
            <div class="dropdown">
              <button
                type="button"
                class="btn btn-secondary dropdown-toggle"
                data-toggle="dropdown"
              >
                关系层级选择
              </button>
              <div class="dropdown-menu">
                <a class="dropdown-item" href="#" @click="ddd(1)">层级 1</a>
                <a class="dropdown-item" href="#" @click="ddd(2)">层级 2</a>
                <a class="dropdown-item" href="#" @click="ddd(3)">层级 3</a>
              </div>
            </div>
          </div>
          <div class="entityG"></div>
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
      qustion: "张三的朋友包括",
      answer: "张三的朋友包括：李四，小红，小米等",
      headers: "",
      relations: "",
      qustions: false,
      myKG1: null,
      myKG2: null,
      myKG3: null,
      myKG11: {
        nodes: [
          { id: 0, color: "red", labels: ["person"], name: "李四" },
          { id: 1, color: "red", labels: ["person"], name: "李五" },
          { id: 2, color: "red", labels: ["person"], name: "小明" },
          { id: 3, color: "red", labels: ["person"], name: "小红" },
          { id: 4, color: "red", labels: ["person"], name: "小军" },
        ],
        links: [
          { target: 0, source: 1, relation: "朋友" },
          { target: 0, source: 2, relation: "朋友" },
          { target: 0, source: 3, relation: "朋友" },
          { target: 0, source: 4, relation: "朋友" },
        ],
      },
      myKG12: {
        nodes: [
          { id: 0, color: "red", labels: ["person"], name: "李四" },
          { id: 1, color: "red", labels: ["person"], name: "李五" },
          { id: 2, color: "red", labels: ["person"], name: "小明" },
          { id: 3, color: "red", labels: ["person"], name: "小红" },
          { id: 4, color: "red", labels: ["person"], name: "小军" },
        ],
        links: [
          // {target:0,source:1,relation:'朋友'},
          // {target:0,source:2,relation:'朋友'},
          // {target:0,source:3,relation:'朋友'},
          // {target:0,source:4,relation:'朋友'},
        ],
      },
      myKG13: {
        nodes: [
          { id: 10, color: "red", labels: ["person"], name: "张宇" },
          { id: 11, color: "red", labels: ["person"], name: "李五" },
          { id: 12, color: "red", labels: ["person"], name: "小明" },
          { id: 13, color: "red", labels: ["person"], name: "小红" },
          { id: 14, color: "red", labels: ["person"], name: "小军" },
        ],
        links: [
          { target: 10, source: 11, relation: "朋友" },
          { target: 10, source: 12, relation: "朋友" },
          { target: 10, source: 13, relation: "朋友" },
          { target: 10, source: 14, relation: "朋友" },
        ],
      },
      similars: [
        { name: "张宇", number: "0.564" },
        { name: "张d", number: "0.562" },
        { name: "张s", number: "0.561" },
        { name: "张dd", number: "0.564" },
        { name: "张gf", number: "0.564" },
        { name: "张gf", number: "0.564" },
      ],
    };
  },
  methods: {
    displayKg() {
      const _this = this;
      axios.get(_this.path + "/getAllEntity").then((res) => {
        _this.myKG11.nodes = res.data;
        axios.get(_this.path + "/getAllKg").then((res) => {
          _this.myKG11.links = res.data;
          console.log(_this.myKG11.links);
          _this.myKG1.updataGraphs(_this.myKG11);
        });
      });
    }, //绘制知识图
    searchQ() {
      const _this = this;
      _this.qustions = true;
      _this.headers = _this.qustion.slice(0, 2);
      _this.relations = _this.qustion.slice(3, 5);
      _this.myKG1 = new drawKG("center_bottom_mainPanel");
      _this.myKG1.updataGraphs(_this.myKG11);
      _this.myKG2 = new drawKG("entityG");
      _this.myKG2.updataGraphs(_this.myKG12);
    }, //问答得查询
    drawgg(name) {
      const _this = this;
      _this.myKG3 = new drawKG("entityG1");
      _this.myKG3.updataGraphs(_this.myKG13);
    },
    ddd(num) {
      const _this = this;
      switch (num) {
        case 1:
          _this.myKG11.nodes = [
            { id: 0, color: "red", labels: ["person"], name: "张宇" },
            { id: 1, color: "red", labels: ["person"], name: "李五" },
            { id: 2, color: "red", labels: ["person"], name: "小明" },
            { id: 3, color: "red", labels: ["person"], name: "小红" },
            { id: 4, color: "red", labels: ["person"], name: "小军" },
          ];
          _this.myKG11.links = [
            { target: 0, source: 1, relation: "朋友" },
            { target: 0, source: 2, relation: "朋友" },
            { target: 0, source: 3, relation: "朋友" },
            { target: 0, source: 4, relation: "朋友" },
          ];
          _this.myKG12.nodes = [
            { id: 0, color: "red", labels: ["person"], name: "张宇" },
            { id: 1, color: "red", labels: ["person"], name: "李五" },
            { id: 2, color: "red", labels: ["person"], name: "小明" },
            { id: 3, color: "red", labels: ["person"], name: "小红" },
            { id: 4, color: "red", labels: ["person"], name: "小军" },
          ]
          _this.myKG2.updataGraphs(_this.myKG12)
          _this.myKG1.updataGraphs(_this.myKG11);
          break
        case 2:
          _this.myKG11.nodes = [
            { id: 0, color: "red", labels: ["person"], name: "张宇" },
            { id: 1, color: "red", labels: ["person"], name: "李五" },
            { id: 2, color: "red", labels: ["person"], name: "小明" },
            { id: 3, color: "red", labels: ["person"], name: "小红" },
            { id: 4, color: "red", labels: ["person"], name: "小军" },
            { id: 5, color: "red", labels: ["person"], name: "李五1" },
            { id: 6, color: "red", labels: ["person"], name: "小明2" },
            { id: 7, color: "red", labels: ["person"], name: "小红3" },
            { id: 8, color: "red", labels: ["person"], name: "小军4" },
          ];
          _this.myKG11.links = [
            { target: 0, source: 1, relation: "朋友" },
            { target: 0, source: 2, relation: "朋友" },
            { target: 0, source: 3, relation: "朋友" },
            { target: 0, source: 4, relation: "朋友" },
            { target: 0, source: 5, relation: "朋友" },
            { target: 0, source: 6, relation: "朋友" },
            { target: 0, source: 7, relation: "朋友" },
            { target: 0, source: 8, relation: "朋友" },
          ];
          _this.myKG12.nodes = [
            { id: 0, color: "red", labels: ["person"], name: "张宇" },
            { id: 1, color: "red", labels: ["person"], name: "李五" },
            { id: 2, color: "red", labels: ["person"], name: "小明" },
            { id: 3, color: "red", labels: ["person"], name: "小红" },
            { id: 4, color: "red", labels: ["person"], name: "小军" },
            { id: 5, color: "red", labels: ["person"], name: "李五1" },
            { id: 6, color: "red", labels: ["person"], name: "小明2" },
            { id: 7, color: "red", labels: ["person"], name: "小红3" },
            { id: 8, color: "red", labels: ["person"], name: "小军4" },
          ]
          _this.myKG2.updataGraphs(_this.myKG12)
          _this.myKG1.updataGraphs(_this.myKG11);
          break
      }
    },
  },
  mounted() {
    const _this = this;

    // _this.displayKg();
  },
};
</script>

<style scoped>
@import url("../../../assets/css/common/button.css");
@import url("../../../assets/css/zb_system/zb_papar_qa.css");
</style>