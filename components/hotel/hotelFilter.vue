<template>
  <div>
    <div class="filters">
      <ul>
        <li>
          <div class="price">
            <span>价格</span>
            <span class="price_scope">{{priceScope[0]}}-{{priceScope[1]}}</span>
          </div>
          <!-- 滑块 -->
          <!-- 价格区间 -->
          <div class="block">
            <el-slider v-model="priceScope" range :max="4000"></el-slider>
          </div>
        </li>
        <!-- 住宿等级 -->
        <li>
          <span>住宿等级</span>
          <el-select
            v-model="levelsVal"
            multiple
            collapse-tags
            clearable
            placeholder="不限"
          >
            <el-option
              v-for="(item,index) in hotels.levels"
              :key="index"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>
        </li>

        <!-- 住宿类型 -->
        <li>
          <span>住宿类型</span>
          <el-select
            v-model="typesVal"
            multiple
            collapse-tags
            clearable
            placeholder="不限"
          >
            <el-option
              v-for="(item,index) in hotels.types"
              :key="index"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>
        </li>

        <!-- 酒店设施 -->
        <li>
          <span>酒店设施</span>
          <el-select
            v-model="assetsVal"
            multiple
            collapse-tags
            clearable
            placeholder="不限"
          >
            <el-option
              v-for="(item,index) in hotels.assets"
              :key="index"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>
        </li>

        <!-- 酒店品牌 -->
        <li>
          <span>酒店品牌</span>
          <el-select
            v-model="brandsVal"
            multiple
            collapse-tags
            clearable
            placeholder="不限"
          >
            <el-option
              v-for="(item,index) in hotels.brands"
              :key="index"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      priceScope: [0, 4000],
      hotels: [],
      levelsVal:[],
      brandsVal:[],
      assetsVal:[],
      typesVal:[],
    };
  },

  mounted() {
    this.$axios({
      url: "/hotels/options"
    }).then(res => {
      console.log(res);
      const { data } = res.data;
      this.hotels = data;
    });
  }
};
</script>

<style lang="less" scoped>
.filters {
  width: 100%;
  padding: 6px 0;
  border: 1px solid rgb(212, 212, 212);

  ul {
    display: flex;
    li {
      font-size: 14px;
      color: #666;
      width: 187px;
      padding: 0 10px;
      border-right: 1px solid rgb(212, 212, 212);

      span {
        display: block;
        text-align: center;
        padding-bottom: 5px;
      }
    }
    li:first-child {
      box-sizing: border-box;
      padding: 0 20px;
      width: 264px;
    }
    li:last-child {
      border: none;
    }
  }
}
.price {
  display: flex;
  justify-content: space-between;
}
</style>