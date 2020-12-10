<template>
    <div class="imgGrid">
        <div class="areaS">
            <div>
                <div :class="`imgStr imgStr`+imgN.id" v-for="imgN in imgStyleL" :key="imgN.id">
                    <div class="chooseImg " @click="choose(imgN.name, imgN.id)">{{imgN.name}}({{imgN.num}})</div>
                </div>
            </div>
            <div><img src="../../assets/icon/delete.svg" alt="删除" @click="pagePush()"></div>
        </div>
        <div class="areaD">
            <div class="imgArea" v-for="x in imgList" :key="x.id">
                <img :src="x.imgPath" alt="图片">
                <div class="imgTitle">{{x.Saying}}</div>
            </div>
        </div>
        
    </div>
</template>

<script>
import * as d3 from 'd3'
import axios from 'axios'
export default {
    name: 'imgGrid',
    data () {
        return {
            imgList: [],
            imgStyle: '风景',
            imgStyleL: [
                {name: '风景', num: 30, id: 0},
                {name: '人物', num: 130, id: 1},
                {name: '汽车', num: 20, id: 2},
                {name: '照片', num: 220, id: 3},
            ],
            imgNumT: 4
        }
    },
    methods: {
        pagePush () {
            this.$router.push({path:'/HomePage'})
        },
        choose(name, num) {
            const _this = this
            d3.selectAll('.imgStr').style('background-color', 'rgb(43,93,131)')
            d3.select('.imgStr'+num).style('background-color', 'yellowgreen')
            _this.imgStyle = name
        }
    },
    watch: {
        imgStyle (N, O) {
            const _this = this
            d3.selectAll('.imgArea').remove()
            let pathId = _this.globelV.pathID + '/user/getFuncName'
            axios.get(pathId).then(function (res) {
            _this.imgStyleL = res.data
            for (let i=0; i<res.data.length; i++){
                if ( res.data[i].name === _this.imgStyle){
                    for (let j=0; j<res.data[i].imgS.length; j++) {
                        res.data[i].imgS[j].imgPath = _this.globelV.pathID + res.data[i].imgS[j].imgPath
                        _this.imgList.push(res.data[i].imgS[j])
                    }
                }
            }
            }).catch (function (err) {
                console.log(err)
            })
        }
    },
    mounted () {
        const _this = this
        let pathId = _this.globelV.pathID + '/user/getFuncName'
        axios.get(pathId).then(function (res) {
            _this.imgStyleL = res.data
            for (let i=0; i<res.data.length; i++){
                if ( res.data[i].name === _this.imgStyle){
                    for (let j=0; j<res.data[i].imgS.length; j++) {
                        res.data[i].imgS[j].imgPath = _this.globelV.pathID + res.data[i].imgS[j].imgPath
                        _this.imgList.push(res.data[i].imgS[j])
                    }
                }
            }
        }).catch (function (err) {
            console.log(err)
        })
    }
}
</script>

<style scoped>
@import url("../../assets/css/imgGrid");
</style>>