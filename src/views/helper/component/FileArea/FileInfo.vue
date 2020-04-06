<template>
  <div class="file-info">
    <p class="file-name">{{ fileName }}</p>
    <div class="file-btns">
      <label>文件地址：</label>
      <Input v-model="address" placeholder="请输入文件地址" style="width: 300px" clearable />
      <!-- <Button type="primary">新文件</Button>
      <Upload class="upload" :before-upload="handleBeforeUpload" action="//">
        <Button icon="ios-cloud-upload-outline">选择已有文件</Button>
      </Upload>
      <input type="file" id="input" @change="handleFiles"> -->
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: "fileInfo",
  data() {
    return {
      fileName:'Demo.vue',
    };
  },
  computed:{
    address:{
      get(){
        return this.$store.state.components.address
      },
      set(value) {
        this.$store.dispatch('components/editAddress', value)
      }
    },
  },
  methods: {
    // handleBeforeUpload(data,e){
    //   console.log(data,e)
    //   return false
    // },
    // handleFiles(){
    //   let file = document.getElementById("input").files[0]
    //   const img = document.createElement("img");
    //   img.src = window.URL.createObjectURL(file);
    //   img.height = 60;
    //   img.onload = function() {
    //     window.URL.revokeObjectURL(this.src);
    //   }
    //   document.getElementById("ok").appendChild(img);
    //   console.log(file)
    // }
  }
};
</script>
<style lang="less" scoped>
.file-info{
  .file-name{
    font-size: 14px;
    font-weight: bold;
  }
  .file-btns{
    float: right;
    margin-top: -25px;
    .upload{
      display: inline-block;
      margin-left: 20px;
    }
  }
}
</style>
