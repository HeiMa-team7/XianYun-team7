<template>
  <div class="container">
    <el-row class="demo-autocomplete">
      <el-col :span="5">
        <el-autocomplete
          class="inline-input"
          v-model="form.purposeCity"
          :fetch-suggestions="querySearch"
          placeholder="目的地"
          :trigger-on-focus="false"
          @select="handleSelect"
        ></el-autocomplete>
      </el-col>

      <el-col :span="10">
        <div class="block">
          <el-date-picker
            width="450"
            v-model="scopeTime"
            type="daterange"
            range-separator="至"
            start-placeholder="入住日期"
            end-placeholder="离店日期"
          ></el-date-picker>
        </div>
      </el-col>

      <el-col :span="4" style="margin-right:8px">
        <div class="person">
          <input
            v-model="input"
            placeholder="人数未定"
            readonly="readonly"
            class="input_box"
            @click="isShow=!isShow"
          />
          <i class="el-icon-s-custom uesricon"></i>

          <div class="select_box" v-if="isShow">
            <div>
              <!-- 下拉框中的第一行 -->
              <div class="person_num">
                <span>每间</span>
                <!-- 成人选框 -->
                <el-select v-model="adultNum" placeholder="2成人" class="adult_num">
                  <el-option
                    v-for="(item,index) in [1,2,3,4,5,6]"
                    :key="index"
                    :label="`${item}成人`"
                    :value="item"
                  ></el-option>
                </el-select>

                <el-select v-model="kidNum" placeholder="0" class="kid_num">
                  <el-option
                    v-for="(item,index) in [0,1,2,3,4]"
                    :key="index"
                    :label="`${item}儿童`"
                    :value="item"
                  ></el-option>
                </el-select>
              </div>

              <!-- 确认按钮 -->
              <div style="text-align:right;margin-top:8px;">
                <el-button type="primary" class="person_btn" @click="handleAllPeople">确认</el-button>
              </div>
            </div>
          </div>
        </div>
      </el-col>

      <el-col :span="4">
        <el-button type="primary" @click="handlecheck">查看价格</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      cities: {
        scenics: []
      },
      // 选择人数
      input: "",
      form: {
        // 目的城市
        purposeCity: "南京市",
        // 入住时间
        enterTime: "",
        // 离开时间
        leftTime: "",
        // 城市id
        cityId: 0,
        // 入住人数
        person: 0
      },
      // 酒店信息
      hotels: [],
      // 时间范围
      scopeTime: [],
      // 分页参数：
      // 每页显示条数
      limit: 2,
      // 初始显示页码
      start: 0,
      // 搜索出来的所有城市数组
      searchCities: [],
      //   显示下拉框
      isShow: false,
      //   成人数
      adultNum: 2,
      kidNum: 0
    };
  },
  watch: {
    scopeTime() {
      // moment(时间戳).format('YYYY-MM-DD HH:mm:ss')
      this.form.enterTime = moment(this.scopeTime[0]).format("YYYY-MM-DD");
      this.form.leftTime = moment(this.scopeTime[1]).format("YYYY-MM-DD");
      //   console.log(start,end);
    }
  },
  mounted() {
    if (this.$route.query.city) {
      this.form.purposeCity = this.$route.query.city;
    }

    // 默认加载南京市
    this.$axios({
      url: "/cities?name=" + this.form.purposeCity
    }).then(res => {
      // data是后台返回的城市数组,没有value属性
      const { data } = res.data;
      this.cities = data[0];
      console.log(789, this.cities);

      this.$emit("handleCities", data[0]);
    });
  },

  methods: {
    querySearch(value, cb) {
      // 没有输入值，不进行获取
      if (!value) {
        this.cities = [];
        // 不显示下拉框
        cb([]);
        return;
      }

      this.$axios({
        url: "/cities?name=" + value
      }).then(res => {
        // data是后台返回的城市数组,没有value属性
        const { data } = res.data;
        // 循环给每一项添加value属性,必须要有value才能显示出来下拉表
        const newData = data.map(v => {
          v.value = v.name;
          return v;
        });
        this.searchCities = data;
        // 展示到下拉列表
        cb(data);
      });
    },

    // 当选中下拉框中的选项后触发
    // 应该发送请求，将对应的城市信息请求回来
    handleSelect(item) {
      this.cities = item;
      this.form.purposeCity = item.value;
      this.form.cityId = item.id;

      this.$emit("handleCities", item);
    },

    // 点击查看价格的时候请求，获取到城市id，入住时间，人数，请求得到符合条件的酒店信息
    handlecheck() {
      var forms = "";

      if (this.form.enterTime !== "" && this.form.leftTime !== "") {
        forms += `?enterTime=${this.form.enterTime}&leftTime=${this.form.leftTime}`;
      }

      if (this.cities.id) {
        forms += `&city=${this.cities.id}`;
      }

      if (this.form.person) {
        forms += `&person=${this.form.person}`;
      }
      this.$emit("handleHotels", forms);
      console.log(forms);

      forms = "";
    },

    // 计算人数
    handleAllPeople() {
      this.form.person = +this.adultNum + +this.kidNum;
      this.input = `${this.adultNum}成人 ${this.kidNum}儿童`;
      this.isShow = false;
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 0 auto;
}

.el-date-editor {
  width: 410px;
}

.el-button--default {
  width: 120px;
}
// 选择人数
.person {
  position: relative;

  .uesricon {
    position: absolute;
    top: 12px;
    right: 12px;
    color: #cfcfcf;
    font-size: 18px;
  }

  .select_box {
    position: absolute;
    width: 310px;
    height: 123px;
    padding: 12px;
    margin-top: 12px;
    color: #606266;
    background-color: #fff;
    z-index: 100;
    box-sizing: border-box;
    border-radius: 10px;
    left: -142px;
    box-shadow: -3px 3px 8px rgba(214, 214, 214, 0.5);
  }
}
.person_num {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 1px solid #cfcfcf;
}
.input_box {
  -webkit-appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: 14px;
  height: 40px;
  line-height: 40px;
  outline: 0;
  padding: 0 15px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;
}
.adult_num,
.kid_num {
  display: flex;
  align-items: center;
  // box-sizing: border-box;
  align-items: center;
  // padding: 0 15px;
  width: 100px;
  height: 40px;
  border: 1px solid #dcdfe6;
  border-radius: 5px;

  /deep/.el-input__inner {
    // height: 26px;
    border: none;
  }
}

.person_btn {
  height: 30px;
  padding: 0 15px;
}
</style>