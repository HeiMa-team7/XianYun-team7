<template>
    <div class="aside">
        <!-- 相关攻略大标题 -->
        <h4 class="aside_title">相关攻略</h4>

        <!-- 推荐链接列表 -->
        <div class="recommened_list">
            <!-- 推荐链接 -->
            <el-row
                type="flex"
                justify="space-between"
                class="recommened_items"
                v-for="(item,index) in dataList"
                :key="index"
            >
                <div class="item_cover">
                    <img :src="`${item.images[0]}`" alt="">
                </div>
                <div class="item_content">
                    <div class="item_title">{{item.title}}</div>
                    <div class="item_info">{{createTime[index]}} 阅读 {{item.watch}}</div>
                </div>
            </el-row>
        </div>
    </div>
</template>

<script>
import moment from 'moment';
export default {
    data() {
        return {
            dataList: [],
            createTime:[]
        };
    },
    mounted() {
        const { id } = this.$route.query;
        this.$axios({
            url: "/posts/recommend",
            data: {
                id
            }
        }).then(res => {
            console.log(res);
            const { data } = res.data;
            this.dataList = data;
            data.forEach(v => {
                let temp = moment(v.created_at).format('YYYY-MM-DD hh:mm');
                this.createTime.push(temp)
            });            
        });
    }
};
</script>

<style scoped lang="less">
.aside {
    .aside_title {
        font-weight: 400;
        font-size: 18px;
        padding-bottom: 10px;
        border-bottom: 1px solid #ddd;
    }

    .recommened_list {
        .recommened_items {
            padding: 20px 0;
            border-bottom: 1px solid #ddd;
            .item_cover {
                width: 100px;
                height: 80px;
                background-color: #ddd;
                overflow: hidden;
                margin-right: 10px;
                img{
                    width: 100px;
                    height: 80px;
                    object-fit: cover;
                }
            }
            .item_content {
                flex: 1;
                position: relative;
                .item_title {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    line-height: 1.4em;
                    height: 2.8em;
                    overflow: hidden;
                }
                .item_info {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    color: #999;
                    font-size: 12px;
                }
            }
        }
    }
}
</style>