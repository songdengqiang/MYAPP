<template>
  <div class="zb_papar_mainPage">
    <div class="zb_main_left">
      <h2>IKG知识库的统计</h2>
      <div class="zb_main_left_bar" id="myBar1"></div>
      <div class="zb_main_left_bar" id="myBar2"></div>
      <div class="zb_main_left_pie" id="myPie1"></div>
    </div>
    <div class="zb_main_center">
      <div class="zb_main_center_title">
        <img
          src="../../../assets/icon/Home.svg"
          alt="知识模块"
          title="知识层级的选择"
        />
        <h2>IKG局部单层知识网络</h2>
        <img
          src="../../../assets/icon/setting.svg"
          alt="知识网络显示设置"
          title="知识网络显示设置"
        />
      </div>
      <div class="zb_main_center_kg"></div>
    </div>
    <div class="zb_main_right">
      <h2>IKG知识库的管理</h2>
      <div class="zb_main_right_bar">
        <ul class="list_input">
          <li class="list_input_li">
            <h3>实体类型：</h3>
            <input type="text" class="list_input_value" />
          </li>
          <li class="list_input_li">
            <h3>实体名：</h3>
            <input type="text" class="list_input_value" />
          </li>
          <li class="list_input_li">
            <h3>实体属性：</h3>
            <input type="text" class="list_input_value" />
          </li>
          <li class="list_input_li">
            <div class="list_input_btn" title="删除某一实体及其带有的关系">
              删除
            </div>
            <div class="list_input_btn" title="添加一个实体">添加</div>
            <div class="list_input_btn" title="查询一个实体及其具有的关系实体">
              查询
            </div>
          </li>
        </ul>
      </div>
      <div class="zb_main_right_bar">
        <ul class="list_input">
          <li class="list_input_li">
            <h3>关系类型：</h3>
            <input type="text" class="list_input_value" />
          </li>
          <li class="list_input_li">
            <h3>关系名：</h3>
            <input type="text" class="list_input_value" />
          </li>
          <li class="list_input_li">
            <h3>关系属性：</h3>
            <input type="text" class="list_input_value" />
          </li>
          <li class="list_input_li">
            <div class="list_input_btn" title="删除某一个关系">删除</div>
            <div class="list_input_btn" title="添加一个关系">添加</div>
            <div class="list_input_btn" title="查询一个关系的所有实体">
              查询
            </div>
          </li>
        </ul>
      </div>
      <div class="zb_main_right_pie">
        <ul class="list_input">
          <li class="list_input_li">
            <h3>头实体：</h3>
            <input type="text" class="list_input_value" />
          </li>
          <li class="list_input_li">
            <h3>尾实体：</h3>
            <input type="text" class="list_input_value" />
          </li>
          <li class="list_input_li">
            <h3>实体关系：</h3>
            <input type="text" class="list_input_value" />
          </li>
          <li class="list_input_li">
            <div class="list_input_btn" title="删除一组知识">删除</div>
            <div class="list_input_btn" title="添加一组知识">添加</div>
            <div class="list_input_btn" title="查询一组知识">查询</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import drawBar from "../../../assets/js/draw_bar_chart";
import drawPie from "../../../assets/js/draw_pie_chart ";
import drawKG from "../../../assets/js/creatKG";
export default {
  name: "kg_zb_mainPage",
  data() {
    return {
      myBar1: null,
      myBar2: null,
      myKG1: null,
    };
  },
  mounted() {
    const _this = this;
    _this.myBar1 = new drawBar("myBar1");
    _this.myBar1.initTitle("实体统计图");
    _this.myBar1.initlegend(["领域1", "领域2"]);
    _this.myBar1.initxdata(["d1", "d2", "f3", "fs"]);
    _this.myBar1.initseries({ name: "领域1", data: [43, 21, 43, 21] });
    _this.myBar1.drawBar();
    _this.myBar2 = new drawBar("myBar2");
    _this.myBar2.initTitle("属性统计图");
    _this.myBar2.initlegend(["领域1", "领域2"]);
    _this.myBar2.initxdata(["d1", "d2", "f3", "fs"]);
    _this.myBar2.initseries({ name: "领域2", data: [43, 21, 43, 21] });
    _this.myBar2.drawBar();
    _this.myPie1 = new drawPie("myPie1");
    _this.myPie1.drawPie();
    _this.myKG1 = new drawKG("zb_main_center_kg");
    _this.myKG1.drawGraph();
  },
};
</script>

<style scoped>
@import url("../../../assets/css/common/button.css");
@import url("../../../assets/css/common/list_input.css");
@import url("../../../assets/css/project/zb_paper_mainPage.css");
</style>