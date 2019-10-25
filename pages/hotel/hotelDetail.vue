<template>
    <section class="container">
        <div class="main">
            <!-- 面包屑 -->
            <div class="breadcrumb">
                <div class="el-breadcrumb">
                    <el-row type="flex" justify="space-between" class="main">
                        <el-breadcrumb separator-class="el-icon-arrow-right">
                            <el-breadcrumb-item :to="{ path: '/hotel' }">酒店</el-breadcrumb-item>
                            <el-breadcrumb-item :to="{ path: '/hotel' }">{{hotels.real_city}}酒店</el-breadcrumb-item>
                            <el-breadcrumb-item>{{hotels.breadcrumb}}</el-breadcrumb-item>
                        </el-breadcrumb>
                    </el-row>
                </div>
            </div>

            <!-- 酒店地址 -->
            <div class="name-info el-row">
                <div class="title">
                    <h4>
                        {{hotels.name}}
                        <span v-if="hotels.hotellevel !== null">
                            <i class="iconfont iconhuangguan" 
                            v-for="index of hotels.hotellevel.level" 
                            :key="index"></i>
                        </span>
                    </h4>               
                </div>
                <div class="hotel-en-name">{{hotels.alias}}</div>
                <div class="hotel_location">
                    <span>
                        <i class="iconfont iconlocation"></i>
                        {{hotels.address}}
                    </span>
                </div>
            </div>

            <!-- 预览图 -->
            <div class="pic-info info-row el-row">
                <!-- 左侧大图 -->
                <el-row :span="16" class="big_img">
                    <img :src="`http://157.122.54.189:9093/images/hotel-pics/${item}.jpeg`" 
                    alt="" 
                    width="640px">
                </el-row>

                <!-- 右侧小图 -->
                <el-row :span="8" class="small_img">
                    <img 
                    :src="`http://157.122.54.189:9093/images/hotel-pics/${item}.jpeg`"
                    alt="" 
                    width="160px"
                    v-for="(item, index) in imgs"
                    :key="index"
                    @click="handleChange(item)">
                </el-row>
            </div>

            <!-- 房价详情 -->
            <div class="hotel_price" @click="handleToHotel">
                <div class="hotel_price_menu">
                    <span>价格来源</span>
                    <span>低价房型</span>
                    <span>价格最低/每晚</span>
                </div>
                <div class="hotel_price_detail" 
                v-for="(item, index) in hotels.products"
                :key="index">
                    <span>{{item.name}}</span>
                    <span>{{item.bestType}}</span>
                    <span class="detail_price">
                        <i>{{item.price}} </i>
                        <em> 起</em><span class="el-icon-arrow-right height-light"></span>
                    </span>
                </div>
            </div>

            <!-- 谷歌地图 -->
            <GodMap/>

            <!-- 酒店信息 -->
            <div class="hotel_info">
                <el-row type="flex">
                    <el-col :span="4">基本信息</el-col>
                    <el-col :span="20">
                        <el-row type="flex">
                            <el-col class="liveTime">入住时间: 14:00之后</el-col>
                            <el-col>离店时间: 12:00之前</el-col>
                            <el-col>{{hotels.creation_time}} / {{hotels.renovat_time}}</el-col>
                            <el-col>酒店规模: {{hotels.roomCount}}间客房</el-col>
                        </el-row>
                    </el-col>
                </el-row>
                <el-row type="flex">
                    <el-col :span="4">主要设施</el-col>
                    <el-col :span="20"><span v-if="hotels.hotelassets.name">{{hotels.hotelassets.name}}</span></el-col>
                </el-row>
                <el-row type="flex">
                    <el-col :span="4">停车服务</el-col>
                    <el-col :span="20">{{hotels.parking}}</el-col>
                </el-row>
                <el-row type="flex">
                    <el-col :span="4">品牌信息</el-col>
                    <el-col :span="20" v-if="hotels.hotelbrand">{{hotels.hotelbrand.name}}</el-col>
                </el-row>
            </div>

            <!-- 用户评论 -->
            <Comments/>
        </div>
    </section>
</template>

<script>
import GodMap from "@/components/hotel/godMap"
import Comments from "@/components/hotel/comments"

export default {

    components: {
        GodMap,
        Comments
    },

    // watch:{
    //     "$route":"getData"
    // },

    data(){
        return {
            item: 1,

            imgs: [ 1,2,3,4,5,6 ],

            hotels:{
                real_city: "",
                pics: "",
                hotelbrand: {},
                hotelassets: "",
                products: [],
                hotellevel: {
                    level:0
                }
            },

            cityName:"",
        }
    },

    watch:{
        $route(){
            location.reload()
        }
    },

    mounted(){
        
        setTimeout(() => {
            const {city,id} = this.$route.query;
            this.$axios({
                url: `/hotels?city=${city}&id=${id}`
            }).then(res=>{
            console.log(res);
            this.hotels = res.data.data[0]
            const {real_city} = res.data.data[0];
            this.cityName=real_city
                console.log(this.cityName);
            })
        }, 20);
    },

    methods: {
        // // 获取到路由变化
        // getData(){
        //     const {city,id} = this.$route.query;
        //     this.$axios({
        //         url: `/hotels?city=${city}&id=${id}`
        //     }).then(res=>{
        //     this.hotels = res.data.data[0]
        //     const {real_city} = res.data.data[0];
        //     this.cityName=real_city
                
        //     })
        //     location.reload()
        // },
        handleChange(item){
            this.item = item
        },

        handleToHotel(){
        // 直接跳转到外链，跳转外链不能用router.push
        window.location.href = "https://hotels.ctrip.com/hotel/694679.html";
        }
    },
}
</script>

<style scoped lang="less">
    .container{
        width: 1000px;
        margin: 0 auto;
        font-size: 16px;

        .breadcrumb{
            overflow: hidden;
            padding: 20px 0;
        }
        
        .name-info{
            margin-bottom: 35px;

            h4{
                font-weight: normal;
                font-size: 24px;
                color: #333;

                i{
                    font-size: 16px;
                    color: #f90;
                }
            }

            .hotel-en-name,.hotel_location{
                font-size: 14px;
                color: #666;

                i{
                    font-size: 16px;
                }
            }

        }

        .pic-info{
            display: flex;
            margin-bottom: 40px;

            .big_img{
                img{
                    margin-right: 10px;
                    height: 350px;
                }
            }
            .small_img{
                img{
                    margin-left: 12px;
                    margin-bottom: 10px;
                }
            }
        }

        .hotel_price{
            margin-bottom: 45px;
            .hotel_price_menu,.hotel_price_detail{
                display: flex;
                justify-content: space-between;
                border-bottom: 1px solid rgb(231, 231, 231);
                padding: 12px;
                color: #999;
                span {
                    width:419px;
                }
                span:last-child {
                    width:160px;
                }

                .detail_price {
                    display: flex;
                    align-items: center;
                }

                i ,.height-light{
                    color: #ff9900;
                    padding: 0 7px;
                }
            }

            .hotel_price_menu>span {
                font-weight: 600;
            }

            .hotel_price_detail:hover {
                background-color: #f5f7fa;
                cursor: pointer;
            }
        }

        .hotel_info{
            margin-bottom: 50px;
            font-size: 14PX;
            color: #666;

            /deep/ .el-row{
                padding: 20px 10px;
                border-bottom: 1px solid #eee;

                .el-col:first-child{
                    color: #000;
                }
                .el-col{
                    span{
                        width: 46px;
                        height: 28px;
                        display: block;
                        padding: 4px 10px;
                        background-color: #eee;
                        box-sizing: border-box;
                        border-radius: 4px;
                    }
                }
            }

            /deep/ .el-row{
                .el-row{
                    padding: 0;
                    border-bottom: none;
                    
                    .el-col:first-child{
                    color: #666;
                    }
                    .el-col{
                        padding: 0 5px;
                    }
                }
            }
        }
    }
</style>