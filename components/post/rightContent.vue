<template>
<div class="right-content">
    <!-- 搜索栏 -->
    <div class="search-bar">
        <input type="text" placeholder="请输入想去的地方,比如:'广州'" @keydown.enter="handleSearchCity">
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
    <div class="post-item"
    v-for="(item,index) in postData"
    :key="index"
    v-if="item.images.length>1"
    >
        <h4><a href="#">{{item.title}}</a></h4>
        <p v-html="`${item.content}`"></p>
        <div class="card-img">
            <a href="#"
            v-for="(item,index) in item.images"
            :key="index"
            v-if="index<3">
            <img :src="`${item}`" alt="">
            </a>
        </div>
        <div class="post-info">
            <div class="post-info-left">
                <span class="location"><i class="el-icon-location-outline"></i>{{item.cityName}}</span>
                <div class="post-user">
                    by 
                    <a href="#">
                        <img src="@/static/avatar.jpg" alt="">
                    </a>
                    <a href="#">地球发动机</a>
                </div>
                <span class="viewed">
                    <i class="el-icon-view"></i>
                    {{item.watch}}
                </span>
            </div>
            <div class="post-info-right">54 赞</div>
        </div>
    </div>
    <div class="post-item-l"
    v-for="(item,index) in postData"
    :key="index"
    v-if="item.images.length===1">
        <div class="post-cov">
            <a href="#"
            v-for="(item,index) in item.images"
            :key="index">
                <img :src="`${item}`" alt="">
            </a>
        </div>
        <div class="post-content">
            <h4><a href="#">{{item.title}}</a></h4>
            <p v-html="`${item.content}`"></p>
            <div class="post-info">
                <div class="post-info-left">
                    <span class="location"><i class="el-icon-location-outline"></i>{{item.cityName}}</span>
                    <div class="post-user">
                        by 
                        <a href="#">
                            <img src="@/static/avatar.jpg" alt="">
                        </a>
                        <a href="#">地球发动机</a>
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
            pageIndex:1,
            pageSize:1,
            post:[],
            postData:[],
            total:0
        }
    },
    props:['menuInfo'],
    methods:{
        handleSizeChange(val) {
            this.pageSize = val
            this.postData = this.post.slice(
                0,
                this.pageIndex*this.pageSize
            )
        },
        handleCurrentChange(val) {
            this.pageIndex = val
            this.postData = this.post.slice(
                (this.pageIndex-1)*this.pageSize,
                this.pageIndex*this.pageSize
            )
        },
        handleSearchCity(event){
            let value =  event.target.value 
            console.log(value);
            if(value){
                this.handleSearch(value)
            }else{
                this.handleLink()
            }
        },
        handleLink(){
            this.$axios({
                url:'/posts/recommend'
            }).then(res=>{
                this.post = res.data.data
                this.total = this.post.length
                this.postData = this.post.slice((this.pageIndex-1)*this.pageSize,this.pageSize)
            })
        },
        handleSearch(menuInfo){
            this.$axios({
                url:`/posts?_start=${(this.pageIndex-1)*this.pageSize}&_limit=${this.pageSize}&city=${menuInfo}`
            }).then(res=>{
                const {data} = res.data
                this.total = res.data.total
                this.postData = res.data.data
            })
        }
    },
    watch:{
        menuInfo(){
            this.handleSearch(this.menuInfo)
        }
    },
    mounted(){
        this.handleLink()
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