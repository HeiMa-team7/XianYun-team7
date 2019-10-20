<template>
    <section class="contianer">
        <el-row type="flex" justify="space-between">
            <!-- 顶部过滤列表 -->
            <div class="flights-content">
                <!-- 过滤条件 -->
                <FlightsFilters :data="cacheFlightsData" @setDataList="setDataList" />

                <!-- 航班头部布局 -->
                <FlightsListHead />

                <!-- 航班信息 -->
                <div>
                    <!-- 航班列表 -->
                    <FlightsItem v-for="(item, index) in dataList" :key="index" :data="item" />
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="pageIndex"
                        :page-sizes="[5, 10, 15, 20]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total"
                        v-if="dataList.length!==0"
                    ></el-pagination>

                    <div
                        v-if="dataList.length===0 && isFinish"
                        style="text-align: center;padding: 30px 0;"
                    >该航班线路暂无数据</div>
                </div>
            </div>

            <!-- 侧边栏 -->
            <div class="aside">
                <!-- 侧边栏组件 -->
                <FlightsAside />
            </div>
        </el-row>
    </section>
</template>

<script>
import moment from "moment";
import FlightsListHead from "@/components/air/flightsListHead";
import FlightsItem from "@/components/air/flightsItem";
import FlightsFilters from "@/components/air/flightsFilters";
import FlightsAside from "@/components/air/flightsAside";
export default {
    components: {
        FlightsListHead,
        FlightsItem,
        FlightsFilters,
        FlightsAside
    },
    computed: {
        dataList() {
            const arr = this.flightsData.flights.slice(
                (this.pageIndex - 1) * this.pageSize,
                this.pageIndex * this.pageSize
            );
            return arr;
        }
    },
    data() {
        return {
            flightsData: {
                //航班总数居
                // 初始值
                flights: []
            },
            cacheFlightsData: {
                //航班总数居
                // 注意，请求权数据是异步操作，如果有嵌套数据，需要初始值
                flights: [],
                info: {},
                options: {}
            },
            // 当前页
            pageIndex: 1,
            // 每一页的条数
            pageSize: 5,
            // 总条数
            total: 0,
            // 控制是否显示有无数据
            isFinish: false,
        };
    },
    mounted() {
        this.getData()
    },
    methods: {
        getData() {
            // 请求机票列表
            this.$axios({
                url: "/airs",
                params: this.$route.query
            }).then(res => {
                console.log(res)
                this.flightsData = res.data;
                // 赋值筛选条件的缓存数据
                this.cacheFlightsData = { ...res.data };
                // 机票条数
                this.total = res.data.flights.length;

                this.isFinish = true;
            });
        },
        // 改变页数
        handleSizeChange(val) {
            this.pageSize = val;
        },
        // 改变当前页
        handleCurrentChange(val) {
            this.pageIndex = val;
        },

        // arr 是传递过来的筛选数据
        setDataList(arr) {
            // 页面初始化
            this.pageIndex = 1;
            // 初始化机票列表条数
            this.total = arr.length;
            // 赋值重新渲染列表
            this.flightsData.flights = arr;
        }
    },

    watch: {
        $route() {
            this.getData()
        }
    }
};
</script>

<style scoped lang="less">
.contianer {
    width: 1000px;
    margin: 20px auto;
}

.flights-content {
    width: 745px;
    font-size: 14px;
}

.aside {
    width: 240px;
}
</style>