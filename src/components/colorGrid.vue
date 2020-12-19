<template>
  <div class="colorGrid">
      <div>
          <div @click="changeC(1)">七主色</div>
          <div @click="changeC(2)">十二色环</div>
          <div @click="changeC(3)">24色板</div>
          <div @click="changeC(4)">36色板</div>
          <div @click="changeC(5)">72色板</div>
          <div @click="changeC(6)">RGB-color色板</div>
          <div @click="changeC(7)">Aci码色板</div>
      </div>
      <div>
          <div class="colorDiv" v-for="x in colorInfo" :key="x.id">
              <div :style="{background: '#'+x.RGB}"></div>
              <p :style="{color: '#'+x.RGB}">{{x.eName}}</p>
              <p>{{x.decimal}}</p>
              <p>#{{x.RGB}}</p>
          </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'colorGrid',
    data () {
        return {
            colorInfo: [
                {eName: 'green', RGB: '#008000', decimal: 'rgb(255,0,0)'},
            ]
        }
    },
    methods: {
        changeC (num) {
            const _this = this
            switch (num) {
                case 7:
                    const pathId = _this.globelV.pathID + '/user/getColorInfo1' 
                    axios.get(pathId).then((res) => {
                        console.log(res.data)
                        _this.colorInfo = []
                        for (let i= 0; i<res.data.length; i++ ) {
                            let info = {}
                            info.eName = res.data[i].AciValue;
                            info.RGB = res.data[i].decimal_R + res.data[i].decimal_G + res.data[i].decimal_B
                        }
                    })
                    break
                case 6:
                    const pathId6 = _this.globelV.pathID + '/user/getColorInfo' 
                    axios.get(pathId6).then((res)=> {
                        _this.colorInfo = res.data
                    })
                    break
            }
        }
    },
    mounted () {
        const _this = this
        const pathId = _this.globelV.pathID + '/user/getColorInfo' 
        axios.get(pathId).then((res)=> {
            _this.colorInfo = res.data
        })
    }
}
</script>

<style scoped>
@import url('../assets/css/colorGrid.css');
</style>>
