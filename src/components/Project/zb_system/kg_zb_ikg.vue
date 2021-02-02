<template>
  <div class="zb_papar_mainPage">
    <div class="zb_main_left">
      <h2>IKG知识库的统计</h2>
      <div class="zb_main_left_bar" id="myBar1"></div>
      <div class="zb_main_left_bar" id="myBar2"></div>
      <div class="zb_main_left_pie" id="myPie1">
      </div>
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
            <input
              type="text"
              class="list_input_value"
              v-model="entity_labels"
              autocomplete="value"
              placeholder="value"
            />
          </li>
          <li class="list_input_li">
            <h3>实体名：</h3>
            <input
              type="text"
              class="list_input_value"
              v-model="entity_name"
              placeholder="value"
            />
          </li>
          <li class="list_input_li">
            <h3>实体属性：</h3>
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
              title="查询一个实体及其具有的关系实体"
              @click="search_entity()"
            >
              查询
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
          </li>
          <li class="list_input_li">
            <h3>尾实体：</h3>
            <input
              type="text"
              class="list_input_value"
              placeholder="entity"
              v-model="kg_footer"
            />
          </li>
          <li class="list_input_li">
            <h3>实体关系：</h3>
            <input
              type="text"
              class="list_input_value"
              placeholder="relation"
              v-model="kg_relation"
            />
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
              title="导入多组知识"
              @click="addSomeKg()"
            >
              <input type="file" style="width: 0; height: 0" id="kgJson" />
              导入
            </div>
          </li>
        </ul>
      </div>
      <div class="zb_main_right_bar">
        <ul class="list_input">
          <li class="list_input_li">
            <h3>关系类型：</h3>
            <input type="text" class="list_input_value" placeholder="value" />
          </li>
          <li class="list_input_li">
            <h3>关系名：</h3>
            <input type="text" class="list_input_value" placeholder="value" />
          </li>
          <li class="list_input_li">
            <h3>关系属性：</h3>
            <input
              type="text"
              class="list_input_value"
              placeholder="key_value;key_value"
            />
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
      <div class="inputFile" v-show="display_input">
        <div class="inputFile1">
          <div class="btn_pro_green btn1" @click="chooseFile()">知识文件</div>
          <div class="btn_pro_green btn2" @click="chooseFile()">实体文件</div>
        </div>
        <div class="inputFile2">
          <ul>
            <li>
              <span>知识数：</span>
              <h3>{{ kgNum }}</h3>
            </li>
            <li>
              <span>实体数：</span>
              <h3>{{ entityNum }}</h3>
            </li>
            <li>
              <span>新增实体数：</span>
              <h3>{{ newEntityNum }}</h3>
            </li>
          </ul>
        </div>
        <div class="inputFile1">
          <div @click="submitKgE()" class="btn_pro_green btn1" id="btn11">
            知识实体导入
          </div>
          <div @click="submitKgR()" class="btn_pro_green btn1">
            知识关系导入
          </div>
          <div @click="inputClose()" class="btn_pro_green btn2">关闭</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import drawBar from "../../../assets/js/draw_bar_chart";
import drawPie from "../../../assets/js/draw_pie_chart ";
import drawKG from "../../../assets/js/creatKG";
import axios from "axios";
export default {
  name: "kg_zb_ikg",
  data() {
    return {
      path: this.globelV.pathID + "/user/project/zbSystem",
      myBar1: null,
      myBar2: null,
      myKG2:null,
      kgNum: 0,
      entityNum: 0,
      newEntityNum: 0,
      entity_labels: "",
      entity_name: "",
      entity_attr: "",
      kg_head: "",
      kg_footer: "",
      kg_relation: "",
      display_input: false,
      relation_list: [{ name: "", type: "", attr: {} }],
      myKG11: {
        nodes: [{ id: 0, color: "red", labels: ["person"], name: "机床1" }],
        links: [],
      },
      myKG12: {
        nodes: [
          { id: 0, color: "red", labels: ["person"], name: "机床1" },
          { id: 1, color: "red", labels: ["person"], name: "机床21" },
          { id: 2, color: "red", labels: ["person"], name: "机床11" },
          { id: 3, color: "red", labels: ["person"], name: "机床51" },
          { id: 4, color: "red", labels: ["person"], name: "机床61" },
          { id: 5, color: "red", labels: ["person"], name: "机床71" },
        ],
        links: [],
      },
      search_myKG11: {
        nodes: [],
        links: [],
      },
      //知识组
      kgList: [],
    };
  },
  methods: {
    add_entity() {
      const _this = this;
      if (_this.entity_name !== "" && _this.entity_labels !== "") {
        let repeat = 1;
        for (let j of _this.myKG11.nodes) {
          if (
            _this.entity_name === j.name &&
            _this.entity_labels === j.labels[0]
          ) {
            repeat = 0;
            break;
          }
        }
        if (repeat === 1) {
          let objdata = {};
          objdata.name = _this.entity_name;
          objdata.labels = _this.entity_labels;
          let attrlist = _this.entity_attr.split(";");
          for (let i of attrlist) {
            let attrKey = i.split("_");
            objdata[attrKey[0]] = attrKey[1];
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
        } else {
          alert("该实体已存在！");
        }
      }
    }, //添加实体
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
    }, // 删除实体
    search_entity() {
      const _this = this;
      if (_this.entity_name !== "") {
        for (let i of _this.myKG11.nodes) {
          if (
            _this.entity_labels === i.labels[0] &&
            _this.entity_name === i.name
          ) {
            _this.search_myKG11.nodes.push(i);
          }
        }
        for (let j of _this.myKG11.links) {
          if (_this.entity_name === j.source.id) {
            _this.search_myKG11.links.push(j);
            for (let k of _this.myKG11.nodes) {
              if (j.target.id === k.id) {
                _this.search_myKG11.nodes.push(k);
                break;
              }
            }
          }
        }
        _this.myKG1.updataGraphs(_this.search_myKG11);
      }
    }, // 查询实体
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
    displayKg1(kgCon) {
      const _this = this;
      kgCon.updataGraphs(_this.myKG12);
    }, //绘制知识图
    addSomeKg() {
      const _this = this;
      _this.display_input = true;
      _this.entityNum = 0;
      _this.newEntityNum = 0;
      _this.kgNum = 0;
    }, //添加多组知识数据
    chooseFile() {
      const _this = this;
      document.getElementById("kgJson").click();
    },
    submitKgE() {
      const _this = this;
      let kgJson = document.getElementById("kgJson").files[0];
      let render = new FileReader(); //新建一个文件读取器
      render.readAsText(kgJson, "UTF-8"); //将读取的内容转化为文本
      render.onload = function (event) {
        let result = JSON.parse(event.target.result); //读取文件内容
        _this.kgNum = result.length;
        let entityLists = [];
        let newEntityList = [];
        _this.kgList = [];
        for (let i of result) {
          let repead3 = 0;
          // console.log(_this.myKG11.links)
          for (let o of _this.myKG11.links) {
            if (
              i.header === o.target.name &&
              i.footer === o.source.name &&
              i.relation === o.relation
            ) {
              repead3 = 1;
              break;
            }
          }
          if (!repead3) {
            let kgObj = {};
            kgObj.head = i.header;
            kgObj.foot = i.footer;
            kgObj.relation = i.relation;
            _this.kgList.push(kgObj);
          }
          let repead1 = 0;
          let repead2 = 0;
          for (let j of _this.myKG11.nodes) {
            if (i.header === j.name) {
              entityLists.push(j);
              repead1 = 1;
              break;
            }
          }
          for (let k of _this.myKG11.nodes) {
            if (i.footer === k.name) {
              entityLists.push(k);
              repead2 = 1;
              break;
            }
          }
          if (!repead1) {
            if (newEntityList.length > 0) {
              let num = 0;
              for (let n of newEntityList) {
                if (i.header === n.name) {
                  num = 1;
                  break;
                }
              }
              if (!num) {
                let obj = {};
                obj.name = i.header;
                obj.labels = "common";
                newEntityList.push(obj);
                entityLists.push(obj);
              }
            } else {
              let obj = {};
              obj.name = i.header;
              obj.labels = "common";
              newEntityList.push(obj);
              entityLists.push(obj);
            }
          }
          if (!repead2) {
            if (newEntityList.length > 0) {
              let num = 0;
              for (let n of newEntityList) {
                if (i.footer === n.name) {
                  num = 1;
                  break;
                }
              }
              if (!num) {
                let obj = {};
                obj.name = i.footer;
                obj.labels = "common";
                newEntityList.push(obj);
                entityLists.push(obj);
              }
            } else {
              let obj = {};
              obj.name = i.footer;
              obj.labels = "common";
              newEntityList.push(obj);
              entityLists.push(obj);
            }
          }
        } //数据的处理
        _this.newEntityNum = newEntityList.length;
        _this.entityNum = entityLists.length;
        axios.post(_this.path + "/addManyKg1", newEntityList).then((res) => {
          if (res.data === "成功") {
            alert(res.data);
            _this.$d3.select(".btn11").style("curser", "none");
          }
        });
      };
    },
    submitKgR() {
      const _this = this;
      // console.log(_this.kgList);
      axios.post(_this.path + "/addMangKg2", this.kgList).then((res) => {
        if (res.data === "成功") {
          alert(res.data);
        }
      });
    },
    inputClose() {
      const _this = this;
      _this.display_input = false;
      _this.displayKg();
    },
  },
  mounted() {
    const _this = this;
    _this.myKG1 = new drawKG("zb_main_center_kg");
    _this.displayKg(_this.myKG1);
    _this.myBar1 = new drawBar("myBar1");
    _this.myBar1.initTitle("实体相似度统计图");
    _this.myBar1.initlegend(["类别1", "类别2"]);
    _this.myBar1.initxdata(["实体1", "实体2", "实体3", "实体4"]);
    _this.myBar1.initseries({ name: "类别1", data: [23, 11, 22, 31] });
    _this.myBar1.drawBar();
    _this.myBar2 = new drawBar("myBar2");
    _this.myBar2.initTitle("属性相似度统计图");
    _this.myBar2.initlegend(["领域1", "领域2"]);
    _this.myBar2.initxdata(["d1", "d2", "f3", "fs"]);
    _this.myBar2.initseries({ name: "领域2", data: [43, 21, 43, 21] });
    _this.myBar2.drawBar();
    _this.myKG2 = new drawKG("zb_main_left_pie");
    _this.displayKg1(_this.myKG2);
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