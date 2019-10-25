<template>
    <el-row class="container" type="flex" justify="space-between">
        <!-- 左侧文章详情 -->
        <div class="main">
            <!-- 文章顶部面包屑位置 -->
            <Breadcrumb :router_data="router" />

            <!-- 文章详情 -->
            <div class="post">
                <h1>{{post.title}}</h1>
                <div class="post_info">
                    <span>攻略：{{createdTime}}</span>
                    <span>阅读：{{post.watch}}</span>
                </div>
                <div class="post_content" v-html="post.content"></div>
            </div>

            <!-- 点赞评论分享栏 -->
            <DetailCtrl :comment="comments_len" />

            <!-- 发表评论 -->
            <div class="comments_input">
                <h4>评论</h4>
                <!-- 回复时显示回复的用户名 -->
                <el-tag
                    v-if="isReply"
                    :key="reply.account.nickname"
                    closable
                    type="info"
                    @close="handleRemoveReply"
                >{{reply.account.nickname}}</el-tag>
                <!-- 文本框组件 -->
                <el-input
                    resize="none"
                    type="textarea"
                    :rows="2"
                    ref="textarea"
                    placeholder="说点什么吧..."
                    v-model="content"
                ></el-input>
                <!-- 上传照片组件 -->
                <el-row type="flex" justify="space-between">
                    <el-upload
                        :action="`${$axios.defaults.baseURL}/upload`"
                        name="files"
                        ref="upload"
                        list-type="picture-card"
                        :on-success="handleSuccess"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove"
                    >
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt />
                    </el-dialog>
                    <el-button type="primary" @click="onSubmit">提交</el-button>
                </el-row>
            </div>

            <!-- 评论展示 -->
            <div class="comments" v-if="comments_len!=0">
                <div class="comments_list">
                    <CommentsItem
                        v-for="(item,index) in comments"
                        :key="index"
                        class="comments_item"
                        :data="item"
                        @handleReply="handleReply"
                    />
                </div>
                <!-- 评论的分页组件 -->
                <el-pagination
                    class="setpage"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pageIndex"
                    :page-sizes="[2, 4, 6, 8]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="comments_len"
                ></el-pagination>
            </div>
        </div>
        <!-- 右侧相关攻略 -->
        <DetailAside />
    </el-row>
</template>

<script>
// 引入组件
import DetailAside from "@/components/post/detailAside";
import DetailCtrl from "@/components/post/detailCtrl";
import CommentsItem from "@/components/post/commentsItem";
import Breadcrumb from "@/components/breadcrumb";

// 引入转换时间格式插件
import moment from "moment";
export default {
    components: {
        DetailAside,
        DetailCtrl,
        CommentsItem,
        Breadcrumb
    },
    data() {
        return {
            post: {}, //文章详情数据
            createdTime: "", //存放转换格式后的文章创建时间
            comments: [], //评论数据
            comments_len: 0, //总评论条数
            pageIndex: 1, // 分页数据：当前页索引
            pageSize: 2, // 分页数据：每页数据条数
            content: "", // 评论文本框输入文本内容
            dialogImageUrl: "",
            dialogVisible: false, //文件上传需要的变量
            pics: [], //收集评论上传的图片的数组
            reply: {
                account: {}
            }, //回复的评论的数据
            isReply: false, //控制回复用户tag标签的显示
            router: {
                meta: {
                    title: "攻略详情"
                },
                path: "/post/detail",
                parent: {
                    meta: {
                        title: "旅游攻略"
                    },
                    path: "/post",
                    parent: {
                        exist: false,
                        meta: {
                            title: ""
                        },
                        path: "/"
                    }
                }
            } //面包屑数据
        };
    },
    methods: {
        // 获取文章详情数据
        async getPostData() {
            const { id } = this.$route.query;
            const res = await this.$axios({
                url: "/posts/" + id
            });
            this.post = res.data;
            // 后台传过来时间格式不对，需要使用format进行一次转换
            this.createdTime = moment(res.data.created_at).format(
                "YYYY-MM-DD hh:mm"
            );
        },
        // 分页方法
        handleSizeChange(val) {
            this.pageSize = val;
            this.getCommentsData();
        },
        handleCurrentChange(val) {
            this.pageIndex = val;
            this.getCommentsData();
        },
        // 获取文章评论数据(分页)
        getCommentsData() {
            const id = this.$route.query.id;
            const start = (this.pageIndex - 1) * this.pageSize;
            this.$axios({
                url: `/posts/comments?post=${id}&_start=${start}&_limit=${this.pageSize}`
            }).then(res => {
                const { data } = res.data;
                this.comments = data;
                this.comments_len = res.data.total;
            });
        },
        // 评论图片上传组件的方法
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        // 上传图片成功执行的钩子
        handleSuccess(response, file, fileList) {
            this.pics.push(response[0]);
        },
        // 提交评论
        onSubmit() {
            // 整理提交评论的数据
            const form = {
                content: this.content,
                pics: this.pics,
                post: this.$route.query.id
            };
            // 回复的评论要多一个回复的评论的id
            if (this.isReply === true) {
                form.follow = this.reply.id;
            }
            // 发起提交评论请求
            this.$axios({
                url: "/comments",
                method: "POST",
                headers: {
                    Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
                },
                data: form
            }).then(res => {
                const data = res.data;
                if (data.status === 0) {
                    this.$message.success(data.message);
                    // 初始化评论输入框
                    this.content = "";
                    this.$refs.upload.clearFiles();
                    this.pics = [];
                    console.log(this.pics);
                    
                    this.isReply = false;
                    // 刷新评论数据
                    this.getCommentsData();
                }
            });
        },
        // 回复评论，接收子组件传递的参数
        handleReply(data) {
            this.reply = data;
            this.isReply = true;
            // 获取评论输入框焦点
            this.$refs.textarea.focus();
        },
        // 关闭回复tag标签
        handleRemoveReply() {
            // 清除回复数据
            this.reply = {
                account: {}
            };
            this.isReply = false;
        }
    },
    watch: {
        // 监听路由变化，在点击相关推荐时，只重新获取文章详情数据会导致收藏点赞等数据没有刷新，改为刷新页面
        $route() {
            // this.getPostData();
            location.reload();
        }
    },
    mounted() {
        // 获取文章详情数据
        this.getPostData();
        // 获取文章评论数据
        this.getCommentsData();
    }
};
</script>

<style scoped lang="less">
.container {
    width: 1000px;
    margin: 0 auto;
    padding-top: 20px;
}

.main {
    width: 700px;
    .post {
        h1 {
            padding: 20px 0;
            border-bottom: 1px solid #ddd;
        }
        .post_info {
            padding: 20px 0;
            color: #999;
            text-align: right;
            span {
                margin-left: 20px;
            }
        }
        .post_content {
            line-height: 1.5;
            /deep/ img {
                max-width: 100%;
            }
        }
    }
    .comments_list {
        border: 1px solid #ddd;
        .comments_item {
            border-bottom: 1px dashed #ddd;
            &:last-child {
                border-bottom: none;
            }
        }
    }
    /deep/.setpage {
        margin: 10px auto 20px;
    }

    .comments_input {
        h4 {
            font-size: 18px;
            font-weight: 400;
            margin-bottom: 20px;
        }

        .el-tag {
            margin-bottom: 10px;
        }
        /deep/ textarea {
            padding: 5px 15px;
            margin-bottom: 10px;
        }

        /deep/ .el-upload {
            width: 100px;
            height: 100px;
            line-height: 100px;
            margin-bottom: 30px;
        }

        /deep/ .el-upload-list__item {
            width: 100px;
            height: 100px;
        }

        .el-button {
            height: 28px;
            line-height: 0px;
            padding: 7px 15px;
            font-size: 12px;
        }
    }
}

.aside {
    width: 280px;
}
</style>