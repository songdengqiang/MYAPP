<template>
    <div class= 'firstPage'>
        <div>
            <div class = 'imgD1'><img :src="imgPathL" alt="左侧图谱片" class="myImg1"></div>
            <div class = 'imgD2'>
                <div>
                    <div>
                        <img src="../assets/icon/leftArrow.svg" alt="左箭头" @click="PushImg(1)">
                    </div>
                    <div>
                        <img src="../assets/icon/grid.svg" alt="扩展" >
                    </div>
                    <div>
                        <img src="../assets/icon/rightArrow.svg" alt="右箭头" @click="PushImg(2)">
                    </div>
                </div>
                <img :src="imgPath" alt="主侧图谱片" class="myImg">
                <div>
                    {{imgStr}}
                </div>
            </div>
            <div class = 'imgD3'><img :src="imgPathR" alt="右侧图谱片" class="myImg2"></div>
        </div>
        <div>
            <div class="imgStr" v-for="imgN in imgStyle" :key="imgN.id">
                <div class="chooseImg">{{imgN.name}}({{imgN.num}})</div>
            </div>
            <div class="imgSend">
                <img src="../assets/icon/add.svg" alt="添加">
            </div>
        </div>
        <div class="daySayings">
            <div class="strss" v-for="strs in daySaying" :key="strs.id">{{strs}}</div>
        </div>
    </div>
</template>
<script>
// import * as d3 from 'd3'
import axios from 'axios'
import commonF from '../assets/js/common'
export default {
    name: 'firstPage',
    data () {
        return {
            imgStr: '我喜欢的图片',
            imgStyleN: '风景',
            SayingList: [],
            imgList: [],
            dayStr: '要使整个人生都过得舒适、愉快，这是不可能的，因为人类必须具备一种能应付逆境的态度!',
            imgStyle: [
                {name: '风景', 'num': 30},
                {name: '人物', 'num': 130},
                {name: '汽车', 'num': 20},
                {name: '照片', 'num': 220},
            ],
            imgStyleNum: 0,
            imgPath: '',
            imgPathL: '',
            imgPathR: '',
            num: Number,
            PushState: false,
            daySaying: []
        }
    },
    methods: {
        PushImg (num) {
            const _this = this
            switch (num) {
                case 1:
                    _this.PushState = true
                     _this.imgStyleNum--
                    if (_this.imgStyleNum <= 0) {
                        _this.imgStyleNum = _this.imgList.length-1
                    } else {
                       
                    }
                    // console.log(_this.imgStyleNum)
                    if (_this.imgStyleNum === 0) {
                        _this.imgPath = _this.globelV.pathID + _this.imgList[_this.imgStyleNum].imgPath
                            _this.imgPathL = _this.globelV.pathID + _this.imgList[_this.imgList.length-1].imgPath
                            _this.imgPathR = _this.globelV.pathID + _this.imgList[_this.imgStyleNum+1].imgPath
                            _this.imgStr =_this.imgList[_this.imgStyleNum].Saying
                        } else if (_this.imgStyleNum === _this.imgList.length-1)
                        {
                            _this.imgPath = _this.globelV.pathID + _this.imgList[_this.imgStyleNum].imgPath
                            _this.imgPathL = _this.globelV.pathID + _this.imgList[_this.imgStyleNum-1].imgPath
                            _this.imgPathR = _this.globelV.pathID + _this.imgList[0].imgPath
                            _this.imgStr =_this.imgList[_this.imgStyleNum].Saying
                        } else {
                            _this.imgPath = _this.globelV.pathID + _this.imgList[_this.imgStyleNum].imgPath
                            _this.imgPathL = _this.globelV.pathID + _this.imgList[_this.imgStyleNum-1].imgPath
                            _this.imgPathR = _this.globelV.pathID + _this.imgList[_this.imgStyleNum+1].imgPath
                            _this.imgStr =_this.imgList[_this.imgStyleNum].Saying
                    }
                    // _this.PushState = false
                    break
                case 2:
                    _this.imgStyleNum++
                    _this.PushState = true
                    if (_this.imgStyleNum >= _this.imgList.length) {
                        _this.imgStyleNum = 0
                    }
                    // console.log(_this.imgStyleNum)
                    if (_this.imgStyleNum === 0) {
                        _this.imgPath = _this.globelV.pathID + _this.imgList[_this.imgStyleNum].imgPath
                            _this.imgPathL = _this.globelV.pathID + _this.imgList[_this.imgList.length-1].imgPath
                            _this.imgPathR = _this.globelV.pathID + _this.imgList[_this.imgStyleNum+1].imgPath
                            _this.imgStr =_this.imgList[_this.imgStyleNum].Saying
                        } else if (_this.imgStyleNum === _this.imgList.length-1)
                        {
                            _this.imgPath = _this.globelV.pathID + _this.imgList[_this.imgStyleNum].imgPath
                            _this.imgPathL = _this.globelV.pathID + _this.imgList[_this.imgStyleNum-1].imgPath
                            _this.imgPathR = _this.globelV.pathID + _this.imgList[0].imgPath
                            _this.imgStr =_this.imgList[_this.imgStyleNum].Saying
                        } else {
                            _this.imgPath = _this.globelV.pathID + _this.imgList[_this.imgStyleNum].imgPath
                            _this.imgPathL = _this.globelV.pathID + _this.imgList[_this.imgStyleNum-1].imgPath
                            _this.imgPathR = _this.globelV.pathID + _this.imgList[_this.imgStyleNum+1].imgPath
                            _this.imgStr =_this.imgList[_this.imgStyleNum].Saying
                    }
                    // _this.PushState = false
                    break
            }
        }
    },
    watch: {
        daySaying (N, O) {
            const _this = this
            if (_this.num < _this.dayStr.length) {
                setTimeout (function () {
                    _this.daySaying.push(_this.dayStr[_this.num])
                    _this.num++
                }, 200)
            }
        },
        PushState (N, O) {
            const _this = this
            setTimeout (function () {
                _this.PushState = false
                _this.imgStyleNum++
                if (_this.imgStyleNum >= _this.imgList.length) {
                _this.imgStyleNum = 0
                }
                // console.log(1)
            },2000)
        },
        imgPath (N, O) {
            const _this = this
            if (!_this.PushState) {
                _this.imgStyleNum++
                if (_this.imgStyleNum >= _this.imgList.length) {
                _this.imgStyleNum = 0
                }
                // console.log(_this.imgStyleNum)
                setTimeout(function () {
                    if (_this.imgStyleNum === 0) {
                        _this.imgPath = _this.globelV.pathID + _this.imgList[_this.imgStyleNum].imgPath
                        _this.imgPathL = _this.globelV.pathID + _this.imgList[_this.imgList.length-1].imgPath
                        _this.imgPathR = _this.globelV.pathID + _this.imgList[_this.imgStyleNum+1].imgPath
                        _this.imgStr =_this.imgList[_this.imgStyleNum].Saying
                    } else if (_this.imgStyleNum === _this.imgList.length-1)
                    {
                        _this.imgPath = _this.globelV.pathID + _this.imgList[_this.imgStyleNum].imgPath
                        _this.imgPathL = _this.globelV.pathID + _this.imgList[_this.imgStyleNum-1].imgPath
                        _this.imgPathR = _this.globelV.pathID + _this.imgList[0].imgPath
                        _this.imgStr =_this.imgList[_this.imgStyleNum].Saying
                    } else {
                        _this.imgPath = _this.globelV.pathID + _this.imgList[_this.imgStyleNum].imgPath
                        _this.imgPathL = _this.globelV.pathID + _this.imgList[_this.imgStyleNum-1].imgPath
                        _this.imgPathR = _this.globelV.pathID + _this.imgList[_this.imgStyleNum+1].imgPath
                        _this.imgStr =_this.imgList[_this.imgStyleNum].Saying
                    }
                    // console.log(2)
                }, 8000)
            }
        }
    },
    mounted () {
        const _this = this
        let pathId = _this.globelV.pathID + '/user/getFuncName'
        axios.get(pathId).then(function (res) {
            _this.imgStyle = res.data
            for (let i=0; i<res.data.length; i++) {
                if (res.data[i].name === _this.imgStyleN) {
                    _this.imgList = res.data[i].imgS
                    console.log(_this.imgList)
                }
            }
            _this.imgPath = _this.globelV.pathID + _this.imgList[_this.imgStyleNum].imgPath
            _this.imgPathL = _this.globelV.pathID + _this.imgList[_this.imgList.length-1].imgPath
            _this.imgPathR = _this.globelV.pathID + _this.imgList[_this.imgStyleNum+1].imgPath
            _this.imgStr =_this.imgList[_this.imgStyleNum].Saying
        }).catch (function (err) {
            console.log(err)
        })
        axios.get(_this.globelV.pathID + '/user/getSaying').then(function (res) {
            _this.SayingList = res.data
            // console.log(res.data)
            const randomN = commonF.getRndInteger(0, _this.SayingList.length)
            _this.dayStr = _this.SayingList[randomN].saying + " --" + _this.SayingList[randomN].author
            _this.daySaying.push(_this.dayStr[0])
            _this.num = 1
        })
    }
}
</script>

<style scoped>
@import url('../assets/css/firstPage');
</style>