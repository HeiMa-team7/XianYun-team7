<template>
    <!-- 菜单 -->
    <div class="menu"
    @mouseleave="current=''">
        <!-- 遍历循环生成推荐城市的标题 -->
        <div class="menu-bar">
            <div class="menu-item"
            v-for="(item,index) in data"
            :key="index"
            @mouseover="handleMouseOver(index)"
            :class="{active:current===index}"
            data-index="index">
                <p>{{item.type}}</p><i class="el-icon-arrow-right"></i>
            </div>
        </div>
        <!-- 遍历生成城市名字以及描述 -->
        <div 
        class="menu-sub" 
        v-for="(item,index) in data"
        :key="index"
        v-if="current===index">
            <ul>
                <li
                v-for="(item,index) in item.children"
                :key="index">
                    <a href="javascript:;">
                        <i>{{index+1}}</i>
                        <strong
                        @click="handleClick(item.city)">{{item.city}}</strong>
                        <span
                        @click="handleClick(item.city)">{{item.desc}}</span>
                    </a>
                </li>
            </ul>
        </div>
        
    </div>
</template>

<script>
export default {
    data(){
        return {
            // 请求数据的集合
            data:[],
            // tab栏下标
            current:'',
            // 给父组件传的参数
            cities:''
        }
    },
    methods:{
        // 鼠标指向时显示的内容切换
        handleMouseOver(index){
            this.current = index;
        },
        // 点击城市时给父组件传参
        handleClick(cities){
            this.cities = cities;
            this.$emit('getCities',cities);
        }
    },
    mounted(){
        // 请求数据渲染
        this.$axios({
            url:'/posts/cities'
        }).then(res=>{
            const {data} = res.data;
            this.data = data;
        })
    }
}
</script>

<style scoped lang="less">
    .menu{
        position: relative;
        width: 260px;
        z-index: 2;
        .active{
            border-right-color:  #fff !important;
            color:orange;
            i{color: orange !important;}
        }
        .text{
            text-decoration: underline;
        }
        .menu-bar{
            position: relative;
            .menu-item{
                position: relative;
                zoom: 1;
                display: flex;
                justify-content: space-between;
                padding: 0 20px;
                box-sizing: border-box;
                border-collapse: collapse;
                height: 40px;
                line-height: 40px;
                border: 1px solid #ddd;
                p{
                    font-size: 14px;
                }
                &:nth-child(1),&:nth-child(2),&:nth-child(3){
                    border-bottom: none;
                }
                i{
                    font-size: 20px;
                    height: 40px;
                    line-height: 40px;
                    color: #ccc;
                }
            }
        }
        .menu-sub{
            position: absolute;
            z-index: -1;
            left: 259px;
            top: 0;
            width: 350px;
            padding: 10px 20px;
            box-sizing: border-box;
            background: #fff;
            border: 1px solid #ddd;
            vertical-align: middle;
            ul{
                li{
                    font-size: 14px;
                    a{
                        i{
                            color: orange;
                            font-size: 24px;
                            font-style: italic;
                        }
                        strong{
                            margin: 0 10px;
                            color: orange;
                            font-weight: 400;
                            &:hover{
                                text-decoration: underline;
                            }
                        }
                        span{
                            color: #999;
                            &:hover{
                                text-decoration: underline;
                            }
                        }
                    }
                }
            }
        }
    }
</style>