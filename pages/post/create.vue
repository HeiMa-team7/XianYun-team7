<template>
  <div class="maxBox clearfix">
    <div class="fl">
      <h2>发表新攻略</h2>
      <span>分享你的个人游记，让更多人看到哦！</span>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item prop="title">
          <el-input v-model="form.title" placeholder="请输入标题"></el-input>
        </el-form-item>
      </el-form>

      <!-- 富文本编辑器 -->
      <div id="app">
        <VueEditor class="VueEditor" :config="config" ref="vueEditor" />
      </div>

      <el-form class="el_form" ref="form" :model="form" label-width="80px">
        <el-form-item>
          <span>选择城市</span>

          <!-- fetch-suggestions 返回输入建议的方法 -->
          <!-- select 点击选中建议项时触发 -->
          <el-autocomplete
            :fetch-suggestions="queryDepartSearch"
            placeholder="请搜索游玩城市"
            @select="handleDepartSelect"
            class="el-autocomplete"
            v-model="form.city"
            @blur="handleBlur(`depart`)"
          ></el-autocomplete>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">发布</el-button>
          <i>或者</i>
          <span @click="handleClick" class="save">保存到草稿</span>
        </el-form-item>
      </el-form>
    </div>

    <div class="fr drafts">
      <p>草稿箱 ({{$store.state.post.draft.length}})</p>
      <div class="drafts_list" v-for="(item,index) in $store.state.post.draft" :key="index">
        <div class="title">
          <span @click="handleEditor(index)">
            {{item.title}}
            <i class="iconfont el-icon-edit"></i>
          </span>
          <button @click="handleDelete(index)" class="fr delete">删除</button>
          <el-row></el-row>
        </div>

        <p class="time">{{item.time}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

/* 导入富文本编辑器 */
import "quill/dist/quill.snow.css";
let VueEditor;
if (process.browser) {
  VueEditor = require("vue-word-editor").default;
}

export default {
  name: "app",
  components: {
    VueEditor
  },

  data() {
    return {
      form: {
        title: "", //标题
        content: "", //内容
        city: "" //城市id|城市名称
      },
      /* 存放newData的城市的数组 */
      cities: [],
      cityData: [],
      config: {
        // 上传图片的配置
        uploadImage: {
          url: this.$axios.defaults.baseURL + "/upload",
          name: "files",
          // res是结果，insert方法会把内容注入到编辑器中，res.data.url是资源地址
          uploadSuccess: (res, insert) => {
            insert(this.$axios.defaults.baseURL + res.data[0].url);
          }
        }
      }
    };
  },
  methods: {
    // 出发城市输入框值发生变化触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    queryDepartSearch(value, cb) {
      // 没有输入值，不进行获取
      if (!value) {
        // 不显示下拉框
        cb([]);
        return;
      }

      this.$axios({
        url: "/airs/city?name=" + value
      }).then(res => {
        // data是后台返回的城市数组,没有value属性
        const { data } = res.data;
        // 循环给每一项添加value属性
        const newData = data.map(v => {
          v.value = v.name;
          return v;
        });
        this.cities = newData;
        // 展示到下拉列表
        cb(newData);
      });
    },

    // 失去焦点的时候默认选择下拉列表第一项
    handleBlur(type) {
      if (this.cities.length > 0) {
        this.form.city = this.cities[0].value;
      }
    },

    // 出发城市下拉选择时触发
    handleDepartSelect(item) {
      this.form.city = item.value;
    },
    /* 删除草稿 */
    handleDelete(index) {
      this.$store.commit("post/delDraftData", index);
      this.$message.success("删除成功");
    },

    /* 编辑草稿 */
    handleEditor(index) {
      this.form = {
        title: "",
        city: ""
      };

      this.$refs.vueEditor.editor.root.innerHTML = "";
      /* 把详情的数据赋值给data的form */
      /* 把文章的内容回显到表单中 */
      this.form = {
        title: this.$store.state.post.draft[index].title,
        content: "",
        city: this.$store.state.post.draft[index].cityName
      };

      /* 把文章的内容赋值给富文本编辑器 */
      this.$refs.vueEditor.editor.clipboard.dangerouslyPasteHTML(
        0,
        this.$store.state.post.draft[index].content
      );
    },

    /* 保存到草稿箱 */
    handleClick() {
      /* 获取富文本框的内容 */
      this.form.content = this.$refs.vueEditor.editor.root.innerHTML;

      /* 表单验证 */
      if (this.form.title === "") {
        this.$message.error("请输入标题");
        return;
      }

      if (this.form.content === "<p><br></p>") {
        this.$message.error("请输入内容");
        return;
      }

      if (this.form.city === "") {
        this.$message.error("请输入城市");
        return;
      }
      /* 保存数据*/
      let str = {
        cityName: this.form.city,
        content: this.form.content,
        time: moment().format("YYYY-MM-DD"),
        title: this.form.title
      };

      /* 调用vuex保存数据 */
      this.$store.commit("post/setDraft", str);
      this.$message.success("保存成功");
      setTimeout(() => {
        location.reload();
      }, 1000);
    },

    /* 文章发布 */
    onSubmit() {
      /* 获取富文本框的内容 */
      this.form.content = this.$refs.vueEditor.editor.root.innerHTML;
      /* 表单验证 */
      if (this.form.title === "") {
        this.$message.error("请输入标题");
        return;
      }

      if (this.form.content === "<p><br></p>") {
        this.$message.error("请输入内容");
        return;
      }

      if (this.form.city === "") {
        this.$message.error("请输入城市");
        return;
      }

      /* 发起请求 */
      this.$axios({
        url: "/posts",
        method: "POST",
        headers: {
          // 这是jwt标准的token
          Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
        },
        data: this.form
      }).then(res => {
        const { message } = res.data;
        this.$message.success(message);
        setTimeout(() => {
          location.reload();
        }, 1000);
      });
    }
  }
};
</script>

<style scoped lang="less">
.maxBox {
  width: 1000px;
  margin: 0 auto;
  padding-top: 20px;
  .fl {
    width: 750px;
    h2 {
      font-weight: 200;
      margin: 0px 0 10px 0;
    }
    span {
      font-size: 12px;
      color: #999999;
      margin-bottom: 5px;
    }

    #app {
      margin: 0 0 20px 0;
      padding-bottom: 30px;
      .VueEditor {
        height: 460px;
      }
    }
    .el_form {
      vertical-align: middle;
      span {
        margin-right: 5px;
        color: #000;
      }
      .input {
        width: 200px;
      }
      i {
        margin: 0 3px 0 5px;
      }
      .save {
        color: #ffa500;
        cursor: pointer;
      }
      .save:hover {
        border-bottom: 1px solid #ffa500;
      }
    }

    /deep/ .el-form-item__content {
      margin: 10px 0 20px 0 !important;
    }
  }

  .drafts {
    width: 200px;
    border: 1px solid #ddd;
    padding: 10px 10px 0 10px;
    p {
      color: #666666;
      margin-bottom: 10px;
    }
    .title {
      cursor: pointer;
    }
    .title:hover {
      color: #ffa500;
    }
    .time {
      font-size: 14px;
    }
    .delete {
      width: 40px;
      height: 25px;
      border: none;
      border-radius: 5px;
      background-color: orange;
    }
  }
}
</style>