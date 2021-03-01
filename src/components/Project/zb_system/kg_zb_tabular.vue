<template>
  <div class="zb_kg_tabular">
    <div class="zb_tabular_left">
      <div class="tabular_title">Tabular Detaction</div>
      <div class="tabular_input">
        <span>选择相应文件</span>
        <input
          type="file"
          class="btn_input_file"
          id="btn_input_file"
          accept=".pdf"
          v-on:change="updata($event)"
        />
        <p>{{ inputFile }}</p>
        <button class="btn_pro_green" @click="submit()">submit</button>
        <button class="btn_pro_green" @click="Display()">文件预览</button>
      </div>
      <div class="dis_document">
        <embed src="" id="review" style="width: 100%; height: 100%" />
      </div>
    </div>
    <div class="zb_tabular_right">
      <div class="control_btn">
        <div class="btn_pro_green" @click="pdfDeal()">PDF文件处理</div>
        <div class="btn_pro_green" @click="pdfextract1()">PDF表格识别</div>
        <div class="btn_pro_green" @click="pdfextract()">表格提取</div>
      </div>
      <div class="control_process">{{ fileDeal }}</div>
      <div class="control_result">
        <div class="loading" v-show="loading">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div class="table_img">
          <img
            :src="x.path"
            alt="表格图片"
            v-for="x in imgData"
            :key="x.id"
            class="table_imgs"
            @click="tabular()"
          />
        </div>
        <div class="table_img_content">
          <table>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
export default {
  name: "kg_zb_tabular",
  data() {
    return {
      pdfFile: null,
      inputFile: "尚未选择文件",
      fileDeal: "无文件可处理",
      path: this.globelV.pathID + "/user/project/zbSystem",
      pdfPath: "",
      loading: false,
      imgData: [],
    };
  },
  methods: {
    updata(evnet) {
      const _this = this;
      // _this.$d3.select('#review').remove()
      _this.pdfFile = document.getElementById("btn_input_file").files[0];
      _this.inputFile = _this.pdfFile.name;
    },
    submit() {
      const _this = this;
      let pdfform = new FormData();
      pdfform.append("file", _this.pdfFile);
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      Axios.post(_this.path + "/pdfsubmit", pdfform, config)
        .then((res) => {
          // console.log(res.data)
          _this.pdfPath = res.data.file[0].path;
          _this.fileDeal = _this.pdfPath + "文件待处理！";
          alert("上传成功！");
        })
        .catch((err) => {
          console.log(err);
        }); //pdf上传
    },
    Display() {
      const _this = this;
      _this.$d3.select("#review").remove();
      const windowURL = window.URL || window.webkitURL;
      if (_this.pdfFile) {
        console.log(_this.pdfFile);
        const dataURl = windowURL.createObjectURL(_this.pdfFile);
        console.log(dataURl);
        _this.$d3
          .select(".dis_document")
          .append("embed")
          .attr({ src: dataURl, id: "review" })
          .style({ width: "100%", height: "100%" });
      }
    },
    tabular() {
      const _this = this;
      _this.$d3.select(".table_img_content").style("opacity", "1");
    },
    // pdf文件处理
    pdfDeal() {
      const _this = this;
      _this.loading = true
      Axios.post(_this.path + "/pdfDeal", { path: `./${_this.pdfPath}` }).then(
        (res) => {
          console.log(res.data)
          if (res.data.title === "成功") {
            _this.fileDeal = "文件处理成功！";
            _this.loading = false
            _this.imgData = res.data.data
          }
        }
      );
    },
    pdfextract() {
      const _this = this
      _this.imgData = []
      _this.loading = true
      Axios.get(_this.path + '/pdfExtract').then((res)=>{
        if (res.data.title === "成功") {
            _this.fileDeal = "表格抽取成功！";
            _this.loading = false
            _this.imgData = res.data.data
          }
      })
    },
    pdfresult() {
      const _this = this;
      // _this.$d3.select(".table_img").style("opacity", "1");
    },
  },
  mounted() {
    const _this = this;
    // _this.$d3.select(".table_img").style("opacity", "0");
    // _this.$d3.select(".table_img_content").style("opacity", "0");
  },
};
</script>

<style scoped>
@import url("../../../assets/css/common/button.css");
@import url("../../../assets/css/zb_system/zb_papar_tabular.css");
</style>