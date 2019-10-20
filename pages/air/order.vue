<template>
    <div class="container">
        <el-row type="flex" justify="space-between">
            <!-- 订单表单 -->
            <div class="main">
                <!-- getTicket传递选择的机票信息 -->
                <OrderForm @getTicket="getTicket" @getAllPrice="getAllPrice" />
            </div>

            <!-- 侧边栏 -->
            <div class="aside">
                <OrderAside :data="ticket" :allPrice="allPrice" />
            </div>
        </el-row>
    </div>
</template>

<script>
import OrderForm from '@/components/air/orderForm'
import OrderAside from '@/components/air/orderAside'
export default {
    components: {
        OrderForm,
        OrderAside
    },

    data() {
        return {
            // 接收从订单表单组件传递过来的数据
            ticket: {

            },

            allPrice: 0
        }
    },

    methods: {

        // 获取机票的信息数据，传递给侧边栏进行渲染
        getTicket(ticket) {
            this.ticket = ticket
        },

        // 获取总价
        getAllPrice(price) {
            this.allPrice = price
        }
    }
}
</script>

<style lang="less" scoped>
    .container{
        width:1000px;
        margin:20px auto;
    }
    
    /*aside*/
    .aside{
        width: 350px;
        height: fit-content;
        border:1px #ddd solid;
    }
</style>