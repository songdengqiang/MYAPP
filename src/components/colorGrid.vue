<template>
  <div class="colorGrid">
      <div>
          <div>七主色</div>
          <div>十二色环</div>
          <div>24色板</div>
          <div>36色板</div>
          <div>72色板</div>
          <div>RGB-color色板</div>
          <div>标准色板</div>
      </div>
      <div>
          <div class="colorDiv" v-for="x in colorInfo" :key="x.id">
              <div :style="{background: '#'+x.RGB}"></div>
              <p :style="{color: '#'+x.RGB}">{{x.eName}}</p>
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
                {eName: 'green', RGB: '#008000'},
            ]
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
