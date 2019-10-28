<template>
<div class="right-content">
    <!-- 搜索栏 -->
    <div class="search-bar">
        <input class="search-val" type="text" placeholder="请输入想去的地方,比如:'广州'" v-model="search" @keydown.enter="handleLink">
        <i class="el-icon-search" @click="handleLink"></i>
    </div>
    <!-- 推荐搜索 -->
    <div class="search-recommend">
        推荐：
        <span 
        v-for="(item,index) in ['广州','上海','北京']"   
        @click="handleRecommend(item)"
        :key="index">{{item}}</span>
    </div>
    <!-- 标题栏 -->
    <div class="post-title">
        <h4>推荐攻略</h4>
        <nuxt-link to="/post/create">
            <button class="btn"><i class="el-icon-edit"></i><span>写游记</span></button>
        </nuxt-link>
    </div>
    <!-- 卡片栏 -->
    <!-- 当图片的张数大于一张时 -->
    <div class="post-item"
    v-for="(item,index) in post"
    :key="index"
    v-if="item.images.length>1"
    >
        <nuxt-link :to="`/post/detail?id=${item.id}`">
            <h4><nuxt-link :to="`/post/detail?id=${item.id}`">{{item.title}}</nuxt-link></h4>
        </nuxt-link>
        <nuxt-link :to="`/post/detail?id=${item.id}`"><p v-html="`${item.summary}`"></p></nuxt-link>
        <div class="card-img">
            <!-- 循环遍历数据下的images数组 -->
            <!-- 如果图片大于三张以上,超过三张的图片不显示 -->
            <nuxt-link :to="`/post/detail?id=${item.id}`">
            <a href="javascript:;"
            v-for="(item,index) in item.images"
            :key="index"
            v-if="index<3">
                <img :src="`${item}`" alt="">
            </a>
            </nuxt-link>
        </div>
        <div class="post-info">
            <div class="post-info-left">
                <span class="location"><i class="el-icon-location-outline"></i>{{item.cityName}}</span>
                <div class="post-user">
                    by 
                    <a href="/user/personal">
                        <img src="@/static/avatar.jpg" alt="">
                    </a>
                    <a href="/user/personal">{{item.account.nickname}}</a>
                </div>
                <span class="viewed">
                    <i class="el-icon-view"></i>
                    {{item.watch}}
                </span>
            </div>
            <div class="post-info-right">54 赞</div>
        </div>
    </div>
    <!-- 当图片只有一张的时候的卡片样式 -->
    <div class="post-item-l"
    v-for="(item,index) in post"
    :key="index"
    v-if="item.images.length<=1">
        <div class="post-cov ">
            <nuxt-link :to="`/post/detail?id=${item.id}`" >
                <img :src="`${item.images[0]}`" alt="" v-if="item.images.length===1">
            </nuxt-link>
        </div>
        <div class="post-content">
            <h4><nuxt-link :to="`/post/detail?id=${item.id}`">{{item.title}}</nuxt-link></h4>
            <nuxt-link :to="`/post/detail?id=${item.id}`"><p v-html="`${item.summary}`"></p></nuxt-link>
            <div class="post-info">
                <div class="post-info-left">
                    <span class="location"><i class="el-icon-location-outline"></i>{{item.cityName}}</span>
                    <div class="post-user">
                        by 
                        <a href="/user/personal">
                            <img src="@/static/avatar.jpg" alt="">
                        </a>
                        <a href="/user/personal">{{item.account.nickname}}</a>
                    </div>
                    <span class="viewed">
                        <i class="el-icon-view"></i>
                        {{item.watch}}
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
        :current-page="pageIndex"
        :page-sizes="[1, 2, 3, 4]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
        </el-pagination>
    </div>
</div>
</template>

<script>
export default {
    data(){
        return{
            pageIndex:1,//分页参数
            pageSize:3,//每页条数
            post:[],//请求数据的总集合
            total:0,//后台文章总数
            search:'',//搜索框内容
        }
    },
    props:['menuInfo'],//从首页传过来的推荐菜单city名字
    methods:{
        // 当选择分页条数时触发
        handleSizeChange(val) {
            this.pageSize = val;
            this.pageIndex = 1;
            this.handleLink();
        },
        //当切换页数时触发
        handleCurrentChange(val) {
            this.pageIndex = val;
            this.handleLink();
        },
        // 封装的文章请求
        handleLink(){
            let url = ''
            console.log();
            // 当有搜索的city名字或推荐city名字传过来时
            if(this.search){
                url = `/posts?_start=${(this.pageIndex-1)*this.pageSize}&_limit=${this.pageSize}&city=${this.search}`;
            }else{
                url = `/posts?_start=${(this.pageIndex-1)*this.pageSize}&_limit=${this.pageSize}`;
            }
            this.$axios({
                url:url
            }).then(res=>{
                const {data} = res.data;
                this.post  = data;
                const {total} = res.data;
                this.total = total;
            })
            if(this.search === ''){
                this.$router.push('/post');
            }
        },
        // 点击搜索栏下面的推荐城市时触发
        handleRecommend(item){
            this.pageIndex = 1;
            this.search = item;//点击推荐城市赋值给搜索框
            this.handleLink();
        },
    },
    watch:{
        // 当点击推荐城市参数发生变化的时候
        menuInfo(){
            this.pageIndex = 1;
            this.search = this.menuInfo;
            this.handleLink();
        },
    },
    mounted(){
        this.search = this.$route.query.city;
        // 默认请求第一次
        this.handleLink();
    }
}
</script>

<style scoped lang='less'>
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
            cursor: pointer;
        }
    }
    .search-recommend{
        font-size: 12px;
        padding: 10px 0;
        color: #666;
        span{
            margin-right: 5px;
            &:hover{
                color: orange;
                text-decoration: underline;
                cursor: pointer;
            }
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
            box-sizing: border-box;
            img{
                width: 220px;
                height: 150px;
                display: inline-block;
                object-fit: cover;
                margin-right: 10px;
            }
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
                align-items: center;
                img{
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    margin: 5px;
                    box-sizing: border-box;
                    vertical-align: middle;
                }
                a{
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
            border: 1px solid #ddd;
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
</style>    