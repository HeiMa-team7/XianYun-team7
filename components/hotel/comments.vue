<template>
    <div class="comment">
        <h4>{{comments.very_good_remarks + comments.very_bad_remarks}}条真实用户评论</h4>

        <el-row type="flex" class="rate_count">
            <el-col :span="4">
                <el-col>总评数：{{comments.visits_week}}</el-col>
                <el-col>好评数：{{comments.very_good_remarks}}</el-col>
                <el-col>差评数：{{comments.very_bad_remarks}}</el-col>
            </el-col>

            <el-col>
                <el-row type="flex">
                    <!-- 推荐 -->
                    <el-col class="rates">
                        <el-rate
                        class="stars"
                        v-model="value"
                        disabled
                        show-score
                        text-color="#f90"
                        score-template={value}分>
                        </el-rate>
                        <span class="recommand">推荐</span>
                    </el-col>

                    <!-- 环境 -->
                    <el-col class="box1">
                        <el-progress 
                        type="circle" 
                        :percentage="environment" 
                        :show-text=false 
                        color="#f90"
                        :stroke-width="2"
                        :width="70">
                        </el-progress>
                        <div class="environment">
                            <span>环境</span>
                            <span>{{comments.scores.environment}}</span>
                        </div>
                    </el-col>

                    <!-- 产品 -->
                    <el-col class="box2">
                        <el-progress 
                        type="circle" 
                        :percentage="product" 
                        :show-text=false 
                        color="#f90"
                        :stroke-width="2"
                        :width="70">
                        </el-progress>
                        <div class="product">
                            <span>产品</span>
                            <span>{{comments.scores.product}}</span>
                        </div>
                    </el-col>

                    <!-- 服务 -->
                    <el-col class="box3">
                        <el-progress 
                        type="circle" 
                        :percentage="service" 
                        :show-text=false 
                        color="#f90"
                        :stroke-width="2"
                        :width="70">
                        </el-progress>
                        <div class="serve">
                            <span>服务</span>
                            <span>{{comments.scores.service}}</span>
                        </div>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    data(){
        return{
            // 酒店详情信息
            comments: {
                // 环境 产品 服务评分
                scores: {},
                // stars: ""
            },

            // 环境
            environment: 0,
            // 产品
            product: 0,
            // 服务
            service: 0,

            // 推荐评分
            value: 0
        }
    },

    mounted(){
        const {city,id} = this.$route.query;
        setTimeout(() => {
            this.$axios({
                url: `/hotels?city=${city}&id=${id}`
            }).then(res => {
                this.comments = res.data.data[0];
                this.value = +this.comments.stars;
                this.environment = this.comments.scores.environment * 10;
                this.product = this.comments.scores.product * 10;
                this.service = this.comments.scores.service * 10;
            })
        }, 20);
    }

}
</script>

<style scoped lang="less">
    .comment{
        font-size: 16px;

        h4{
            font-size: 16px;;
        }

        .rate_count{
            padding: 20px 0;
            color: #666;

            .rates{
                position: relative;
                width: 208px;
                height: 74px;

                .stars{
                    position:absolute;
                    top: 40%;
                }

                .recommand{
                    position: absolute;
                    top:0;
                    left: 0;
                    display: block;
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                    border: 1px solid #f90;
                    color: #f90;
                    font-size: 24px;
                    text-align: center;
                    line-height: 80px;
                    transform: rotate(-30deg);
                    opacity: 0.25;
                    zoom: -1;
                }
            }
        }
        
        .box1,.box2,.box3{
            width: 70px;
            height: 70px;
            margin-right: 60px;
            position: relative;
            top: 0;
            left: 0;
        }

        .environment,.product,.serve{
            position: absolute;
            top: 25%;
            left: 25%;
            color: #f90;

            span{
                display: block;
                text-align: center;
            }
        }
    }
</style>