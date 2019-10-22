<template>
    <el-row class="container" type="flex" justify="space-between">
        <!-- 左侧文章详情 -->
        <div class="main">
            <!-- 文章顶部面包屑位置 -->
            <div>面包屑</div>

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
            <div>评论书写</div>

            <!-- 评论展示 -->
            <div class="comments" v-if="comments_len!=0">
                <div class="comments_list">
                    <CommentsItem
                        v-for="(item,index) in comments"
                        :key="index"
                        class="comments_item"
                        :data="item"
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

// 引入转换时间格式插件
import moment from "moment";
export default {
    components: {
        DetailAside,
        DetailCtrl,
        CommentsItem
    },
    data() {
        return {
            post: {},
            createdTime: "",
            comments: [],
            comments_len: 0,
            pageIndex: 1,
            pageSize: 2
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
        handleSizeChange(val) {
            this.pageSize = val;
            this.getCommentsData()
        },
        handleCurrentChange(val) {
            this.pageIndex = val;
            this.getCommentsData();
        },
        getCommentsData() {
            const id = this.$route.query.id;
            const start = (this.pageIndex-1)*this.pageSize
            this.$axios({
                url: `/posts/comments?post=${id}&_start=${start}&_limit=${this.pageSize}`,
            }).then(res => {
                console.log(res.data);
                const { data } = res.data;
                this.comments = data;
            });
        }
    },
    watch: {
        // 监听路由变化，在点击相关推荐时，重新获取文章详情数据，页面跳转才能获得新的数据
        $route() {
            this.getPostData();
        }
    },
    mounted() {
        this.getPostData();
        // 发送请求获得评论数据长度
        this.$axios({
            url: `/posts/comments?post=${this.$route.query.id}`
        }).then(res => {
            this.comments_len = res.data.total;
        });
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
    /deep/.setpage{
        margin: 10px auto 20px;
    }
}

.aside {
    width: 280px;
}
</style>