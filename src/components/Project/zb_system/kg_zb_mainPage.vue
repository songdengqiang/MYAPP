<template>
  <div class="zb_papar_mainPage">
    <div class="zb_main_left">
      <h2>知识库的统计</h2>
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
        <h2>局部单层知识网络</h2>
        <img
          src="../../../assets/icon/setting.svg"
          alt="知识网络显示设置"
          title="知识网络显示设置"
          @click="settingWindowBack(0)"
        />
      </div>
      <div class="zb_main_center_kg"></div>
      <!-- 知识图显示设置窗口 -->
      <div class="settingWindow" v-show="settingWindow">
        <div class="settingHeader">
          <h3>知识图谱网络显示设置</h3>
          <img
            src="../../../assets/icon/delete.svg"
            alt="退出"
            title="退出"
            @click="settingWindowBack(1)"
          />
        </div>
        <div class="settingBody">
          <div class="settingBody_left">
            <ul class="list-group">
              <li
                class="list-group-item list-group-item-info li li1"
                style="background-color: greenYellow"
                @click="panelClick(1)"
              >
                连线设置
              </li>
              <li
                class="list-group-item list-group-item-info li li2"
                @click="panelClick(2)"
              >
                节点属性修改
              </li>
              <li
                class="list-group-item list-group-item-info li li3"
                @click="panelClick(3)"
              >
                节点标题设置
              </li>
              <li
                class="list-group-item list-group-item-info li li4"
                @click="panelClick(4)"
              >
                节点颜色设置
              </li>
              <li
                class="list-group-item list-group-item-info li li5"
                @click="panelClick(5)"
              >
                图形仿真力的设置
              </li>
              <li
                class="list-group-item list-group-item-info li li5"
                @click="panelClick(5)"
              >
                图形仿真力的设置
              </li>
            </ul>
          </div>
          <div class="settingBody_right">
            <div class="rightPanel Panel1" v-show="Panel1">
              <h4>连线设置</h4>
              <form>
                <div class="form-group">
                  <label for="email">连线种类:</label>
                  <input class="form-control" placeholder="check type" />
                </div>
                <div class="form-group">
                  <label for="pwd">连线颜色:</label>
                  <input class="form-control" placeholder="check color" />
                </div>
                <div class="form-group">
                  <label for="pwd">连线粗细:</label>
                  <input class="form-control" placeholder="check weight" />
                </div>
                <div class="form-group">
                  <label for="pwd">连线长度:</label>
                  <input class="form-control" placeholder="check lenght" />
                </div>
                <button class="btn btn-primary">默认设置</button>
                <button class="btn btn-primary">设置确认</button>
              </form>
              <hr />
            </div>
            <div class="rightPanel Panel1 Panel2" v-show="Panel2">
              <h4>节点属性修改</h4>
              <div class="filterB">
                <div class="dropdown">
                  <button
                    class="btn btn-outline-info dropdown-toggle"
                    data-toggle="dropdown"
                  >
                    标签-{{ labelName }}
                  </button>
                  <div class="dropdown-menu">
                    <a
                      v-for="x in kgEnTyList"
                      :key="x.id"
                      class="dropdown-item"
                      @click="filterB1(x, 1)"
                      >{{ x }}</a
                    >
                  </div>
                </div>
                <div class="dropdown">
                  <button
                    class="btn btn-outline-info dropdown-toggle"
                    data-toggle="dropdown"
                  >
                    实体颜色-{{ entityColor }}
                  </button>
                  <div class="dropdown-menu">
                    <a
                      v-for="x1 in colorList"
                      :key="x1.id"
                      @click="filterB1(x1, 2)"
                      class="dropdown-item"
                      >{{ x1 }}</a
                    >
                  </div>
                </div>
                <div class="dropdown">
                  <button
                    class="btn btn-outline-info dropdown-toggle"
                    data-toggle="dropdown"
                  >
                    实体名-{{ entityName }}
                  </button>
                  <div class="dropdown-menu">
                    <a
                      v-for="x2 in kgEnL"
                      :key="x2.id"
                      @click="filterB1(x2.name, 3)"
                      class="dropdown-item"
                      >{{ x2.name }}</a
                    >
                  </div>
                </div>
              </div>
              <div class="filterC">
                <ul class="list-group">
                  <li class="list-group-item" v-for="x in kgEnL" :key="x.id">
                    <span>{{ x.name }}</span>
                    <input
                      type="text"
                      class="form-control"
                      v-model="x.labels[0]"
                    />
                    <input
                      type="text"
                      class="form-control form-control1"
                      v-model="x.strAttr"
                    />
                    <img
                      src="../../../assets/icon/add.svg"
                      alt="修改"
                      class="addMidfy"
                      @click="modifyAttr(x)"
                    />
                  </li>
                </ul>
              </div>
              <button class="btn btn-outline-success">提交修改</button>
              <hr />
            </div>
            <div class="rightPanel Panel1" v-show="Panel3">
              <h4>节点标题设置</h4>
              <form>
                <div class="form-group">
                  <label for="email">标题显示:</label>
                  <input class="form-control" placeholder="check type" />
                </div>
                <div class="form-group">
                  <label for="pwd">标题文字最小个数:</label>
                  <input class="form-control" placeholder="check color" />
                </div>
                <div class="form-group">
                  <label for="pwd">标题字体:</label>
                  <input class="form-control" placeholder="check weight" />
                </div>
                <div class="form-group">
                  <label for="pwd">标题颜色:</label>
                  <input class="form-control" placeholder="check lenght" />
                </div>
                <button class="btn btn-primary">默认设置</button>
                <button class="btn btn-primary">设置确认</button>
              </form>
              <hr />
            </div>
            <div class="rightPanel Panel1" v-show="Panel4">
              <h4>节点颜色设置</h4>
              <form>
                <div class="form-group">
                  <label for="email">标题显示:</label>
                  <input class="form-control" placeholder="check type" />
                </div>
                <div class="form-group">
                  <label for="pwd">标题文字最小个数:</label>
                  <input class="form-control" placeholder="check color" />
                </div>
                <div class="form-group">
                  <label for="pwd">标题字体:</label>
                  <input class="form-control" placeholder="check weight" />
                </div>
                <div class="form-group">
                  <label for="pwd">标题颜色:</label>
                  <input class="form-control" placeholder="check lenght" />
                </div>
                <button class="btn btn-primary">默认设置</button>
                <button class="btn btn-primary">设置确认</button>
              </form>
              <hr />
            </div>
            <div class="rightPanel Panel1" v-show="Panel5">
              <h4>图形仿真力的设置</h4>
              <form>
                <div class="form-group">
                  <label for="email">标题显示:</label>
                  <input class="form-control" placeholder="check type" />
                </div>
                <div class="form-group">
                  <label for="pwd">标题文字最小个数:</label>
                  <input class="form-control" placeholder="check color" />
                </div>
                <div class="form-group">
                  <label for="pwd">标题字体:</label>
                  <input class="form-control" placeholder="check weight" />
                </div>
                <div class="form-group">
                  <label for="pwd">标题颜色:</label>
                  <input class="form-control" placeholder="check lenght" />
                </div>
                <button class="btn btn-primary">默认设置</button>
                <button class="btn btn-primary">设置确认</button>
              </form>
              <hr />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="zb_main_right">
      <h2>知识库的管理</h2>
      <div class="zb_main_right_bar">
        <ul class="list_input">
          <li class="list_input_li">
            <h3>实体名：</h3>
            <input
              type="text"
              class="list_input_value"
              v-model="entity_name"
              placeholder="value"
            />
            <div class="dropdown">
              <button
                type="button"
                class="btn dropdown-toggle"
                data-toggle="dropdown"
              ></button>
              <div class="dropdown-menu dropdown-menu-right">
                <a
                  class="dropdown-item"
                  id="dropdownitem"
                  href="#"
                  v-for="x in myKG11.nodes"
                  :key="x.id"
                  :title="x.name"
                  @click="sendValue(x.name, 'name')"
                  >{{ x.name }}</a
                >
              </div>
            </div>
          </li>
          <li class="list_input_li">
            <h3 title="可以为导入的实体进行类的规定！">实体类：</h3>
            <input
              type="text"
              id="district"
              class="list_input_value"
              v-model="entity_labels"
              autocomplete="value"
              placeholder="value"
            />
            <div class="dropdown">
              <button
                type="button"
                class="btn dropdown-toggle"
                data-toggle="dropdown"
              ></button>
              <div class="dropdown-menu dropdown-menu-right">
                <a
                  class="dropdown-item"
                  id="dropdownitem"
                  href="#"
                  v-for="x in kgEnTyList"
                  :key="x.id"
                  :title="x"
                  @click="sendValue(x, 'type')"
                  >{{ x }}</a
                >
              </div>
            </div>
          </li>
          <li class="list_input_li">
            <h3 title="可以为导入的实体进行属性的添加！不同属性之间以分号隔开">
              实体属性：
            </h3>
            <input
              type="text"
              class="list_input_value"
              v-model="entity_attr"
              autocomplete="value"
              placeholder="key_value;key_value"
            />
          </li>
          <li class="list_input_li">
            <div
              class="list_input_btn"
              title="删除某一实体及其带有的关系"
              @click="delete_entity()"
            >
              删除
            </div>
            <div
              class="list_input_btn"
              title="添加一个实体"
              @click="add_entity()"
            >
              添加
            </div>
            <div
              class="list_input_btn"
              title="批量导入实体"
              @click="addSomEntity()"
            >
              导入
            </div>
          </li>
        </ul>
      </div>
      <div class="zb_main_right_pie">
        <ul class="list_input">
          <li class="list_input_li">
            <h3>头实体：</h3>
            <input
              type="text"
              class="list_input_value"
              placeholder="entity"
              v-model="kg_head"
            />
            <div class="dropdown">
              <button
                type="button"
                class="btn dropdown-toggle"
                data-toggle="dropdown"
              ></button>
              <div class="dropdown-menu dropdown-menu-right">
                <a
                  class="dropdown-item"
                  id="dropdownitem"
                  href="#"
                  v-for="x in myKG11.nodes"
                  :key="x.id"
                  :title="x.name"
                  @click="sendValue(x.name, 'name_head')"
                  >{{ x.name }}</a
                >
              </div>
            </div>
          </li>
          <li class="list_input_li">
            <h3>尾实体：</h3>
            <input
              type="text"
              class="list_input_value"
              placeholder="entity"
              v-model="kg_footer"
            />
            <div class="dropdown">
              <button
                type="button"
                class="btn dropdown-toggle"
                data-toggle="dropdown"
              ></button>
              <div class="dropdown-menu dropdown-menu-right">
                <a
                  class="dropdown-item"
                  id="dropdownitem"
                  href="#"
                  v-for="x in myKG11.nodes"
                  :key="x.id"
                  :title="x.name"
                  @click="sendValue(x.name, 'name_foot')"
                  >{{ x.name }}</a
                >
              </div>
            </div>
          </li>
          <li class="list_input_li">
            <h3>实体关系：</h3>
            <input
              type="text"
              class="list_input_value"
              placeholder="relation"
              v-model="kg_relation"
            />
            <div class="dropdown">
              <button
                type="button"
                class="btn dropdown-toggle"
                data-toggle="dropdown"
              ></button>
              <div class="dropdown-menu dropdown-menu-right">
                <a
                  class="dropdown-item"
                  id="dropdownitem"
                  href="#"
                  v-for="x in kgReTyList"
                  :key="x.id"
                  :title="x"
                  @click="sendValue(x, 'relation')"
                  >{{ x }}</a
                >
              </div>
            </div>
          </li>
          <li class="list_input_li">
            <div
              class="list_input_btn"
              title="删除一组知识"
              @click="deleteOneKg()"
            >
              删除
            </div>
            <div
              class="list_input_btn"
              title="添加一组知识"
              @click="addOneKg()"
            >
              添加
            </div>
            <div
              class="list_input_btn"
              title="基于关系进行查询，可以只是关系，也可以是实体带关系"
              @click="searchKg()"
            >
              查询
            </div>
          </li>
        </ul>
      </div>
      <div class="zb_main_right_bar1">
        <h4>其它辅助小功能</h4>
        <div class="funList">
          <button class="btn btn-outline-secondary" @click="deleteAll()">
            删除所有知识节点
          </button>
          <button class="btn btn-outline-secondary" @click="searchAll()">
            查询所有知识节点
          </button>
          <button class="btn btn-outline-secondary">批量删除关系</button>
          <button class="btn btn-outline-secondary">批量删除实体</button>
          <button class="btn btn-outline-secondary">查询功能扩展</button>
        </div>
      </div>
      <!-- 数据的导入窗口 -->
      <div class="inputFile" v-show="display_input">
        <div class="inputFile1">
          <div class="btn btn-secondary" @click="chooseFile(0)">
            实体json文件
          </div>
          <div class="btn btn-secondary" @click="chooseFile(1)">
            三元组txt文件导入
          </div>
          <div class="btn btn-secondary" @click="chooseFile(2)">
            三元组json文件导入
          </div>
          <div class="btn btn-secondary" @click="chooseFile(3)">
            四元组json文件导入
          </div>
        </div>
        <div class="inputFile2">
          <ul>
            <li>
              <span>实体类别：</span>
              <input type="text" v-model="entity_labels" />
              <!-- <h3>{{ entity_labels }}</h3> -->
            </li>
            <li>
              <span>类别属性：</span>
              <input type="text" v-model="entity_attr" />
              <!-- <h3>{{ entity_labels }}</h3> -->
            </li>
            <li>
              <span>知识数：</span>
              <h3>{{ kgNum }}</h3>
            </li>
            <li>
              <span>实体数：</span>
              <h3>{{ entityNum }}</h3>
            </li>
          </ul>
        </div>
        <div class="inputFile1">
          <div
            @click="submitKgE()"
            class="btn btn-secondary"
            id="btn11"
            title="知识实体的导入"
          >
            实体导入
          </div>
          <div
            @click="submitKgR()"
            class="btn btn-secondary"
            title="实体与实体之间的关系导入"
          >
            实体关系导入
          </div>
          <div @click="inputClose()" class="btn btn-secondary">关闭</div>
          <!-- 文件选择按钮 -->
          <input
            type="file"
            style="width: 0; height: 0"
            id="kgJson"
            accept=".json"
          />
          <input
            type="file"
            style="width: 0; height: 0"
            id="kgTxt"
            accept=".txt"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import drawBar from "../../../assets/js/draw_bar_chart";
import drawPie from "../../../assets/js/draw_pie_chart ";
import drawKG from "../../../assets/js/creatKG";
import * as d3 from "d3";
import axios from "axios";
export default {
  name: "kg_zb_mainPage",
  data() {
    return {
      path: this.globelV.pathID + "/user/project/zbSystem",
      myBar1: null,
      myBar2: null,
      kgNum: 0,
      entityNum: 0,
      entity_labels: "common",
      entity_name: "",
      entity_attr: "color_green;",
      kg_head: "",
      kg_footer: "",
      kg_relation: "",
      display_input_num: 1,
      relation_list: [{ name: "", type: "", attr: {} }],
      myKG11: {
        nodes: [{ id: 0, color: "red", labels: ["person"], name: "机床1" }],
        links: [],
      },
      search_myKG11: {
        nodes: [],
        links: [],
      },
      // 变量显示组
      Panel1: true,
      Panel2: false,
      Panel3: false,
      Panel4: false,
      Panel5: false,
      display_input: false,
      settingWindow: false,
      //知识组变量
      entityName: "All",
      entityColor: "All",
      labelName: "All",
      colorList: ["red", "yellow", "blue"],
      kgEnTyList: [],
      kgReTyList: [],
      KgListss: [],
      kgEnL: [],
    };
  },
  methods: {
    sendValue(x, y) {
      const _this = this;
      switch (y) {
        case "name":
          _this.entity_name = x;
          for (let data of _this.myKG11.nodes) {
            if (data.name === x) {
              _this.entity_labels = data.labels[0];
              break;
            }
          }
          break;
        case "type":
          _this.entity_labels = x;
          break;
        case "name_head":
          _this.kg_head = x;
          break;
        case "name_foot":
          _this.kg_footer = x;
          break;
        case "relation":
          _this.kg_relation = x;
          break;
      }
    }, //数据选择性传递
    inputClose() {
      const _this = this;
      _this.display_input = false;
      _this.displayKg();
    },
    chooseFile(num) {
      const _this = this;
      switch (num) {
        case 1:
          document.getElementById("kgTxt").click();
          _this.display_input_num = 0;
          break;
        case 0:
          document.getElementById("kgJson").click();
          _this.display_input_num = 1;
          break;
        case 2:
          document.getElementById("kgJson").click();
          _this.display_input_num = 2;
          break;
        case 3:
          document.getElementById("kgJson").click();
          _this.display_input_num = 3;
          break;
      }
    },
    settingGraph() {}, //知识图的显示设置
    settingWindowBack(num) {
      const _this = this;
      if (num === 0) {
        _this.settingWindow = true;
      } else {
        _this.settingWindow = false;
      }
    },
    panelClick(num) {
      const _this = this;
      switch (num) {
        case 1:
          _this.Panel1 = true;
          _this.Panel2 = false;
          _this.Panel3 = false;
          _this.Panel4 = false;
          _this.Panel5 = false;
          d3.selectAll(".li").style("background-color", "#bee5eb");
          d3.select(".li1").style("background-color", "greenYellow");
          break;
        case 2:
          _this.Panel1 = false;
          _this.Panel2 = true;
          _this.Panel3 = false;
          _this.Panel4 = false;
          _this.Panel5 = false;
          d3.selectAll(".li").style("background-color", "#bee5eb");
          d3.select(".li2").style("background-color", "greenYellow");
          break;
        case 3:
          _this.Panel1 = false;
          _this.Panel2 = false;
          _this.Panel3 = true;
          _this.Panel4 = false;
          _this.Panel5 = false;
          d3.selectAll(".li").style("background-color", "#bee5eb");
          d3.select(".li3").style("background-color", "greenYellow");
          break;
        case 4:
          _this.Panel1 = false;
          _this.Panel2 = false;
          _this.Panel3 = false;
          _this.Panel4 = true;
          _this.Panel5 = false;
          d3.selectAll(".li").style("background-color", "#bee5eb");
          d3.select(".li4").style("background-color", "greenYellow");
          break;
        case 5:
          _this.Panel1 = false;
          _this.Panel2 = false;
          _this.Panel3 = false;
          _this.Panel4 = true;
          _this.Panel5 = false;
          d3.selectAll(".li").style("background-color", "#bee5eb");
          d3.select(".li5").style("background-color", "greenYellow");
          break;
      }
    },
    filterB1(name, num) {
      const _this = this;
      switch (num) {
        case 1:
          _this.labelName = name;
          break;
        case 2:
          _this.entityColor = name;
          break;
        case 3:
          _this.entityName = name;
          break;
      }
    },
    submitKgE() {
      const _this = this;
      if (_this.display_input_num === 0) {
        _this.KgListss = [];
        _this.kgEnL = [];
        let kgTxt = document.getElementById("kgTxt").files[0];
        let render = new FileReader(); //新建一个文件读取器
        render.readAsText(kgTxt, "UTF-8"); //将读取的内容转化为文本
        render.onload = function (event) {
          let a = event.target.result.replace(/\([^\)]*\)/g, "");
          const dataList = a.split(/[(\r\n)\r\n]+/); //以换行符进行分割
          const singleE = [];
          for (let i of dataList) {
            i = i.replace(/^\s+|\s+$/g, ""); // 去除两端的空格
            if (i !== "") {
              i = i.replace(/\s+/g, "&"); //将所有空格进行替换
              const splitD = i.split("&");
              // console.log(splitD);
              const kg = {};
              kg.head = splitD[0];
              kg.foot = splitD[1];
              kg.relation = splitD[2];
              _this.KgListss.push(kg);
              const kgE = {};
              kgE.name = splitD[0];
              kgE.labels = _this.entity_labels;
              let attrlist = _this.entity_attr.split(";");
              for (let i of attrlist) {
                if (i !== "") {
                  let attrKey = i.split("_");
                  kgE[attrKey[0]] = attrKey[1];
                }
              }
              if (singleE.indexOf(splitD[0]) === -1) {
                singleE.push(splitD[0]);
                _this.kgEnL.push(kgE);
              }
              const kgE1 = {};
              kgE1.name = splitD[1];
              kgE1.labels = _this.entity_labels;
              for (let i of attrlist) {
                if (i !== "") {
                  let attrKey = i.split("_");
                  kgE1[attrKey[0]] = attrKey[1];
                }
              }
              if (singleE.indexOf(splitD[1]) === -1) {
                singleE.push(splitD[1]);
                _this.kgEnL.push(kgE1);
              }
            }
          }
          _this.entityNum = 0;
          _this.kgNum = 0;
          _this.entityNum = _this.kgEnL.length;
          _this.kgNum = _this.KgListss.length;
          console.log(_this.KgListss);
          //实体的上传
          axios.post(_this.path + "/addManyKg1", _this.kgEnL).then((res) => {
            if (res.data === "成功") {
              alert(res.data);
            }
          });
        };
      } else if (_this.display_input_num === 1) {
        _this.KgListss = [];
        _this.kgEnL = [];
        let kgJson = document.getElementById("kgJson").files[0];
        let render = new FileReader(); //新建一个文件读取器
        render.readAsText(kgJson, "UTF-8"); //将读取的内容转化为文本
        render.onload = function (event) {
          let data = JSON.parse(event.target.result); //将获取的数据转化为json格式
          // console.log(data);
          const singleE = [];
          for (let x of data) {
            if (singleE.indexOf(x.name) === -1) {
              singleE.push(x.name);
              _this.kgEnL.push(x);
            }
          }
          _this.entityNum = 0;
          _this.kgNum = 0;
          _this.entityNum = _this.kgEnL.length;
          _this.kgNum = _this.KgListss.length;
          axios.post(_this.path + "/addManyKg1", _this.kgEnL).then((res) => {
            if (res.data === "成功") {
              alert(res.data);
            }
          });
        };
      } else if (_this.display_input_num === 2) {
        _this.KgListss = [];
        _this.kgEnL = [];
        let kgJson = document.getElementById("kgJson").files[0];
        let render = new FileReader(); //新建一个文件读取器
        render.readAsText(kgJson, "UTF-8"); //将读取的内容转化为文本
        render.onload = function (event) {
          let data = JSON.parse(event.target.result); //将获取的数据转化为json格式
          const singleE = [];
          for (let x of data) {
            _this.KgListss.push(x);
            let attrlist = _this.entity_attr.split(";");
            if (singleE.indexOf(x.head) === -1) {
              singleE.push(x.head);
              const kgE = {};
              kgE.name = x.head;
              kgE.labels = _this.entity_labels;
              for (let i of attrlist) {
                if (i !== "") {
                  let attrKey = i.split("_");
                  kgE[attrKey[0]] = attrKey[1];
                }
              }
              _this.kgEnL.push(kgE);
            }
            if (singleE.indexOf(x.foot) === -1) {
              singleE.push(x.foot);
              const kgE1 = {};
              kgE1.name = x.foot;
              kgE1.labels = _this.entity_labels;
              for (let i of attrlist) {
                if (i !== "") {
                  let attrKey = i.split("_");
                  kgE1[attrKey[0]] = attrKey[1];
                }
              }
              _this.kgEnL.push(kgE1);
            }
          }
          _this.entityNum = 0;
          _this.kgNum = 0;
          _this.entityNum = _this.kgEnL.length;
          _this.kgNum = _this.KgListss.length;
          axios.post(_this.path + "/addManyKg1", _this.kgEnL).then((res) => {
            if (res.data === "成功") {
              alert(res.data);
            }
          });
        };
      }
    },
    submitKgR() {
      const _this = this;
      // console.log(_this.kgList);
      axios.post(_this.path + "/addMangKg2", _this.KgListss).then((res) => {
        alert(res.data);
      });
    }, //上传知识之间的关系

    // 知识图谱的数据处理和绘制函数
    dealKgData() {
      //获取知识实体中不同的类型
      const _this = this;
      for (let x of _this.myKG11.nodes) {
        // console.log(_this.kgEnTyList.indexOf(x.labels[0]))
        if (_this.kgEnTyList.indexOf(x.labels[0]) === -1) {
          _this.kgEnTyList.push(x.labels[0]);
        }
        let newData = {};
        let strAttr = "";
        Object.keys(x).forEach((key) => {
          if (
            key !== "vx" &&
            key !== "vy" &&
            key !== "x" &&
            key !== "y" &&
            key !== "id" &&
            key !== "index" &&
            key !== "labels"
          ) {
            strAttr = `${strAttr}${key}_${x[key]};`;
          }
        });
        newData.id = x.id;
        newData.name = x.name;
        newData.labels = x.labels;
        newData.strAttr = strAttr;
        _this.kgEnL.push(newData);
      }
      for (let x of _this.myKG11.links) {
        // console.log(x)
        if (_this.kgReTyList.indexOf(x.relation) === -1) {
          _this.kgReTyList.push(x.relation);
        }
      }
    }, //处理知识图数据，获取独立地知识节点类型
    displayKg() {
      const _this = this;
      axios.get(_this.path + "/getAllEntity").then((res) => {
        _this.myKG11.nodes = res.data;
        axios.get(_this.path + "/getAllKg").then((res) => {
          _this.myKG11.links = res.data;
          _this.myKG1.updataGraphs(_this.myKG11);
          _this.dealKgData();
        });
      });
    }, //重新获取数据，绘制知识图
    add_entity() {
      const _this = this;
      if (_this.entity_name !== "" && _this.entity_labels !== "") {
        let objdata = {};
        objdata.name = _this.entity_name;
        objdata.labels = _this.entity_labels;
        let attrlist = _this.entity_attr.split(";");
        for (let i of attrlist) {
          if (i !== "") {
            let attrKey = i.split("_");
            objdata[attrKey[0]] = attrKey[1];
          }
        }
        //存入数据库
        axios
          .post(_this.path + "/addEntity", objdata)
          .then((res) => {
            alert("添加成功!");
            _this.displayKg();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }, //添加单一实体
    addOneKg() {
      const _this = this;
      if (
        _this.kg_head !== "" &&
        _this.kg_footer !== "" &&
        _this.kg_relation !== ""
      ) {
        let kgObj = {};
        kgObj.head = _this.kg_head;
        kgObj.foot = _this.kg_footer;
        kgObj.relation = _this.kg_relation;
        axios.post(_this.path + "/addKg", kgObj).then((res) => {
          if (res.data === "成功") {
            alert("添加成功！");
            _this.displayKg();
          }
        });
      }
    }, //添加一组知识
    deleteOneKg() {
      const _this = this;
      // console.log('dfd')
      if (
        _this.kg_head !== "" &&
        _this.kg_footer !== "" &&
        _this.kg_relation !== ""
      ) {
        let kgObj = {};
        kgObj.head = _this.kg_head;
        kgObj.foot = _this.kg_footer;
        kgObj.relation = _this.kg_relation;
        axios.post(_this.path + "/deleteKg", kgObj).then((res) => {
          if (res.data === "成功") {
            alert("删除成功！");
            _this.displayKg();
          }
        });
      }
    }, //删除一组知识
    delete_entity() {
      const _this = this;
      if (_this.entity_name !== "" && _this.entity_labels !== "") {
        for (let i in _this.myKG11.nodes) {
          if (
            _this.entity_labels === _this.myKG11.nodes[i].labels[0] &&
            _this.entity_name === _this.myKG11.nodes[i].name
          ) {
            let objdata = {};
            objdata.name = _this.entity_name;
            objdata.labels = _this.entity_labels;
            let attrlist = _this.entity_attr.split(";");
            for (let i of attrlist) {
              let attrKey = i.split("_");
              objdata[attrKey[0]] = attrKey[1];
            }
            //删除数据库内容
            axios
              .post(_this.path + "/deleteEntity", objdata)
              .then((res) => {
                if (res.data === "成功！") {
                  alert("删除成功！");
                  _this.displayKg();
                } else {
                  alert("删除失败！");
                }
              })
              .catch((err) => {
                console.log(err);
              });
            break;
          }
        }
      }
    }, // 删除单一实体
    deleteAll() {
      const _this = this;
      axios.get(_this.path + "/deleteAKg").then((res) => {
        if (res.data === "成功") {
          alert("删除成功！");
          _this.displayKg();
        }
      });
    }, //删除知识库所有的知识
    searchAll() {
      const _this = this;
      _this.displayKg();
    }, //查询所有的知识
    addSomEntity() {
      const _this = this;
      _this.display_input = true;
      _this.entityNum = 0;
      _this.newEntityNum = 0;
      _this.kgNum = 0;
      _this.display_input_num = 0;
    }, // 添加多组实体
    searchKg() {
      const _this = this;
      let searchData = {};
      searchData.head = _this.kg_head;
      searchData.foot = _this.kg_footer;
      searchData.relation = _this.kg_relation;
      axios.post(_this.path + "/searchKg1", searchData).then((res) => {
        // console.log(res.data);
        if (res.data === "查询失败！") {
          alert(res.data);
        } else {
          let nodes = [];
          _this.search_myKG11.links = res.data.links;
          _this.search_myKG11.nodes = res.data.nodes;
          console.log(_this.search_myKG11);
          _this.myKG1.updataGraphs(_this.search_myKG11);
        }
      });
    }, //查询知识节点
    modifyAttr(data) {
      const _this = this
      // console.log(data);
      let objData = {};
      objData.name = data.name;
      objData.id = data.id;
      objData.labels = [];
      objData.labels.push(data.labels[0])
      for(let i of _this.myKG11.nodes){
        if(i.id === data.id){
          objData.labels.push(i.labels[0])
          break
        }
      }
      let attrlist = data.strAttr.split(";");
      for (let i of attrlist) {
        if (i !== "") {
          let attrKey = i.split("_");
          objData[attrKey[0]] = attrKey[1];
        }
      } // 数据的处理
      axios.post(_this.path +'/modifyAttr',objData).then((res)=>{
        alert('修改成功！')
        _this.displayKg()
      }).catch((err)=>{
        alert('修改失败！')
      })
    }, //修改节点相关属性
  },
  mounted() {
    const _this = this;
    _this.myKG1 = new drawKG("zb_main_center_kg");
    _this.displayKg();
    _this.myBar1 = new drawBar("myBar1");
    _this.myBar1.initTitle("实体统计图");
    _this.myBar1.setLegend();
    _this.myBar1.initlegend(["领域1", "领域2"]);
    _this.myBar1.initxdata(["d1", "d2", "f3", "fs"]);
    _this.myBar1.initseries({ name: "领域1", data: [43, 21, 43, 21] });
    _this.myBar1.addSeries({ name: "领域2", data: [13, 21, 43, 21] });
    _this.myBar1.drawBar();
    _this.myBar2 = new drawBar("myBar2");
    _this.myBar2.initTitle("属性统计图");
    _this.myBar2.setLegend();
    _this.myBar2.initlegend(["领域1", "领域2"]);
    _this.myBar2.initxdata(["d1", "d2", "f3", "fs"]);
    _this.myBar2.initseries({ name: "领域2", data: [43, 21, 43, 21] });
    _this.myBar2.drawBar();
    _this.myPie1 = new drawPie("myPie1");
    _this.myPie1.drawPie();
  },
};
</script>

<style scoped>
@import url("../../../assets/css/common/data_input.css");
@import url("../../../assets/css/common/ulList.css");
@import url("../../../assets/css/common/button.css");
@import url("../../../assets/css/common/list_input.css");
@import url("../../../assets/css/zb_system/zb_paper_mainPage.css");
</style>