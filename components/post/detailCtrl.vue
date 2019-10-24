<template>
    <el-row type="flex" justify="center" class="post_ctrl">
        <div class="ctrl_item">
            <i class="iconfont iconpinglun"></i>
            <p>评论({{comment}})</p>
        </div>
        <div :class='["ctrl_item",isStar? "active": ""]' @click="handleStar">
            <i class="iconfont iconstar1"></i>
            <p>{{isStar?'已收藏':'收藏'}}</p>
        </div>
        <div class="ctrl_item">
            <i class="iconfont iconfenxiang"></i>
            <p>分享</p>
        </div>
        <div :class='["ctrl_item",isLike? "active": ""]' @click="handleLike">
            <i class="iconfont iconding"></i>
            <p>{{isLike?'已点赞':'点赞'}}({{like?like:0}})</p>
        </div>
    </el-row>
</template>

<script>
export default {
    props: ["comment"],
    data() {
        return {
            like: 0,
            isStar: false,
            isLike:false
        };
    },
    methods: {
        handleClick(option) {
            const { id } = this.$route.query;
            setTimeout(async () => {
                const res = await this.$axios({
                    url: "/posts/" + option + "?id=" + id,
                    headers: {
                        // 这是jwt标准的token
                        Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
                    }
                });
                if (option === "star") {
                    this.isStar = true;
                }
                if (option === "like") {
                    this.isLike = true;
                    this.getPostData();
                }
                if (res.data.status === 0) {
                    this.$message.success(res.data.message);
                }
            }, 200);
        },
        handleStar() {
            this.handleClick("star");
        },
        handleLike() {
            this.handleClick("like");
        },
        async getPostData() {
            const { id } = this.$route.query;
            const res = await this.$axios({
                url: "/posts/" + id
            });
            this.like = res.data.like;
            res.data.account.starPosts.forEach(v => {
                if(v === id){
                    this.isStar = true;
                }
            });
            let u_id = res.data.account.id
            res.data.likeIds.forEach(v => {
                if(v === u_id){
                    this.isLike = true;
                }
            });
        }
    },
    mounted() {
        this.getPostData();
    }
};
</script>

<style scoped lang="less">
.post_ctrl {
    padding: 50px 0 30px;
    .ctrl_item {
        margin: 0 20px;
        text-align: center;
        cursor: pointer;
        /deep/ i {
            font-size: 28px;
            color: #ffa500;
        }
        /deep/ .iconstar1 {
            line-height: 28px;
            font-size: 39.2px;
        }
        p {
            font-size: 14px;
            margin-top: 5px;
            color: #999;
        }
    }
    /deep/ .active {
        i {
            color: #e03030 !important;
        }
    }
}
</style>