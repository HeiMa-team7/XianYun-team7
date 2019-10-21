<template>
    <el-row type="flex" justify="center" class="post_ctrl">
        <div class="ctrl_item">
            <i class="iconfont iconpinglun"></i>
            <p>评论({{comment}})</p>
        </div>
        <div class="ctrl_item">
            <i class="iconfont iconstar1"></i>
            <p>收藏</p>
        </div>
        <div class="ctrl_item">
            <i class="iconfont iconfenxiang"></i>
            <p>分享</p>
        </div>
        <div class="ctrl_item">
            <i class="iconfont iconding"></i>
            <p>点赞({{like?like:0}})</p>
        </div>
    </el-row>
</template>

<script>
export default {
    props: ["comment","like"],
    data() {
        return {};
    },
    mounted() {
        // const { id } = this.$route.query;
        // setTimeout(()=>{
        //     this.$axios({
        //         url: "/posts/like?id="+id,
        //         headers: {
        //             // 这是jwt标准的token
        //             Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
        //         },
        //         // data: {
        //         //     id
        //         // }
        //     }).then(res => {
        //         console.log(res);
        //     });
        // },200)
        
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
}
</style>