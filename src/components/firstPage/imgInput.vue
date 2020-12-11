<template>
  <div class="imgInput">
      <div>
          <h4>图片名:</h4>
          <input type="text" class="dataInput" placeholder="请输入图片保存的名字！" autofocus="autofocus">
      </div>
      <div>
          <h4>图片的类别:</h4>
          <input type="text" class="dataInput" placeholder="请选则图片的类别！">
      </div>
      <div>
          <h4>图片的感想:</h4>
          <input type="text" class="dataInput" placeholder="请输入图片的感想！">
      </div>
      <div>
          <h4>图片的选择:</h4>
          <input type="text" class="dataInput" placeholder="请选择需要上传的图片！">
      </div>
      <div>
          <img src="" alt="上传的图片!">
      </div>
      <div>
          <button>上传</button>
          <button>修改</button>
      </div>
      <div>
          <p>{{errData}}</p>
      </div>
  </div>
</template>

<script>
export default {
    name: 'imgInput',
    data () {
        return {
            errData: '上传失败,请重新上传！'
        }
    }
}
</script>

<style scoped>
@import url('../../assets/css/firstPage/imgInput');
</style>