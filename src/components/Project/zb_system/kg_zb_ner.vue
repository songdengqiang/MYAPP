<template>
  <div class="zb_kg_ner">
    <div class="zb_kg_nerC">
      <input type="file" id="textFile" accept=".txt" />
      <div class="btn_pro_green btn1" @click="chooseFile()">文件选择</div>
      <div class="btn_pro_green btn1" @click="markFile()">标注</div>
      <div class="btn_pro_green btn1" @click="trans()">训练</div>
      <div class="btn_pro_green btn1">测试</div>
    </div>
    <div class="zb_kg_nerM">
      <div class="left_mainPanel">
        <h2>{{ fileName }}</h2>
        <div class="fileContent">
          <textarea
            name="fileC"
            v-model="fileContent"
            class="fileContentE"
          ></textarea>
        </div>
      </div>
      <div class="center_mainPanel">
        <div class="center_mainPanel1">训练显示区</div>
        <div class="center_mainPanel2" id="center_mainPanel2">训练精度柱状图</div>
      </div>
      <div class="right_mainPanel">
        <div class="top_right_mainPanel">
          <h2>输入测试内容</h2>
          <input type="text" class="right_mainPanel_input" />
        </div>
        <div class="bottom_right_mainPanel"></div>
      </div>
    </div>
  </div>
</template>

<script>
import drawBar from "../../../assets/js/draw_bar_chart";
export default {
  name: "kg_zb_ner",
  data() {
    return {
      fileName: "ff",
      fileContent: "",
      myBar1: null,
    };
  },
  methods: {
    chooseFile() {
      document.getElementById("textFile").click();
    },
    markFile() {
      const _this = this;
      let fileContent = document.getElementById("textFile").files[0];
      let render = new FileReader();
      render.readAsText(fileContent, "UTF-8");
      render.onload = (event) => {
        _this.fileContent = event.target.result;
      };
    },
    trans() {
      const _this = this;
      _this.myBar1 = new drawBar("center_mainPanel2");
      _this.myBar1.initTitle("实体识别精度图");
      _this.myBar1.initlegend(["ALBERT-BiLSTM", "BiLSTM+CRF", "BiLSTM"]);
      _this.myBar1.initxdata([
        "DEVICE",
        "DEVICECOMPONENT",
        "MATERIAL",
        "PART",
        "PARTFEATURE",
        "PROCESSCELL",
        "PROCESSINGFEATURE",
        "PROCESSINGMETHOD",
        "PROCESSINGSTEP",
        "STEPCELL",
        "TOOL",
      ]);
      _this.myBar1.initseries({
        name: "ALBERT-BiLSTM",
        data: [
          0.99,
          0.98,
          0.94,
          0.963,
          0.963,
          0.963,
          0.963,
          0.963,
          0.963,
          0.963,
          0.963,
        ],
      });
      _this.myBar1.initseries({
        name: "BiLSTM+CRF",
        data: [
          0.93,
          0.91,
          0.93,
          0.95,
          0.94,
          0.93,
          0.953,
          0.953,
          0.943,
          0.933,
          0.923,
        ],
      });
      _this.myBar1.initseries({
        name: "BiLSTM",
        data: [0.9, 0.89, 0.97, 0.96, 0.95, 0.92, 0.86, 0.89, 0.91, 0.95, 0.88],
      });
       _this.myBar1.drawBar();
    },
  },
};
</script>

<style scoped>
@import url("../../../assets/css/common/button.css");
@import url("../../../assets/css/zb_system/zb_paper_ner.css");
</style>