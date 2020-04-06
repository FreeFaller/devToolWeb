<template>
  <div class="module">
    
    

    组件搜索：<Input style="width:400px" v-model="searchKey" @on-change="searchModule" clearable placeholder="分类、中、英文名、描述搜索" />

    <ul class="module-ul" v-show="modulesSearch.length">
      <li class="module-menu-li">
        <div style="padding:10px 0;text-align:center;">
          搜索到以下结果：
        </div>
        <ul class="module-li-ul">
          <li class="module-li" 
            v-for="item2 in modulesSearch"
            :title="getTitle(item2)"
            @mouseenter="enterItem(item2)" 
            @mouseleave="leaveItem(item2)">
            <img class="module-img" :src="`http://localhost:3000//storeImg/${item2.name}.png`" />
            <div class="big-img">
              <img class="module-img" :src="`http://localhost:3000//storeImg/${item2.name}.png`" />
            </div>
            <div class="module-name">{{item2.cName}}</div>
            <div class="module-btn">
              <Icon type="md-add-circle" @click="add(item2)" />
              <Icon type="md-document" @click="showReadMe(item2)" />
              <Icon type="md-code-working" @click="checkCode(item2)" />
              <Icon type="md-eye" @click="preView(item2)" />
                <!-- <Tooltip content="添加组件" placement="top" transfer>
                  <Icon type="md-add-circle" @click="add(item2)" />
                </Tooltip>
                <Tooltip content="查看文档" placement="top">
                  <Icon type="md-document" @click="showReadMe(item2)" />
                </Tooltip>
                <Tooltip content="查看源码" placement="top">
                  <Icon type="md-code-working" @click="checkCode(item2)" />
                </Tooltip>
                <Tooltip content="组件预览" placement="top">
                  <Icon type="md-eye" @click="preView(item2)" />
                </Tooltip> -->
            </div>
          </li>
          <div style="clear:both;"></div>
        </ul>
      </li>
    </ul>
    <br /><br />

    <ul class="module-ul">
      <li v-for="(item,index) in components" @click="cIndex=index" class="module-menu-li">
        <div :class="getClass(index)">
          {{item.name}}
        </div>
        <ul class="module-li-ul" :style="cIndex!==index?'display:none': ''">
          <li class="module-li" 
            v-for="item2 in item.components" 
            :title="getTitle(item2)" 
            @mouseenter="enterItem(item2)" 
            @mouseleave="leaveItem(item2)">
            <img class="module-img" :src="`http://localhost:3000//storeImg/${item2.name}.png`" />
            <div class="big-img">
              <img class="module-img" :src="`http://localhost:3000//storeImg/${item2.name}.png`" />
            </div>
            <div class="module-name">{{item2.cName}}</div>
            <div class="module-btn">
              <Icon type="md-add-circle" @click="add(item2)" />
              <Icon type="md-document" @click="showReadMe(item2)" />
              <Icon type="md-code-working" @click="checkCode(item2)" />
              <Icon type="md-eye" @click="preView(item2)" />
                <!-- <Tooltip content="添加组件" placement="top" transfer>
                  <Icon type="md-add-circle" @click="add(item2)" />
                </Tooltip>
                <Tooltip content="查看文档" placement="top">
                  <Icon type="md-document" @click="showReadMe(item2)" />
                </Tooltip>
                <Tooltip content="查看源码" placement="top">
                  <Icon type="md-code-working" @click="checkCode(item2)" />
                </Tooltip>
                <Tooltip content="组件预览" placement="top">
                  <Icon type="md-eye" @click="preView(item2)" />
                </Tooltip> -->
            </div>
          </li>
          <div style="clear:both;"></div>
        </ul>
      </li>
    </ul>
    <Modal
      v-model="readModal"
      title="readMe"
      width="850"
      :mask-closable="false">
      {{readTxt}}
      <div v-if="cComponents.name"><img class="docImg" :src="`http://localhost:3000/storeImg/${cComponents.name}.png`" /></div>
      <div slot="footer"></div>
    </Modal>
    <Modal
      v-model="codeModal"
      :title="codeTitle"
      width="850"
      :mask-closable="false">
      <pre v-highlight :key="key"><code>{{code}}</code></pre>
      <div slot="footer"></div>
    </Modal>
    <Modal
      v-model="previewModal"
      title="组件预览"
      width="1000px"
      :mask-closable="false">
      <div class="overview-box">
        <iframe id="previewIframe2" src="" class="overview"></iframe> 
      </div>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>

<script>
import request from '@/utils/request'
import { mapState, mapActions } from 'vuex'
import highlight from "@/directive/highlight";
import Dynamic from '../../dynamic/index'

export default {
  data(){
    return{
      searchKey: '',
      cIndex: null,
      components: [],
      modules: [],
      modulesSearch: [],
      readModal: false,
      readTxt: '',
      cComponents: '',
      key:1, //用于重新初始化highlight计算
      codeModal: false,
      codeTitle:'',
      previewModal:false,
    }
  },
  components:{
    Dynamic
  },
  computed:mapState({
    uuid:state => state.index.uuid,
    code:state => state.index.code.replace(/↵/g,'\n'),
    viewImgSrc:state => state.index.viewImgSrc,
  }),
  directives: {
    highlight
  },
  methods: {
    addDynamic(){
      this.$refs.dynamic.show()
    },
    searchModule(e){
      let key = e.target.value
      if(!key){
        this.modulesSearch = []
        return
      }
      this.getModulesByKey(key)
    },
    getComponetsByType(type, data){
      let arr = []
      data.forEach((item) => {
        if(item.type === type){
          arr.push(item)
        }
      })
      return arr
    },
    getModules(){
      request.get('api/vue/getComponets').then((data)=>{
        let types = [],
            arr = []
        data.infos.forEach((item) => {
          if(types.indexOf(item.type) === -1){
            types.push(item.type)
          }
        })

        types.forEach((item) => {
          let obj = {
            name: item
          }
          obj.components = this.getComponetsByType(item, data.infos)
          arr.push(obj)
        })
        this.components = arr

        let modules = []
        arr.forEach((item) => {
          item.components.forEach((item2) => {
            modules.push(item2)
          })
        })
        this.modules = modules
      });
    },

    getModulesByKey(key){
      let arr = []
      this.modules.forEach((item) => {
        let str = ''
        for(var p in item){
          if(p !== 'autho'){
            str += item[p]
          }
        }
        if(str.indexOf(key) != -1){
          arr.push(item)
        }
      })
      this.modulesSearch = arr
    },

    getTitle(item){
      //if(!item.desc){ return ''}
      return `名称:${item.name}\n描述:${item.desc||'暂无'}`
    },
    getClass(index){
      if(index === this.cIndex){
        return 'module-type-active'
      }
      return 'module-type'
    },
    add(item){
      item.uuid = this.uuid
      this.$store.dispatch('index/uuidAdd')
      this.$store.dispatch('index/addComponent', {...item})
    },
    showReadMe(item){
      this.readModal = true
      this.cComponents = item
      request.get('api/vue/getReadMe', {name: item.name}).then((data)=>{
        this.readTxt = data
      })
    },
    //查看组件源码
    checkCode(item){
      const components = [item.name]
      request.post('api/vue/checkCode', {components}).then((data)=>{
        this.key++
        this.codeTitle = `${item.cName} 源码`
        this.$store.dispatch('index/setCode', data)
        this.codeModal = true
      });
    },
    preView(item){
      const components = [item.name]
      let sendData = {
        components
      }
      document.getElementById('previewIframe2').src = 'about:blank'
      request.post('api/vue/preview', sendData).then(()=>{
        this.$Message.success('预览加载中，请稍候...')
        setTimeout(()=>{
          this.previewModal = true
          document.getElementById('previewIframe2').src = `http://localhost:8010/#/preview`
        },1000)
      });
    },
    enterItem(item){
      const name = item.name
      this.$store.dispatch('index/setViewImgSrc',`http://localhost:3000/storeImg/${name}.png`)
    },
    leaveItem(item){
      const name = item.name
      this.$store.dispatch('index/setViewImgSrc','')
    },
  },
  mounted() {
    this.getModules()
  }
};
</script>

<style lang="less" scoped>
.module{
  height: 100%;
  overflow: auto;
  .module-type,.module-type-active{
    height:30px;
    line-height: 30px;
    background: #999;
    color: #fff;
    text-align: center;
  }
  .module-type-active{
    background: #2a313c;
  }
  .module-li-ul{
    padding: 5px 0;
    
  }
  .module-menu-li{
    margin-bottom:5px;
    cursor: pointer;
  }
  .module-type:hover{
    background: #2a313c;
  }

  .big-img{
    position: absolute;
    left:-500px;
    z-index:100;
    border:1px solid #ccc;
    background:#fff;
    top:0px;
    display:none;
    img{
      width:300px;
      height:300px;
    }
  }
  .module-li{
    font-size: 12px;
    background: #fff;
    position: relative;
    margin: 5px;
    width:110px;
    height: 90px;
    float:left;
    border: 1px solid #ddd;
    cursor: pointer;
    &:hover{
      border-color:#2d8cf0;
      .module-btn{
        display: block;
        font-size: 16px;
        color: #666;
      }
      .big-img{
      }
    }
  }
  .module-name{
    position: absolute;
    bottom: 0;
    left: 1px;
    line-height: 20px;
    color: #333;
    text-align: center;
    width:100%;
  }
  .module-img{
    border: none;
    width: 100%;
    height:70px;
  }

  .module-btn{
    position: absolute;
    width: 100%;
    bottom:18px;
    left:0 ;
    display: none;
    text-align: center;
    a{
      padding: 2px 5px;
      background: #ff0000;
      color: #fff;
      line-height: 14px;
      font-size:12px;
      text-align: center;
    }
  }
  .docImg{
    width:600px;
    height:400px;
    margin: 0 auto;
    display:block;
    border:1px solid #ddd;

  }
}
.overview-box{
  height:400px;
}
.overview{
  border: none;
  width:100%;
  height:100%;
}
</style>
