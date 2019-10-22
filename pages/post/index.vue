<template>
    <div class="container">
        <!-- 左边栏 -->
        <div class="left-sideBar">
            <!-- 菜单 -->
            <Menu @getCities="getCities"/>
            <!-- 推荐城市选项 -->
            <div class="recommend-city">
                <span>推荐城市</span>
                <a href="#"><img src="" alt=""></a>
            </div>
        </div>
        <!-- 右边栏 -->
        <RightContent/>
    </div>
</template>

<script>
// 引入组件
import Menu from '@/components/post/menu'
import RightContent from '@/components/post/rightContent'
export default {
    data() {
        return {
            cities:''
        };
    },
    components:{
        Menu,
        RightContent
    },
    methods: {
        getCities(cities){
            this.cities = cities
        }
    },
    }
</script>

<style scoped lang="less">
.container{
    width:1000px;
    margin:0 auto;
    padding: 20px 0;
    display: flex;
    justify-content: space-between;
    .left-sideBar{
        width: 260px;
        .recommend-city{
            span{
                display: block;
                padding: 20px 0 10px 0;
                border-bottom: 1px solid #ddd;
                margin-bottom: 10px;
            }
            a{
                img{
                    display: block;
                    width: 100%;
                    height: 175px;
                    object-fit: cover;
                }
            }
        }
    }
}
</style>