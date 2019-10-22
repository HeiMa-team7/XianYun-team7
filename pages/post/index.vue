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
        <div class="right-content">
            <!-- 搜索栏 -->
            <div class="search-bar">
                <input type="text" placeholder="请输入想去的地方,比如:'广州'">
                <i class="el-icon-search"></i>
            </div>
            <!-- 推荐搜索 -->
            <div class="search-recommend">
                推荐：
                <span>广州</span>
                <span>上海</span>
                <span>北京</span>
            </div>
            <!-- 标题栏 -->
            <div class="post-title">
                <h4>推荐攻略</h4>
                <button class="btn"><i class="el-icon-edit"></i><span>写游记</span></button>
            </div>
            <!-- 卡片栏 -->
            <div class="post-item">
                <h4><a href="#">塞班贵？一定是你的打开方式不对！6000块玩转塞班</a></h4>
                <p><a href="#">大家对塞班岛总存在着这样的误解，知道它是美属地盘，就理所当然地觉得这里的花费一定很高，花费高有高的玩法，那如果只有6000块的预算呢？要怎么玩？关于旅行这件事，我们要让钱花得更有道理，收下这份攻略，带你6000块花式玩转塞班。图：塞班岛。 by第5季旅游一、怎样用6000块玩转塞班？大多数出境游客人不做预算或最终</a></p>
                <div class="card-img">
                    <a href="#"><img src="" alt=""></a>
                    <a href="#"><img src="" alt=""></a>
                    <a href="#"><img src="" alt=""></a>
                </div>
                <div class="post-info">
                    <div class="post-info-left">
                        <span class="location"><i class="el-icon-location-outline"></i>北京市</span>
                        <div class="post-user">
                            by 
                            <a href="#">
                                <img src="" alt="">
                                <span>地球发动机</span>
                            </a>
                        </div>
                        <span class="viewed">
                            <i class="el-icon-view"></i>
                            8527
                        </span>
                    </div>
                    <div class="post-info-right">54 赞</div>
                </div>
            </div>
            <div class="post-item-l">
                <div class="post-cov">
                    <a href="#">
                        <img src="" alt="">
                    </a>
                </div>
                <div class="post-content">
                    <h4><a href="#">塞班贵？一定是你的打开方式不对！6000块玩转塞班</a></h4>
                    <p><a href="#">大家对塞班岛总存在着这样的误解，知道它是美属地盘，就理所当然地觉得这里的花费一定很高，花费高有高的玩法，那如果只有6000块的预算呢？要怎么玩？关于旅行这件事，我们要让钱花得更有道理，收下这份攻略，带你6000块花式玩转塞班。图：塞班岛。 by第5季旅游一、怎样用6000块玩转塞班？大多数出境游客人不做预算或最终</a></p>
                    <div class="post-info">
                        <div class="post-info-left">
                            <span class="location"><i class="el-icon-location-outline"></i>北京市</span>
                            <div class="post-user">
                                by 
                                <a href="#">
                                    <img src="" alt="">
                                    <span>地球发动机</span>
                                </a>
                            </div>
                            <span class="viewed">
                                <i class="el-icon-view"></i>
                                8527
                            </span>
                        </div>
                        <div class="post-info-right">54 赞</div>
                    </div>
                </div>
            </div>
            <!-- 分页组件 -->
            <div class="el-pagination">
                <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage4"
                :page-sizes="[100, 200, 300, 400]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="400">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
// 引入组件
import Menu from '@/components/post/menu'
export default {
    data() {
        return {
            currentPage1: 5,
            currentPage2: 5,
            currentPage3: 5,
            currentPage4: 4,
            cities:''
        };
    },
    components:{
        Menu
    },
    methods: {
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            getCities(cities){
                this.cities = cities
                console.log(this.cities)
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
    .right-content{
        width: 700px;
        .search-bar{
            display: flex;
            border: 3px solid orange;
            height: 40px;
            width: 100%;
            box-sizing: border-box;
            align-items: center;
            input{
                border: none;
                outline: none;
                padding: 0 20px;
                flex: 1;
                background: none;
                line-height: 40px;
            }
            i{
                color: orange;
                font-size: 24px;
                font-weight: 700;
                margin-right: 10px;
            }
        }
        .search-recommend{
            font-size: 12px;
            padding: 10px 0;
            color: #666;
            span{
                margin-right: 5px;
            }
        }
        .post-title{
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid #eee;
            h4{
                font-weight: normal;
                color: orange;
                font-size: 18px;
                border-bottom: 2px solid orange;
                margin-top: 10px;
            }
            .btn{
                color: #fff;
                background-color: #409eff;
                border-color: #409eff;
                display: inline-block;
                line-height: 1;
                white-space: nowrap;
                cursor: pointer;
                border: 1px solid #dcdfe6;
                color: #fff;
                -webkit-appearance: none;
                text-align: center;
                box-sizing: border-box;
                outline: 0;
                margin: 0;
                transition: .1s;
                font-weight: 500;
                padding: 12px 20px;
                font-size: 14px;
                border-radius: 4px;
                margin-bottom: 10px;
                &:hover{
                    background: #84c0ff;
                    background-color: #84c0ff;
                }
                i{
                    margin-right: 5px;
                }
            }
        }
        .post-item{
            padding: 20px 0;
            border-bottom: 1px solid #eee;
            h4{
                font-size: 18px;
                font-weight: normal;
                margin-bottom: 15px;
                white-space: nowrap;
            }
            p{
                margin-bottom: 15px;
                line-height: 1.5;
                font-size: 14px;
                height: 63px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 3;
            }
            .card-img{
                display: flex;
                justify-content: space-between;
                box-sizing: border-box;
            }
        }
        .post-info{
            display: flex;
            justify-content: space-between;
            box-sizing: border-box;
            align-items: center;
            .post-info-left{
                font-size: 12px;
                color: #999;
                .location{
                    margin-right: 10px;
                }
                .post-user{
                    display: inline-block;
                    margin-right: 10px;
                    text-align: center;
                    img{
                        width: 16px;
                        height: 16px;
                        display: inline-block;
                        border-radius: 50%;
                        margin: 5px;
                        box-sizing: border-box;
                        vertical-align: middle;
                    }
                    span{
                        color: orange;
                    }
                }
            }
            .post-info-right{
                color: orange;
            }
        }
        .post-item-l{
            padding: 20px 0;
            width: 100%;
            border-bottom: 1px solid #eee;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            .post-cov{
                width: 220px;
                height: 150px;
                overflow: hidden;
                margin-right: 5px;
                display: inline-block;
                box-sizing: border-box;
                a{
                    img{
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }
                }
            }
            .post-content{
                width: 470px;
                display: inline-block;
                h4{
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    margin-bottom: 15px;
                    font-weight: 400;
                    font-size: 18px;
                }
                p{
                    margin-bottom: 15px;
                    line-height: 1.5;
                    font-size: 14px;
                    height: 63px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                }
            }
        }
    }
}
</style>