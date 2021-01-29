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
        <embed src='' id="review" style="width: 100%; height: 100%" />
      </div>
    </div>
    <div class="zb_tabular_right">
      <div class="control_btn">
        <div class="btn_pro_green">PDF文件处理</div>
        <div class="btn_pro_green">结果输出</div>
      </div>
      <div class="control_process">{{fileDeal}}</div>
      <div class="control_result">
        <div class="table_img">
          <img :src=x.path alt="表格图片" v-for=" x in imgData" :key="x.id" class="table_imgs" @click="tabular(x.path)">
        </div>
        <div class="table_img_content">表格图片内容识别</div>
      </div>
      
    </div>
  </div>
</template>

<script>
import Axios from 'axios';
export default {
  name: "kg_zb_tabular",
  data() {
    return {
      pdfFile: null,
      inputFile: "尚未选择文件",
      fileDeal: '无文件可处理',
      imgData: [
        {path:'http://127.0.0.1:8888/images/gNviE8PEWQPpsOKC1LYggcOJ.jpg'},
        {path:'http://127.0.0.1:8888/img/power1.jpg'},
        {path:'http://127.0.0.1:8888/img/power2.jpg'},
        {path:'http://127.0.0.1:8888/img/power3.jpg'},
        {path:'http://127.0.0.1:8888/img/power4.jpg'},
        {path:require('../../../../static/table_img/table6.png')},
        {path:require('../../../../static/table_img/table7.png')}
      ]
    };
  },
  methods: {
    updata(evnet) {
      const _this = this;
      // _this.$d3.select('#review').remove()
       _this.pdfFile = document.getElementById("btn_input_file").files[0];
      _this.inputFile = _this.pdfFile.name;
    },
    submit () {
      const _this = this;
      let pdfform = new FormData()
      pdfform.append('file',_this.pdfFile)
      const config = {headers:{'Content-Type':'multipart/form-data'}}
      const pathId = _this.globelV.pathID + '/user/project/pdfsubmit'
      Axios.post(pathId,pdfform,config).then((res)=>{
        console.log(res.data)
      }).catch((err)=>{
        console.log(err)
      })
    },
    Display () {
      const _this = this;
      _this.$d3.select('#review').remove()
      const windowURL = window.URL || window.webkitURL;
      if (_this.pdfFile) {
        console.log(_this.pdfFile)
        const dataURl = windowURL.createObjectURL(_this.pdfFile);
        console.log(dataURl)
        _this.$d3.select('.dis_document').append('embed').attr({'src':dataURl,'id':'review'}).style({'width':'100%','height':'100%'})
      }
    },
    tabular () {
      const _this = this
      let img = document.getElementById('dddddd').files[0]
      _this.imgData[0].path = _this.$comF.getobjurl(img)
    },
  }
};
</script>

<style scoped>
@import url("../../../assets/css/common/button.css");
@import url("../../../assets/css/zb_system/zb_papar_tabular.css");
</style>