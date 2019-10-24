<template>
    <div class="box">
        <!-- 地图的容器 -->
        <el-row type="flex" justify="space-between">
        <div id="container"></div>
        <div id="panel">
        </div>
        </el-row>
    </div>
</template>

<script>
export default {
    data(){
        return {
            location: {
                longitude: "",
                latitude: ""
            },
        }
    },

    scence: [],

    methods: {

        map(){
        
            // 地图对象
            var map = new AMap.Map('container', {
            resizeEnable: true,
            zoom:15,//级别
            center: [114.116921, 22.601209]//中心点坐标latitude
            });

            var marker = new AMap.Marker({
                position:[114.116921, 22.601209]//位置
            })
            var markerList = [marker];
            map.add(markerList);//添加到地图

            // 右侧地图坐标
            AMap.service(["AMap.PlaceSearch"], function() {
                //构造地点查询类
                var placeSearch = new AMap.PlaceSearch({ 
                    pageSize: 5, // 单页显示结果条数
                    pageIndex: 1, // 页码
                    /* city: "010", */ // 兴趣点城市
                    citylimit: true,  //是否强制限制在设置的城市内搜索
                    map: map, // 展现结果的地图实例
                    panel: "panel", // 结果列表将在此容器中进行展示。
                    autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
                });
                //关键字查询
                placeSearch.search('高淳县淳溪镇');
                
            });
        }
    },

    mounted(){

        setTimeout(() => {
            this.$axios({
                url: "/hotels?city=" + 87
            }).then(res => {
                this.location = res.data.data[0].location;
                console.log( this.location);
            })
        }, 20);

        // 整个页面加载完毕之后执行
        window.onLoad  = () => {
            this.map();
        }

        // 地图的连接
        var url = 'https://webapi.amap.com/maps?v=1.4.15&key=f4b1c38e577a1f794adeeb08c7db7037&callback=onLoad';
        var jsapi = document.createElement('script');
        jsapi.charset = 'utf-8';
        jsapi.src = url;
        document.head.appendChild(jsapi);
    }
}
</script>

<style scoped>
.box{
    width: 1000px;
    display: flex;
    justify-content:space-between;
    margin-bottom: 60px;
}
#container {
    width: 650px; 
    height: 360px;
}  
#panel {
    overflow-y: auto;
    width: 350px;
    height: 360px;
    padding-left: 20px; 
    background-color: white;
    box-sizing: border-box;
    border: 1px solid #eee;
}
#panel .amap-call {
    background-color: #009cf9;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
}
#panel .amap-lib-driving {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    overflow: hidden;
}
</style>