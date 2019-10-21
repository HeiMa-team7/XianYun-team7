<template>
  <div class="map_container">
    <div class="content">
      <!-- 区域部分代码： -->
      <div class="area">
        <span>区域:</span>
        <div class="all_scenics">
          <div :class="{'scenics-text':isShow}">
            <span>全部</span>
            <a ref="link" href="#" v-for="(item,index) in cities.scenics" :key="index">{{item.name}}</a>
          </div>
          <p @click="isShow = !isShow">
            <i class="el-icon-caret-bottom" v-if="isShow"></i>
            <i class="el-icon-caret-top" v-else></i>
            等{{cities.scenics.length}}个区域
          </p>
          
        </div>
      </div>

      <!-- 攻略部分代码 -->
      <div class="strategy">
        <span>攻略:</span>
        <div
          class="introduce"
        >北京，你想要的都能在这找到。博古通今，兼容并蓄，天下一城，如是帝都。 景点以故宫为中心向四处辐射；地铁便宜通畅，而且覆盖绝大多数景点。 由于早上有天安门升旗仪式，所以大多数人选择在天安门附近住宿。</div>
      </div>

      <!-- 等级评定代码 -->
      <div class="evaluate">
        <span>攻略:</span>
        <div class="star_level">
          <!-- 均价评分 -->
          <i>均价：</i>
          <el-rate
            v-model="starLevel1"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}"
          ></el-rate>

          <!-- 设施等级评级 -->
          <i>设施:</i>
          <el-rate
            v-model="starLevel2"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}"
          ></el-rate>

          <!-- 服务等级评级 -->
          <i>服务:</i>
          <el-rate
            v-model="starLevel3"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}"
          ></el-rate>
        </div>
      </div>
    </div>

    <div class="map">
      <script
        type="text/javascript"
        src="https://webapi.amap.com/maps?v=1.4.15&key=c127bcd25b82c75da5363edad22572ed"
      ></script>
      <div id="container"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cities: {
      type: Object,
      default:{
        scenics: [],
      }
    }
  },
  data() {
    return {
      // 区域是否展开
      isShow: true,
      // a标签是否选中
      visited: false,
      // 星级
      starLevel1: 4.0,
      starLevel2: 4.3,
      starLevel3: 4.8
    };
  },
  // watch:{
  //   newScenics(){
  //     const arr = this.cities.scenics

  //     return arr
  //   }
  // },
  mounted() {
    console.log(this.cities.scenics.length);

    window.onLoad = function() {
      var map = new AMap.Map("container");
    };
    var url =
      "https://webapi.amap.com/maps?v=1.4.15&key=c127bcd25b82c75da5363edad22572ed&callback=onLoad";
    var jsapi = document.createElement("script");
    jsapi.charset = "utf-8";
    jsapi.src = url;
    document.head.appendChild(jsapi);
  },

  methods: {
    handleLink(index) {
      this.$refs.link.classList.add("visited");
    }
  }
};
</script>

<style lang="less" scoped>
.map_container {
  margin: 20px 0;
  display: flex;
  justify-content: space-between;
}

.content {
  width: 60%;
  padding-right: 6px;

  .area,
  .strategy,
  .evaluate {
    display: flex;
    justify-content: flex-start;
    color: #666;
    font-size: 14px;
    margin-bottom: 15px;
    > span {
      display: block;
      width: 12.5%;
      height: 100%;
    }

    .all_scenics,
    .introduce {
      width: 87.5%;
      line-height: 1.4;
      span {
        color: #999;
        background-color: #eee;
        padding: 0 1px;
        border-radius: 3px;
      }
      a {
        margin-right: 15px;
      }
      a:hover {
        color: #00b5ff;
        text-decoration: underline;
      }
      p {
        display: block;
        cursor: pointer;
        width: 100px;
      }
    }
  }
}

.visited {
  color: #999;
  background-color: #eee;
  padding: 0 1px;
  border-radius: 2px;
}

.scenics-text {
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

/deep/el-rate {
  width: 100px;
}
.map {
  width: 40%;
  padding-left: 6px;
}

#container {
  width: 100%;
  height: 250px;
}
</style>