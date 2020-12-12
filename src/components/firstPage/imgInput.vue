<template>
  <div class="imgInput">
      <div>
          <h4>图片名:</h4>
          <input type="text" class="dataInput" placeholder="请输入图片保存的名字！" autofocus="autofocus" v-model="imgName">
      </div>
      <div>
          <h4>图片的类别:</h4>
          <input type="text" class="dataInput dataInput1" style="width:50%" placeholder="请选则图片的类别！" v-model="imgStyle">
          <div>
              <img src="../../assets/icon/downArrow.svg" alt="下拉菜单" class="icon" @click="display(1)">
          </div>
          <div class="barChoose" v-show="displays">
              <ul>
                  <li v-for="x in imgStyles" :key="x.id" @click="displayss(x)">{{x}}</li>
              </ul>
          </div>
      </div>
      <div>
          <h4>图片的感想:</h4>
          <input type="text" class="dataInput" placeholder="请输入图片的感想！" v-model="imgSaying">
      </div>
      <div>
          <h4>图片的选择:</h4>
          <input type="file" class="dataInput fileP" @change="showImg()" ref="img">
      </div>
      <div>
          <img src="" alt="上传的图片!" id="img">
      </div>
      <div>
          <button @click="sendImg()">上传</button>
          <button>修改</button>
      </div>
      <div>
          <p>{{errData}}</p>
      </div>
  </div>
</template>

<script>
import * as d3 from 'd3'
import axios from 'axios'
export default {
    name: 'imgInput',
    data () {
        return {
            errData: '上传失败,请重新上传！',
            imgStyles: [],
            statas: 0,
            imgStyle: '',
            displays: false,
            imgName: '百度卡通图片',
            imgSaying: '静心、修心、放心！',
            imgfile: null
        }
    },
    methods: {
        display (num) {
            const _this = this
            if (_this.statas === 0) {
                 _this.displays = true
                 _this.statas = 1
             } else {
                 _this.displays = false
                 _this.statas = 0
             }
             
        },
        displayss (strs) {
             const _this = this
             _this.imgStyle = strs
             _this.displays = false
        },
        showImg () {
            const _this = this
            var file = this.$refs.img;
            _this.imgfile = file.files[0]
            var reader = new FileReader();
            reader.readAsDataURL(file.files[0]);
            console.log(file.files[0])
            reader.onload = function () {
                //改变img的路径
                document.getElementById("img").src = this.result;
            };
        },
        // 判断图片的大小
        beforeAvatarUpload (file) {
            const isLt2M = file.size / 1024 / 1024 < 2
            if (!isLt2M) {
                this.errData = this.errData + '上传头像图片大小不能超过 2MB!'
            }
            return isLt2M
        },
        sendImg () {
            const _this = this
            if (_this.beforeAvatarUpload(_this.imgfile)) {
                // console.log(_this.imgfile.file)
                let params = new FormData()
                params.append('img', _this.imgfile)
                params.append('Saying', _this.imgSaying)
                params.append('name', _this.imgName)
                params.append('style', _this.imgStyle)
                console.log(params) // FormData私有类对象，访问不到，可以通过get判断值是否传进去
                let config = {
                    headers: {'Content-Type': 'multipart/form-data'}
                }
                axios.post(_this.globelV.pathID + '/user/postImgData', params, config).then(res => {
                    _this.errData = res.data
                }).catch(function () {
                    console.log('上传失败！')
                }) 
            }

        }
    },
    mounted () {
        const _this = this
        let pathId = _this.globelV.pathID + '/user/getFuncName'
        axios.get(pathId).then(function (res) {
            const styles = []
            for (let i=0; i<res.data.length; i++){
                styles.push(res.data[i].name)
            }
            _this.imgStyles = styles
        })
    }

}
</script>

<style scoped>
@import url('../../assets/css/firstPage/imgInput');
</style>