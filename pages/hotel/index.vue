<template>
  <div class="container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/hotel' }">酒店</el-breadcrumb-item>
      <el-breadcrumb-item>{{cities.name}}酒店预订</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="demo-autocomplete">
      <el-col :span="5">
        <el-autocomplete
          class="inline-input"
          v-model="cityName"
          :fetch-suggestions="querySearch"
          placeholder="目的地"
          :trigger-on-focus="false"
          @select="handleSelect"
        ></el-autocomplete>
      </el-col>

      <el-col :span="10">
        <div class="block">
          <!-- v-model="value1" -->
          <el-date-picker
            width="450"
            type="daterange"
            range-separator="至"
            start-placeholder="入住日期"
            end-placeholder="离店日期"
          ></el-date-picker>
        </div>
      </el-col>

      <el-col :span="3">
        <el-popover
          placement="bottom"
          title="标题"
          width="200"
          trigger="click"
          placeholder="人数未定"
          content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
        >
          <el-button slot="reference">人数未定</el-button>
        </el-popover>
      </el-col>

      <el-col :span="4">
        <el-button type="primary">查看价格</el-button>
      </el-col>
    </el-row>

    <!-- 中间地图部分 -->
    <div>
      <hotelMap :cities="cities" />
    </div>

    <!-- 条件筛选部分 -->
    <div>
      <hotelFilter />
    </div>

    <!-- 酒店列表部分 -->
    <div>
      <hotelItems />
    </div>
  </div>
</template>

<script>
import hotelMap from "@/components/hotel/hotelMap";
import hotelFilter from "@/components/hotel/hotelFilter";
import hotelItems from "@/components/hotel/hotelItems";
export default {
  components: {
    hotelMap,
    hotelFilter,
    hotelItems
  },
  data() {
    return {
      cities: {
        scenics: [],
      },
      cityName: "南京"
    };
  },
  mounted() {
    // console.log(this.$route);
    this.$axios({
      url: "/cities?name=" + this.cityName
    }).then(res => {
      const { data } = res.data;
      this.cities = data[0];
      console.log(this.cities);
    });
  },

  methods: {
    querySearch(value, cb) {
      // 没有输入值，不进行获取
      if (!value) {
        // 不显示下拉框
        cb([]);
        return;
      }

      this.$axios({
        url: "/airs/city?name=" + value
      }).then(res => {
        // data是后台返回的城市数组,没有value属性
        const { data } = res.data;
        // 循环给每一项添加value属性
        const newData = data.map(v => {
          //   v.value = v.name.replace("市", "");
          v.value = v.name;
          return v;
        });
        this.cityData = newData;
        // 展示到下拉列表
        cb(newData);
      });
    },

    // 当选中下拉框中的选项后触发
    handleSelect() {
      console.log(123);
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

.el-date-editor {
  width: 410px;
}

.el-button--default {
  width: 120px;
}
</style>