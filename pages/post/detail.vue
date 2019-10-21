<template>
    <el-row class="container" type="flex" justify="space-between">
        <!-- 左侧文章详情 -->
        <div class="main">
            <!-- 文章顶部面包屑位置 -->
            <div>面包屑</div>

            <!-- 文章详情 -->
            <div>文章详情</div>

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
import DetailAside from '@/components/post/detailAside';
export default {
    components:{
        DetailAside
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
}

.aside {
    width: 280px;
}
</style>