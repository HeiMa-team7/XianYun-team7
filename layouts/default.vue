<template>
  <div>
    <!-- 头部组件 -->
    <Header />
    <!-- 内容占位组件 -->
    <nuxt keep-alive :keepAliveProps="{include:'post'}"/>
    <!-- 页脚组件 -->
    <Footer />
  </div>
</template>
<script>
import Header from "@/components/header";
import Footer from "@/components/footer";
export default {
  components: {
    Header,
    Footer
  }
};
</script>
<style lang="less">
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

* {
  margin: 0;
  padding: 0;
}
ul,
li,
ol {
  list-style: none;
}
a {
  text-decoration: none;
  color: inherit;
}
a:hover {
}
em,
i {
  font-style: normal;
}

/*图片没有边框   去掉图片底侧的空白缝隙*/
img {
  border: 0;
  /*ie6*/
  vertical-align: middle;
}

/*让button 按钮 变成小手*/
button {
  cursor: pointer;
}

/*取消链接的下划线*/
a {
  color: #666;
  text-decoration: none;
}

/*清除浮动*/
.clearfix::after {
  visibility: hidden;
  clear: both;
  display: block;
  content: ".";
  height: 0;
}

.clearfix {
  *zoom: 1;
}

.fl {
  float: left;
}

.fr {
  float: right;
}
</style>
