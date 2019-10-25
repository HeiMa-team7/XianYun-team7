<template>
  <div class="comments_item">
    <div class="comment_head">
      <img
        :src="`${this.$axios.defaults.baseURL + data.account.defaultAvatar}`"
        v-if="data.account.defaultAvatar"
      />
      {{data.account.nickname}}
      <i>{{comment_time}}</i>
      <span>{{data.level}}</span>
    </div>

    <div class="content">
      <!-- 回复的评论 -->
      <CommentsFloor v-if="data.parent" :data="data.parent" @handleReply="handleReply" />

      <div class="content_wrap">
        <div class="comments_content">{{data.content}}</div>
        <el-row type="flex" class="content_img">
          <div v-if="data.pics.length!==0" v-for="(item,index) in data.pics" :key="index">
            <img :src="`${$axios.defaults.baseURL + item.url}`" alt />
          </div>
        </el-row>
        <div class="reply">
          <a href="javascript:;" @click="handleReply(data)">回复</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 引入组件
import CommentsFloor from "@/components/post/commentsFloor";
// 引入转换时间格式插件
import moment from "moment";

export default {
  components: {
    CommentsFloor
  },
  props: ["data"],
  data() {
    return {
      comment_time: ""
    };
  },
  methods: {
    handleReply(data) {
      this.$emit("handleReply", data);
    }
  },
  mounted() {
    // 将时间格按格式转换
    this.comment_time = moment(this.data.updated_at).format("YYYY-MM-DD hh:mm");
  }
};
</script>

<style scoped lang="less">
.comments_item {
  padding: 20px 20px 5px;
  .comment_head {
    font-size: 12px;
    color: #666;
    margin-bottom: 10px;
    img {
      width: 16px;
      height: 16px;
    }
    i {
      font-size: 12px;
      color: #999;
    }
    span {
      float: right;
    }
  }
  .comments_content {
    margin-top: 10px;
  }

  .content {
    padding-left: 30px;
  }

  .content_img {
    div {
      display: inline-block;
      width: 80px;
      height: 80px;
      margin: 10px 5px 0 0;
      padding: 5px;
      border: 1px dashed #ddd;
      border-radius: 5px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }

  .reply {
    height: 20px;
    line-height: 20px;
    font-size: 12px;
    text-align: right;
    color: #1e50a2;
    a {
      display: none;
      color: inherit;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  .content_wrap:hover .reply a {
    display: inline;
  }
}
</style>