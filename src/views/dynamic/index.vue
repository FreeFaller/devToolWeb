<template>
  <div>
    <div class="dynamic-box">
      <div>
        
        <RadioGroup v-model="moduleType">
          <Radio label="table">
            <span>表格</span>
          </Radio>
          <Radio label="form">
            <span>表单</span>
          </Radio>
        </RadioGroup>
        <Input placeholder="要插入的页面地址" v-model="fileName" clearable style="width:600px" />
      </div>
      <Divider />
      <div>
        <dyTable v-if="moduleType==='table'" ref="dyTable" />
        <dyForm v-if="moduleType==='form'" ref="dyForm" type="form" />
      </div>

      <div slot="footer" class="dynamic-modal-footer">
        <Button @click="ok('file')" type="primary">确认插入页面</Button>
        <Button @click="ok('code')" type="primary">查看源码</Button>
        <Button @click="ok('copy')" type="primary">copy源码</Button>
        <Button data-clipboard-text="" id="hideCopyBtn" style="display:none">copy源码</Button>
        <Button @click="showModal=false">取消</Button>
      </div>
    </div>

    <Modal v-model="showModal" title="title" width="1400px" footer-hide>
      <!--start-->

      <!--end-->
    </Modal>

    <Modal v-model="codeModal" title="查看源码" width="850" :mask-closable="false">
      <pre v-highlight :key="key"><code>{{code}}</code></pre>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import highlight from "@/directive/highlight";
import Clipboard from 'clipboard'
import request from "@/utils/request";
import dyTable from "./table";
import dyForm from "./form";
export default {
  name: "dynamic",
  data() {
    return {
      fileName: "",
      key: 1,
      codeModal: false,
      showModal: false,
      moduleType: "table",
      clipboard:null,
    };
  },
  components: { dyTable, dyForm },
  directives: {
    highlight
  },

  computed: {
    ...mapState({
      componentList: state => state.index.componentList,
      project: state => state.index.project,
      code: state => state.index.code.replace(/↵/g, "\n")
    })
  },
  methods: {
    show() {
      this.moduleType = "";
      this.showModal = true;
    },
    ok(type) {
      //let { fileName, projectPath, projectStore } = this.project;
      let fileName = this.fileName;
      let sendData = {};
      if (type === "file") {
        if (!fileName) {
          this.$Message.error("请先输入要插入的页面地址");
          return;
        }
        //fileName = `${projectPath}${fileName}`;
        sendData.filePath = fileName;
      }
      if (this.moduleType === "table") {
        sendData.modules = this.$refs.dyTable.getData();
      }

      if (this.moduleType === "form") {
        sendData.modules = this.$refs.dyForm.getData();
      }

      request.post("api/dynamic", sendData).then(data => {
        if (type === "code") {
          this.key++;
          this.$store.dispatch("index/setCode", data);
          this.codeModal = true;
        } else if (type === "copy") {
          const colCopyBtn = document.getElementById("hideCopyBtn");
          let str = data;
          if (colCopyBtn) {
            if (str === "") {
              this.$Message.error("当前暂无数据");
            } else {
              colCopyBtn.setAttribute("data-clipboard-text", str);
              colCopyBtn.click();
            }
          }
        } else {
          this.$Message.success("代码插入成功");
        }

        //console.log(data);
      });
    }
  },
  mounted(){
    this.clipboard = new Clipboard('#hideCopyBtn');
    this.clipboard.on('success', (e)=> {
      this.$Message.success('源码已copy到剪贴板，请直接粘贴使用');
      e.clearSelection();
    });
    this.clipboard.on('error', (e)=> {
      this.$Message.error('copy失败');
    });
  },
  beforeDestroy(){
    this.clipboard.destroy();
  },
};
</script>
<style lang="less">
.dynamic-box {
  background: #fff;
  padding: 20px;
  position: relative;
  
  .ivu-input-wrapper {
    width: 150px;
    margin-right: 8px;
  }
  .ivu-select {
    width: 150px;
    margin-right: 8px;
  }
  .ivu-checkbox-group {
    display: inline-block;
  }
}
.dynamic-module {
  position: relative;
  padding: 20px;
  border: 1px solid #ddd;
  margin-bottom: 10px;
  background: #fff;
}
.dynamic-tool {
  position: absolute;
  top: 20px;
  right: 20px;
}
.dynamic-module-item {
  margin-bottom: 8px;
}
.dynamic-modal-footer {
  padding: 30px 0;
  text-align: center;
}
.dynamic-search {
  padding: 10px;
  border: 1px solid #ddd;
  background: #eee;
}
</style>
