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
            <el-slider v-model="priceScope" range :max="3000"></el-slider>
          </div>
        </li>
        <!-- 住宿等级 -->
        <li>
          <span>住宿等级</span>
          <el-select v-model="levelsVal" multiple collapse-tags clearable placeholder="不限">
            <el-option
              v-for="(item,index) in options.levels"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </li>

        <!-- 住宿类型 -->
        <li>
          <span>住宿类型</span>
          <el-select v-model="typesVal" multiple collapse-tags clearable placeholder="不限">
            <el-option
              v-for="(item,index) in options.types"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </li>

        <!-- 酒店设施 -->
        <li>
          <span>酒店设施</span>
          <el-select v-model="assetsVal" multiple collapse-tags clearable placeholder="不限">
            <el-option
              v-for="(item,index) in options.assets"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </li>

        <!-- 酒店品牌 -->
        <li>
          <span>酒店品牌</span>
          <el-select v-model="brandsVal" multiple collapse-tags clearable placeholder="不限">
            <el-option
              v-for="(item,index) in options.brands"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </li>
      </ul>
    </div>
    <div v-show="false">{{str}}</div>
    <!-- {{brandsVal}}{{assetsVal}}{{typesVal}}{{priceScope}}{{levelsVal}} -->
  </div>
</template>

<script>
export default {
  props: {
    hotels: {
      type: Array,
      default: []
    },

    cities:{
      type:Object,
      default:{}
    }
  },
  data() {
    return {
      priceScope: [0, 3000],
      // 酒店等级
      levelsVal: [],
      // 品牌
      brandsVal: [],
      // 设施
      assetsVal: [],
      // 酒店类型
      typesVal: [],

      // 酒店服务列表
      options: [],
      // params:"",
    };
  },

  computed: {
    str() {
      if(!this.cities){
        return
      }
      
      var str = `?city=${this.cities.id}&price_lt=${this.priceScope[1]}`;

      if (this.levelsVal) {
        this.levelsVal.forEach(v => {
          str += `&hotellevel_in=${v}`;
        });
      }

      if (this.brandsVal) {
        this.brandsVal.forEach(v => {
          str += `&hotelbrand_in=${v}`;
        });
      }

      if (this.typesVal) {
        this.typesVal.forEach(v => {
          str += `&hoteltype_in=${v}`;
        });
      }

      if (this.assetsVal) {
        this.assetsVal.forEach(v => {
          str += `&hotelassets_in=${v}`;
        });
      }

      this.$emit("handleParams",str)
      // console.log(str);
      return str
    }
  },

  // watch: {
  //   hotels: {
  //     deep: true,
  //     handler() {
  //       var arr = this.hotels.filter(v => {
  //         // 先判断全部都是符合条件的，再筛掉不正确的
  //         var valid = true;

  //         // 酒店等级
  //         if (this.levelsVal) {
  //           this.levelsVal.forEach(j => {
  //             if (j === v.hotellevel.level) {
  //               valid = false;
  //             }
  //           });
  //         }

  //         // 品牌
  //         if (this.brandsVal) {
  //           this.brandsVal.forEach(j => {
  //             if (j === v.hotelbrand) {
  //               valid = false;
  //             }
  //           });
  //         }

  //         // 酒店类型
  //         if (this.typesVal) {
  //           this.typesVal.forEach(j => {
  //             if (j === v.hoteltype.name) {
  //               valid = false;
  //             }
  //           });
  //         }

  //         // 酒店设施
  //         // if (this.levelsVal) {
  //         //   const arr2 = this.hotels.hotelassets.filter(s=>{
  //         //     return this.levelsVal.indexOf(s.name)>-1
  //         //   })
  //         //   if(this.levelsVal.length<arr2.length){
  //         //     valid = false;
  //         //   }
  //         // }

  //         // 判断价格
  //         // this.hotels.products.forEach(v=>{
  //         //   if(v.price< this.priceScope[0] || v.price >= this.priceScope[1]){
  //         //     valid = false;
  //         //   }
  //         // })

  //         return valid
  //       });

  //       this.$emit("setHotels", arr);
  //     }
  //   }
  // },

  mounted() {
    this.$axios({
      url: "/hotels/options"
    }).then(res => {
      console.log(res);
      const { data } = res.data;
      this.options = data;
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