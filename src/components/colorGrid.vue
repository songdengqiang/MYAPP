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
                        _this.colorInfo = []
                        for (let i= 0; i<res.data.length; i++ ) {
                            let info = {}
                            info.eName = res.data[i].AciValue;
                            info.decimal = res.data[i].decimal_R +" "+ res.data[i].decimal_G + " " + res.data[i].decimal_B
                            let red = parseInt(res.data[i].decimal_R).toString(16)
                            let green = parseInt(res.data[i].decimal_G).toString(16)
                            let blue = parseInt(res.data[i].decimal_B).toString(16)
                            if (red === '0'){
                                red = '00'
                            }
                            if(green === '0') {
                                green = '00'
                            }
                            if(blue === '0') {
                                blue = '00'
                            }
                            info.RGB = red + green + blue
                            _this.colorInfo.push(info)
                        }
                    })
                    break
                case 6:
                    const pathId6 = _this.globelV.pathID + '/user/getColorInfo' 
                    axios.get(pathId6).then((res)=> {
                        _this.colorInfo = []
                        for (let i= 0; i<res.data.length; i++ ) {
                            let info = {}
                            info.eName = res.data[i].eName;
                            info.decimal = res.data[i].decimal_R +" "+ res.data[i].decimal_G + " " + res.data[i].decimal_B
                            let red = parseInt(res.data[i].RGB.slice(0,2),16) 
                            let green = parseInt(res.data[i].RGB.slice(2,4),16) 
                            let blue = parseInt(res.data[i].RGB.slice(4,6),16) 
                            
                            // let green = res.data[i].RGB.splice(2,4).toString(10)
                            // let blue = res.data[i].RGB.splice(4,6).toString(10)
                            info.decimal = red + " " + green + " " + blue
                            info.RGB = res.data[i].RGB
                            _this.colorInfo.push(info)
                        }
                    })
                    break
                case 1:
                    const pathId7 = _this.globelV.pathID + '/user/getSevenColor' 
                    axios.get(pathId7).then((res)=> {
                        _this.colorInfo = []
                        for (let i= 0; i<res.data.length; i++ ) {
                            let info = {}
                            info.eName = res.data[i].name;
                            info.decimal = res.data[i].decimal_R +" "+ res.data[i].decimal_G + " " + res.data[i].decimal_B
                            let red = parseInt(res.data[i].decimal_R).toString(16)
                            let green = parseInt(res.data[i].decimal_G).toString(16)
                            let blue = parseInt(res.data[i].decimal_B).toString(16)
                            if (red === '0'){
                                red = '00'
                            }
                            if(green === '0') {
                                green = '00'
                            }
                            if(blue === '0') {
                                blue = '00'
                            }
                            info.RGB = red + green + blue
                            _this.colorInfo.push(info)
                        }
                    })
                    break
            }
        }
    },
    mounted () {
        const _this = this
        const pathId = _this.globelV.pathID + '/user/getColorInfo' 
        axios.get(pathId).then((res)=> {
            _this.colorInfo = []
            for (let i= 0; i<res.data.length; i++ ) {
                let info = {}
                info.eName = res.data[i].eName;
                info.decimal = res.data[i].decimal_R +" "+ res.data[i].decimal_G + " " + res.data[i].decimal_B
                let red = parseInt(res.data[i].RGB.slice(0,2),16) 
                let green = parseInt(res.data[i].RGB.slice(2,4),16) 
                let blue = parseInt(res.data[i].RGB.slice(4,6),16) 
                info.decimal = red + " " + green + " " + blue
                info.RGB = res.data[i].RGB
                _this.colorInfo.push(info)
            }                         
        })
    }
}
</script>

<style scoped>
@import url('../assets/css/colorGrid.css');
</style>>
