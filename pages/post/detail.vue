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
            <div>点赞.....</div>

            <!-- 发表评论 -->
            <div>评论书写</div>

            <!-- 评论展示 -->
            <div>评论</div>
        </div>
        <!-- 右侧相关攻略 -->
        <DetailAside />
    </el-row>
</template>

<script>
import DetailAside from "@/components/post/detailAside";
import moment from 'moment';
export default {
    components: {
        DetailAside
    },
    data() {
        return {
            post: {},
            createdTime:''
        };
    },
    mounted() {
        const { id } = this.$route.query;
        this.$axios({
            url: "/posts",
            data: {
                id
            }
        }).then(res => {
            console.log(res);
            const { data } = res.data;
            this.post = data[0];
            this.createdTime = moment(data[0].created_at).format('YYYY-MM-DD hh:mm');
        });
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
    .post{
        h1{
            padding: 20px 0;
            border-bottom: 1px solid #ddd; 
        }
        .post_info{
            padding: 20px 0;
            color: #999;
            text-align: right;
            span{
                margin-left: 20px; 
            }
        }
        .post_content{
            line-height: 1.5;
            /deep/ img{
                max-width: 100%;
            }
        }
    }
}

.aside {
    width: 280px;
}
</style>