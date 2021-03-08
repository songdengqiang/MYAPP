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
        <button class="btn btn-outline-info" @click="submit()">submit</button>
        <button class="btn btn-outline-info" @click="Display()">
          文件预览
        </button>
      </div>
      <div class="dis_document">
        <embed src="" id="review" style="width: 100%; height: 100%" />
      </div>
    </div>
    <div class="zb_tabular_right">
      <div class="control_btn">
        <div class="btn btn-outline-info" @click="pdfDeal()">PDF文件处理</div>
        <div class="btn btn-outline-info" @click="pdfextract()">
          PDF表格识别
        </div>
        <div class="btn btn-outline-info" @click="pdfextract1()">表格提取</div>
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
            @click="tabular(x.path)"
          />
        </div>
        <div class="table_img_content">
          <div class="imgList">
            <div class="btn btn-outline-info">文字处理</div>
            <img
              src="../../../assets/icon/submit1.svg"
              alt="上传"
              title="上传需要识别的内容"
              @click="uploadTxt()"
            />
            <img
              src="../../../assets/icon/download.svg"
              alt="下载"
              title="下载识别的内容"
              @click="downloadTxt()"
            />
            <input
              type="file"
              style="width: 0; height: 0"
              id="OCRimg"
              accept="image/*"
              value=""
              @change="submitImg()"
            />
          </div>
          <div class="textlist">
            <pre>
              {{ ocrText }}
            </pre>
            <div class="loading loading1" v-show="loading1" id="dfd">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
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
      loading1:false,
      imgData: [],
      ocrText: "",
      ocrTextPath: "",
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
    tabular(ImgPath) {
      const _this = this;
      _this.loading1 = true;
      Axios.post(_this.path + "/ocrFunc", { path: ImgPath }).then((res) => {
        if (res.data.title === "成功") {
          _this.fileDeal = "表格识别成功！";
          _this.ocrText = res.data.textContent;
          _this.ocrTextPath = res.data.textPath;
          _this.loading1 = false;
        }
      });
    },
    // pdf文件处理
    pdfDeal() {
      const _this = this;
      _this.loading = true;
      Axios.post(_this.path + "/pdfDeal", { path: `./${_this.pdfPath}` }).then(
        (res) => {
          console.log(res.data);
          if (res.data.title === "成功") {
            _this.fileDeal = "文件处理成功！";
            _this.loading = false;
            _this.imgData = res.data.data;
          }
        }
      );
    },
    pdfextract() {
      const _this = this;
      _this.imgData = [];
      _this.loading = true;
      Axios.get(_this.path + "/pdfExtract").then((res) => {
        if (res.data.title === "成功") {
          _this.fileDeal = "表格识别成功！";
          _this.loading = false;
          _this.imgData = res.data.data;
        }
      });
    }, //表格抽取
    pdfextract1() {
      const _this = this;
      _this.imgData = [];
      _this.loading = true;
      Axios.get(_this.path + "/pdfExtract1").then((res) => {
        if (res.data.title === "成功") {
          _this.fileDeal = "表格识别成功！";
          _this.loading = false;
          _this.imgData = res.data.data;
        }
      });
    }, //表格识别
    pdfresult() {
      const _this = this;
      // _this.$d3.select(".table_img").style("opacity", "1");
    },
    downloadTxt() {
      const _this = this;
      // console.log(_this.ocrTextPath)
      window.open(_this.ocrTextPath); //新开一个窗口来接收txt文件，并可以实现下载（另存为）
    }, //下载
    uploadTxt() {
      document.getElementById("OCRimg").click();
      // let kgTxt = document.getElementById("OCRimg").files[0];
      // console.log(kgTxt)
    }, //选择图片上传，并实现图片内容的识别
    submitImg() {
      const _this = this;
      // alert('dfd')
      _this.loading1 = true;
      let imgInfo = document.getElementById("OCRimg").files[0];
      let params = new FormData(); // 创建一个form对象
      params.append("file", imgInfo);
      // params.append('type','图片')
      let config = { headers: { "Content-Type": "multipart/form-data" } };
      Axios.post(_this.path + "/ocrFunc1", params, config).then((res) => {
        if (res.data !== "失败") {
          _this.fileDeal = "表格识别成功！";
          _this.ocrText = res.data.textContent;
          _this.ocrTextPath = res.data.textPath;
          _this.loading1 = false;
        }
      });
    },
  },
  mounted() {
    const _this = this;
  },
};
</script>

<style scoped>
@import url("../../../assets/css/common/loading.css");
@import url("../../../assets/css/common/button.css");
@import url("../../../assets/css/zb_system/zb_papar_tabular.css");
#dfd{
  top: 60%;
  left: 72%;
}
</style>