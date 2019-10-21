<template>
    <div class="aside">
        <!-- 相关攻略大标题 -->
        <h4 class="aside_title">相关攻略</h4>

        <!-- 推荐链接列表 -->
        <div class="recommened_list">
            <!-- 推荐链接 -->
            <el-row type="flex" justify="space-between" class="recommened_items">
                <div class="item_cover">
                    <!-- <img src="http://157.122.54.189:9095/uploads/cd5fa4aabc4243fd9f36429f0019e97c.jpg" alt=""> -->
                </div>
                <div class="item_content">
                    <div class="item_title">测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试</div>
                    <div class="item_info"> 2019-10-21 10:09 阅读 2 </div>
                </div>
            </el-row>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style scoped lang="less">
.aside {
    .aside_title {
        font-weight: 400;
        font-size: 18px;
        padding-bottom: 10px;
        border-bottom: 1px solid #ddd;
    }

    .recommened_list{
        .recommened_items{
            padding: 20px 0;
            border-bottom: 1px solid #ddd;
            .item_cover{
                width: 100px;
                height: 80px;
                background-color: #ddd;
                overflow: hidden;
                margin-right: 10px;
            }
            .item_content{
                flex: 1;
                position: relative;
                .item_title{
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    line-height: 1.4em;
                    height: 2.8em;
                    overflow: hidden;
                }
                .item_info{
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