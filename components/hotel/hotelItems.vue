<template>
  <div class="hotel_item">
    <!-- 左侧酒店图片 -->
    <span class="item_img">
      <img :src="`${item.photos}`" @click="handleRouter" />
    </span>

    <!-- 中间酒店介绍部分 -->
    <div class="item_content" @click="handleRouter">
      <h3>{{item.name}}</h3>
      <!-- 第二行文字 -->
      <div class="item_types">
        <em>{{item.alias}}</em>
        <!-- 循环遍历出酒店皇冠等级 -->
        <span v-if="item.hotellevel !== null">
          <i class="iconfont iconhuangguan icon_color" v-for="index of item.hotellevel.level" :key="index"></i>
        </span>

        <span>{{item.hoteltype.name}}</span>
      </div>

      <div class="hotel_grade">
        <!-- 评分 -->
        <el-rate
          v-model="item.stars"
          disabled
          show-score
          text-color="#ff9900"
          score-template="{value}"
        ></el-rate>

        <span class="comment">{{item.all_remarks}}</span> 条评价
        <i>97</i>篇游记
      </div>
      <!-- 定位地址 -->
      <div class="item_location">
        <i class="el-icon-location"></i>
        位于：
        <span>{{item.address}}</span>
      </div>
    </div>

    <!-- 右侧网站订购部分 -->
    <div>
      <div
        class="hotel_products"
        v-for="(item,index) in item.products"
        :key="index"
        @click="handleToHotel"
      >
        <span>{{item.name}}</span>
        <div>
          <span>￥{{item.price}}</span>
          <em>
            起
            <i class="el-icon-arrow-right"></i>
          </em>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: {},
      hotellevel:{
        level:0,
      }
    }
  },

  methods: {
    // 跳转到详情页面
    handleRouter() {
      console.log(this.item);
      
      // item.city.id能够取到城市id    item.id获取到酒店的id
      this.$router.push({
        path: "/hotel/hotelDetail",
        query: {
          city: this.item.city.id,
          id: this.item.id
        }
      });
    },
    handleToHotel() {
      // 直接跳转到外链，跳转外链不能用router.push
      window.location.href = "https://hotels.ctrip.com/hotel/694679.html";
    }
  }
};
</script>

<style lang="less" scoped>
.hotel_item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 25px 0;
  border-bottom: 1px solid #eee;

  .item_img {
    img {
      width: 320px;
      height: 210px;
    }
  }
}

.item_content {
  flex: 1;
  margin-left: 20px;
  margin-right: 20px;

  .item_types {
    color: #999;

    .icon_color {
      color: rgb(255, 166, 32);
    }
  }
  h3 {
    font-weight: 400;
    font-size: 24px;
  }
  .hotel_grade {
    display: flex;
    margin: 10px 0;
    align-items: center;
    span {
      margin: 0 5px 0 20px;
    }

    i {
      margin: 0 5px 0 45px;
    }
  }
}

.item_location {
  font-size: 14px;
  color: #666;
  i {
    font-size: 18px;
  }
}

.hotel_products {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 200px;
  padding: 12px 5px;
  border-bottom: 1px solid #ebeef5;
  color: #606266;
  font-size: 14px;

  &:hover {
    background-color: #fafafa;
    cursor: pointer;
  }
  div {
    span {
      color: rgb(255, 166, 32);
    }
  }
}

// 分页组件样式
.block {
  padding: 10px 20px;
  text-align: right;
}
</style>