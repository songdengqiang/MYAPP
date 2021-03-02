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
        />
      </div>
      <div class="zb_main_center_kg"></div>
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
            <h3>实体类：</h3>
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
      entity_attr: "",
      kg_head: "",
      kg_footer: "",
      kg_relation: "",
      display_input: false,
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
      //知识组变量
      kgEnTyList: [],
      kgReTyList: [],
      KgListss:[],
      kgEnL:[],
    };
  },
  methods: {
    // search_entity() {
    //   const _this = this;
    //   if (_this.entity_name !== "") {
    //     for (let i of _this.myKG11.nodes) {
    //       if (
    //         _this.entity_labels === i.labels[0] &&
    //         _this.entity_name === i.name
    //       ) {
    //         _this.search_myKG11.nodes.push(i);
    //       }
    //     }
    //     for (let j of _this.myKG11.links) {
    //       if (_this.entity_name === j.source.id) {
    //         _this.search_myKG11.links.push(j);
    //         for (let k of _this.myKG11.nodes) {
    //           if (j.target.id === k.id) {
    //             _this.search_myKG11.nodes.push(k);
    //             break;
    //           }
    //         }
    //       }
    //     }
    //     _this.myKG1.updataGraphs(_this.search_myKG11);
    //   }
    // }, // 查询实体
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
          _this.display_input_num = 1;
          break;
        case 3:
          document.getElementById("kgJson").click();
          _this.display_input_num = 1;
          break;
      }
    },
    submitKgE() {
      const _this = this;
      if (_this.display_input_num === 0) {
        let kgTxt = document.getElementById("kgTxt").files[0];
        let render = new FileReader(); //新建一个文件读取器
        render.readAsText(kgTxt, "UTF-8"); //将读取的内容转化为文本
        render.onload = function (event) {
          let a = event.target.result.replace(/\([^\)]*\)/g, "");
          const dataList = a.split(/[(\r\n)\r\n]+/); //以换行符进行分割
          const singleE = []
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
              const kgE = {}
              kgE.name = splitD[0]
              kgE.labels = _this.entity_labels
              if(singleE.indexOf(splitD[0]) ===-1){
                singleE.push(splitD[0])
                _this.kgEnL.push(kgE)
              }
              const kgE1 = {}
              kgE1.name = splitD[0]
              kgE1.labels = _this.entity_labels
              if(singleE.indexOf(splitD[1]) ===-1){
                singleE.push(splitD[1])
                _this.kgEnL.push(kgE1)
              }
            }
          }
          _this.entityNum = 0
          _this.kgNum = 0
          _this.entityNum = _this.kgEnL.length
          _this.kgNum = _this.KgListss.length
          console.log(_this.KgListss)
          //实体的上传
          axios.post(_this.path + "/addManyKg1", _this.kgEnL).then((res) => {
            if (res.data === "成功") {
              alert(res.data);
            }
          });
        };
      }
    },

    // 知识图谱的数据处理和绘制函数
    dealKgData() {
      //获取知识实体中不同的类型
      const _this = this;
      for (let x of _this.myKG11.nodes) {
        // console.log(_this.kgEnTyList.indexOf(x.labels[0]))
        if (_this.kgEnTyList.indexOf(x.labels[0]) === -1) {
          _this.kgEnTyList.push(x.labels[0]);
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
      }
    }, //添加单一实体
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
    addSomEntity() {
      const _this = this;
      _this.display_input = true;
      _this.entityNum = 0;
      _this.newEntityNum = 0;
      _this.kgNum = 0;
      _this.display_input_num = 0;
    }, // 添加多组实体
    addSomeKg() {
      const _this = this;
      _this.display_input = true;
      _this.entityNum = 0;
      _this.newEntityNum = 0;
      _this.kgNum = 0;
      _this.display_input_num = 1;
    }, //添加多组知识数据
    // submitKgE() {
    //   if ((_this.display_input_num = 0)) {
    //     const _this = this;
    //     let kgJson = document.getElementById("kgJson").files[0];
    //     let render = new FileReader(); //新建一个文件读取器
    //     render.readAsText(kgJson, "UTF-8"); //将读取的内容转化为文本
    //     render.onload = function (event) {
    //       let result = JSON.parse(event.target.result); //读取文件内容
    //       console.log(result);
    //     };
    //   } else {
    //     const _this = this;
    //     let kgJson = document.getElementById("kgJson").files[0];
    //     let render = new FileReader(); //新建一个文件读取器
    //     render.readAsText(kgJson, "UTF-8"); //将读取的内容转化为文本
    //     render.onload = function (event) {
    //       let result = JSON.parse(event.target.result); //读取文件内容
    //       _this.kgNum = result.length;
    //       let entityLists = [];
    //       let newEntityList = [];
    //       _this.kgList = [];
    //       for (let i of result) {
    //         let repead3 = 0;
    //         // console.log(_this.myKG11.links)
    //         for (let o of _this.myKG11.links) {
    //           if (
    //             i.header === o.target.name &&
    //             i.footer === o.source.name &&
    //             i.relation === o.relation
    //           ) {
    //             repead3 = 1;
    //             break;
    //           }
    //         }
    //         if (!repead3) {
    //           let kgObj = {};
    //           kgObj.head = i.header;
    //           kgObj.foot = i.footer;
    //           kgObj.relation = i.relation;
    //           _this.kgList.push(kgObj);
    //         }
    //         let repead1 = 0;
    //         let repead2 = 0;
    //         for (let j of _this.myKG11.nodes) {
    //           if (i.header === j.name) {
    //             entityLists.push(j);
    //             repead1 = 1;
    //             break;
    //           }
    //         }
    //         for (let k of _this.myKG11.nodes) {
    //           if (i.footer === k.name) {
    //             entityLists.push(k);
    //             repead2 = 1;
    //             break;
    //           }
    //         }
    //         if (!repead1) {
    //           if (newEntityList.length > 0) {
    //             let num = 0;
    //             for (let n of newEntityList) {
    //               if (i.header === n.name) {
    //                 num = 1;
    //                 break;
    //               }
    //             }
    //             if (!num) {
    //               let obj = {};
    //               obj.name = i.header;
    //               obj.labels = "common";
    //               newEntityList.push(obj);
    //               entityLists.push(obj);
    //             }
    //           } else {
    //             let obj = {};
    //             obj.name = i.header;
    //             obj.labels = "common";
    //             newEntityList.push(obj);
    //             entityLists.push(obj);
    //           }
    //         }
    //         if (!repead2) {
    //           if (newEntityList.length > 0) {
    //             let num = 0;
    //             for (let n of newEntityList) {
    //               if (i.footer === n.name) {
    //                 num = 1;
    //                 break;
    //               }
    //             }
    //             if (!num) {
    //               let obj = {};
    //               obj.name = i.footer;
    //               obj.labels = "common";
    //               newEntityList.push(obj);
    //               entityLists.push(obj);
    //             }
    //           } else {
    //             let obj = {};
    //             obj.name = i.footer;
    //             obj.labels = "common";
    //             newEntityList.push(obj);
    //             entityLists.push(obj);
    //           }
    //         }
    //       } //数据的处理
    //       _this.newEntityNum = newEntityList.length;
    //       _this.entityNum = entityLists.length;
    //       axios.post(_this.path + "/addManyKg1", newEntityList).then((res) => {
    //         if (res.data === "成功") {
    //           alert(res.data);
    //           _this.$d3.select(".btn11").style("curser", "none");
    //         }
    //       });
    //     };
    //   }
    // },
    submitKgR() {
      const _this = this;
      console.log(_this.kgList);
      axios.post(_this.path + "/addMangKg2", _this.KgListss).then((res) => {
        if (res.data === "成功") {
          alert(res.data);
        }
      });
    },
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