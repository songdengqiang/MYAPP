<template>
  <div class="schedule">
    <div class="ulList" id="plan_list">
      <ul class="ulList_ul">
        <li class="ulList_li titles">待办任务列表</li>
        <li class="ulList_li titles1" v-for="plan in task_list" :key="plan.id">
          <div>
            <p>{{ plan.task_name }}</p>
            <img
              src="../../assets/icon/add.svg"
              alt="添加任务到今日任务"
              class="add_img1"
              @click="add_today_plan(plan)"
            />
            <img
              src="../../assets/icon/delete.svg"
              alt="添加任务到今日任务"
              class="add_img1"
              @click="delete_task(plan)"
            />
          </div>
          <!-- -->
          <div class="progress_bar">
            <div class="finish_bar" :style="{ width: plan.progress + '%' }">
              {{ plan.progress }}
            </div>
          </div>
        </li>
        <li>
          <img
            src="../../assets/icon/add.svg"
            alt="添加任务"
            class="add_img"
            @click="add_task()"
          />
        </li>
      </ul>
    </div>
    <div class="data_input ulList" v-show="display_input">
      <ul class="ulList_ul">
        <li class="titles">待办任务的录入</li>
        <li class="titles_middle ulList_li">
          <span>待办任务名称：</span>
          <input
            type="text"
            v-model="task_name"
            placeholder="请输入任务名称！"
          />
        </li>
        <li class="titles_middle ulList_li">
          <span>任务完成期限：</span>
          <input
            type="text"
            v-model="task_end_time"
            placeholder="任务结束时间！"
          />
        </li>
        <li class="titles_middle ulList_li">
          <span>任务重要程度：</span>
          <input
            type="text"
            v-model="task_inportant"
            placeholder="任务重要程度！"
          />
        </li>
        <hr />
        <li class="titles_middle">
          <button
            class="btn_pro_red btn"
            @click="
              display_input = false;
              num = 0;
            "
          >
            取消
          </button>
          <button class="btn_pro_green btn" @click="submit_task()">添加</button>
        </li>
        <li class="titles_middle">{{ axios_info }}</li>
      </ul>
    </div>
    <div class="today_plan">
      <div class="plan_panel">
        <header class="titles1 text_style1">
          <span>今日计划任务列表:</span>
          <button class="btn_pro_green" @click="submit_today_plan()">
            今日任务提交
          </button>
          <button class="btn_pro_green" @click="add_today_plan()">
            今日任务添加
          </button>
        </header>
        <div class="table_list">
          <table class="table table-striped">
            <thead>
              <tr>
                <th class="titles1 text_style2">计划名字</th>
                <th class="titles1 text_style2">计划开始时间</th>
                <th class="titles1 text_style2">计划结束时间</th>
                <th class="titles1 text_style2">计划重要程度</th>
                <th class="titles1 text_style2">任务进度</th>
                <th class="titles1 text_style2">任务提交</th>
                <th class="titles1 text_style2">修改任务</th>
                <th class="titles1 text_style2">删除任务</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(task, values) in today_data" :key="task.id">
                <td class="text_style2">{{ task.task_name }}</td>
                <td class="text_style2">{{ task.start_time }}</td>
                <td class="text_style2">{{ task.end_time }}</td>
                <td class="text_style2">{{ task.importance }}</td>
                <td class="text_style2 input_img">
                  <input
                    type="text"
                    v-model="task.progress"
                    :disabled="task.statas"
                  />
                </td>
                <td class="text_style2">
                  <img
                    src="../../assets/icon/submit.svg"
                    alt="提交"
                    @click="submit_plan(values)"
                  />
                </td>
                <td class="text_style2">
                  <img src="../../assets/icon/modify.svg" alt="修改" />
                </td>
                <td class="text_style2">
                  <img src="../../assets/icon/delete.svg" alt="删除" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="plan_description">
        <div class="plan_summary">
          <header class="titles1">今日计划任务总结：</header>
          <textarea name="总结" class="titles1 textstyle"></textarea>
        </div>
        <div class="plan_statistic">
          <div class="graph_bar" id="graph_bar">统计图</div>
          <div class="graph_pie" id="graph_pie"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import * as d3 from "d3";
import commonF from "../../assets/js/common";
export default {
  name: "schedule",
  data() {
    return {
      path_id: null,
      display_input: false,
      num: 0,
      task_name: "",
      task_end_time: 7,
      task_inportant: 3,
      axios_info: "",
      task_list: [],
      today_data: [
        {
          task_name: "学习强国刷积分",
          start_time: "",
          end_time: "",
          importance: 5,
          progress: "0",
        },
        {
          task_name: "微习惯-读一篇文章",
          start_time: "",
          end_time: "",
          importance: 5,
          progress: "0",
        },
        {
          task_name: "微习惯-10个俯卧撑",
          start_time: "",
          end_time: "",
          importance: 5,
          progress: "0",
        },
        {
          task_name: "微习惯-写自己系统功能",
          start_time: "",
          end_time: "",
          importance: 5,
          progress: "0",
        },
        {
          task_name: "微习惯-今日总结",
          start_time: "",
          end_time: "",
          importance: 5,
          progress: "0",
        },
      ],
    };
  },
  methods: {
    draw_pie(container) {
      const _this = this;
      const dom = document.getElementById(container);
      const piechart = _this.$echarts.init(dom);
      let options = {
        // title: {
        //     text: '南丁格尔玫瑰图',
        //     subtext: '纯属虚构',
        //     left: 'center'
        // },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        series: [
          {
            name: "任务完成率",
            type: "pie",
            radius: [30, 90],
            center: ["50%", "50%"],
            roseType: "area",
            label: {
              show: false,
              normal: {
                position: "inside",
                formatter: "{b} : {c})",
                textStyle: {
                  color: "black",
                },
              },
            },
            emphasis: {
              label: {
                show: true,
              },
            },
            data: [
              { value: 90, name: "周1" },
              { value: 90, name: "周2" },
              { value: 94, name: "周3" },
              { value: 96, name: "周4" },
              { value: 99, name: "周5" },
              { value: 98, name: "周6" },
              { value: 97, name: "周7" },
            ],
          },
        ],
      };
      piechart.setOption(options);
    },
    draw_bar(containers) {
      const _this = this;
      const doms = document.getElementById(containers);
      const barchart = _this.$echarts.init(doms);
      let optionss = {
        grid: {
          top: "10%",
          bottom: "12%",
        },
        xAxis: {
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周天"],
        },
        yAxis: {},
        series: [
          {
            name: "完成数",
            type: "bar",
            stack: "one",
            label: {
              show: true,
            },
            data: [
              { value: 6, name: "周1" },
              { value: 5, name: "周2" },
              { value: 6, name: "周3" },
              { value: 4, name: "周4" },
              { value: 7, name: "周5" },
              { value: 5, name: "周6" },
              { value: 6, name: "周7" },
            ],
          },
          {
            name: "未完成数",
            type: "bar",
            stack: "one",
            label: {
              show: true,
            },
            data: [
              { value: 1, name: "周1" },
              { value: 2, name: "周2" },
              { value: 2, name: "周3" },
              { value: 3, name: "周4" },
              { value: 2, name: "周5" },
              { value: 1, name: "周6" },
              { value: 3, name: "周7" },
            ],
          },
        ],
      };
      barchart.setOption(optionss);
    },
    add_task() {
      const _this = this;
      if (_this.num === 0) {
        _this.display_input = true;
        _this.num = 1;
      } else {
        _this.display_input = false;
        _this.num = 0;
      }
    },
    submit_task() {
      const _this = this;
      let new_task = {};
      new_task.task_name = _this.task_name;
      new_task.start_time = commonF.get_today_time()[1];
      let strictIsoParse1 = d3.timeFormat("%Y-%m-%d");
      new_task.end_time = strictIsoParse1(
        new Date(
          new Date().getTime() + _this.task_end_time * 24 * 60 * 60 * 1000
        )
      );
      new_task.importance = _this.task_inportant;
      new_task.progress = "0";
      _this.task_list.push(new_task);
      console.log(_this.task_list);
      axios
        .post(_this.path_id + "/user/plan/addTaskList", _this.task_list)
        .then((res) => {
          if (res.data === "成功") {
            _this.axios_info = "数据插入成功！";
          } else {
            _this.axios_info = "数据插入失败！";
          }
        });
      setTimeout(() => {
        _this.display_input = false;
        _this.num = 0;
      }, 1000);
    },
    delete_task(value) {
      const _this = this;
      let value_index = _this.task_list.indexOf(value);
      _this.task_list.splice(value_index, 1);
      axios
        .post(_this.path_id + "/user/plan/addTaskList", _this.task_list)
        .then((res) => {
          alert(res.data);
        });
    },
    add_today_plan(value) {
      const _this = this;
      value.statas = false;
      _this.today_data.push(value);
    },
    submit_plan(value) {
      const _this = this;
      // console.log( _this.today_data)
      _this.today_data[value].statas = true;
      axios
        .post(_this.path_id + "/user/plan/add_today_plan", _this.today_data)
        .then((res) => {
          _this.$router.push({ path: "/login/schedule" });
        });
      if (parseInt(_this.today_data[value].progress) >= 100) {
        axios.post(
          _this.path_id + "/user/plan/add_finish_plan",
          _this.today_data[value]
        );
      } else {
        let index = _this.task_list.indexOf(_this.today_data[value]);
        if (index >= 0) {
          _this.task_list[index].progress = _this.today_data[value].progress;
          axios.post(_this.path_id + "/user/plan/addTaskList", _this.task_list);
        } else {
          _this.task_list.push(_this.today_data[value]);
          axios.post(_this.path_id + "/user/plan/addTaskList", _this.task_list);
        }
      }
    },
    submit_today_plan() {
      const _this = this;
      axios
        .post(_this.path_id + "/user/plan/add_today_plan", _this.today_data)
        .then((res) => {
          alert("任务提交成功！");
        });
    },
  },
  mounted() {
    const _this = this;
    _this.draw_pie("graph_pie");
    _this.draw_bar("graph_bar");
    //今日默认任务得初始化
    for (let plan_value of _this.today_data) {
      plan_value.start_time = commonF.get_today_time()[1];
      plan_value.end_time = commonF.get_today_time()[1];
      plan_value.statas = false;
    }
    //获取代办计划任务
    _this.path_id = _this.globelV.pathID;
    axios
      .get(_this.path_id + "/user/plan/getTaskList")
      .then((res) => {
        if (res.data != []) {
          _this.task_list = res.data;
        }
      })
      .catch((error) => {
        console.log(error);
      });
    axios.get(_this.path_id + "/user/plan/get_today_plan").then((res) => {
      if (res.data.length > 0) {
        if (res.data[0].start_time === commonF.get_today_time()[1]) {
          _this.today_data = res.data;
        }
      }
    });
  },
};
</script>

<style scoped>
@import url("../../../node_modules/bootstrap/dist/css/bootstrap.min.css");
@import url("../../assets/css/common/button.css");
@import url("../../assets/css/common/fontColor.css");
@import url("../../assets/css/common/ulList.css");
@import url("../../assets/css/common/data_input.css");
@import url("../../assets/css/login/schedule.css");
</style>