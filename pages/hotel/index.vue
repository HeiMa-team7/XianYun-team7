<template>
  <div class="container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/hotel' }">酒店</el-breadcrumb-item>
      <el-breadcrumb-item>{{cities.name}}酒店预订</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 头部搜索栏 -->
    <hotelHeader @handleCities="handleCities" @handleHotels="handleHotels" />

    <!-- 中间地图部分 -->
    <div>
      <hotelMap :cities="cities" />
    </div>

    <!-- 条件筛选部分 -->
    <div>
      <hotelFilter :hotels="hotels" @handleParams="handleParams" :cities="cities" />
    </div>

    <!-- 酒店列表部分 -->
    <div>
      <hotelItems v-for="(item,index) in newHotels" :key="index" :item="item" />
      <!-- 分页组件 -->
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageIndex"
          :page-sizes="[2, 4, 6, 8]"
          :page-size="limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="hotels.length"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import hotelMap from "@/components/hotel/hotelMap";
import hotelFilter from "@/components/hotel/hotelFilter";
import hotelItems from "@/components/hotel/hotelItems";
import hotelHeader from "@/components/hotel/hotelHeader";
export default {
  name:'hotel',
  components: {
    hotelMap,
    hotelFilter,
    hotelItems,
    hotelHeader
  },
  data() {
    return {
      cities: {
        scenics: [],
        id:0,
        name:"",
      },

      // 酒店信息
      hotels: [],
      limit: 2,
      start: 0,
      pageIndex: 1,
      // 搜索出来的所有城市数组
      searchCities: []
    };
  },

  computed: {
    newHotels() {
      const arr = this.hotels.slice(this.start, this.pageIndex * this.limit);    
      return arr;
    }
  },

  // mounted() {

  //   // 请求酒店数据
  //     this.$axios({
  //       url: `/hotels?city=74`
  //     }).then(res => {
  //       this.hotels = res.data.data;
  //     });
  // },

  methods: {
    // 请求酒店数据
    getHotels(params) {
      this.$axios({
        url: `/hotels${params}`
      }).then(res => {
        this.hotels = res.data.data;
      });
    },

    // 传回搜索出的城市数据
    handleCities(cities) {
      this.cities = cities;
    },

    // 传回输入条件后的请求参数,已经带上了城市id
    handleHotels(forms) {

      this.getHotels(forms);
    },

    // 筛选条件后返回的请求参数字符串
    handleParams(str) {

      if (!this.cities.id) {
        // this.$message("请先选择目的城市")
        return;
      }
      this.getHotels(str);
    },

    // 改变页面展示数量是触发
    handleSizeChange(val) {
      // console.log(123);
      this.limit = val;
    },

    // 改变当前页码时触发
    handleCurrentChange(val) {
      this.pageIndex = val;
      // 获取到start的值
      this.start = (val - 1) * this.limit;
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 0 auto;
}
/deep/.el-breadcrumb {
  padding: 18px 0;
  font-size: 14px;
}
/deep/.demo-autocomplete {
  display: flex;
  justify-content: flex-start;
}
</style>