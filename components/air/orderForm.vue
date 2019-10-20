<template>
    <div class="main">
        <div class="air-column">
            <h2>乘机人</h2>
            <el-form class="member-info">
                <!-- 用户列表可以循环该div -->
                <div class="member-info-item" v-for="(item, index) in users" :key="index">
                    <!-- 乘机人列表，select默认值就行 -->
                    <el-form-item label="乘机人类型">
                        <el-input
                            placeholder="姓名"
                            class="input-with-select"
                            v-model="item.username"
                        >
                            <el-select slot="prepend" value="1" placeholder="请选择">
                                <el-option label="成人" value="1"></el-option>
                            </el-select>
                        </el-input>
                    </el-form-item>

                    <el-form-item label="证件类型">
                        <el-input placeholder="证件号码" class="input-with-select" v-model="item.id">
                            <el-select slot="prepend" value="1" placeholder="请选择">
                                <el-option label="身份证" value="1" :checked="true"></el-option>
                            </el-select>
                        </el-input>
                    </el-form-item>

                    <span class="delete-user" @click="handleDeleteUser(index)">-</span>
                </div>
            </el-form>

            <!-- 添加乘机人 -->
            <el-button class="add-member" type="primary" @click="handleAddUsers">添加乘机人</el-button>
        </div>

        <div class="air-column">
            <h2>保险</h2>
            <div>
                <div class="insurance-item" v-for="(item, index) in detail.insurances" :key="index">
                    <el-checkbox
                        :label="`${item.type}：￥${item.price}/份×1  最高赔付${item.compensation}`"
                        border
                        @change="handleChange(item.id)"
                    ></el-checkbox>
                </div>
            </div>
        </div>

        <div class="air-column">
            <h2>联系人</h2>
            <div class="contact">
                <el-form label-width="60px">
                    <el-form-item label="姓名">
                        <el-input v-model="contactName"></el-input>
                    </el-form-item>

                    <el-form-item label="手机">
                        <el-input placeholder="请输入内容" v-model="contactPhone">
                            <template slot="append">
                                <el-button @click="handleSendCaptcha">发送验证码</el-button>
                            </template>
                        </el-input>
                    </el-form-item>

                    <el-form-item label="验证码">
                        <el-input v-model="captcha"></el-input>
                    </el-form-item>
                </el-form>
                <el-button type="warning" class="submit" @click="handleSubmit">提交订单</el-button>
            </div>
        </div>
        <!-- 调用总价格，让computed执行 -->
        <div v-show="false">{{allPrice}}</div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            users: [{
                username: '',
                id: ''
            }],

            // 机票信息
            detail: {
                insurances: [], // 初始化保险数据
                seat_infos: {}
            },
            insurances: [],// 保险id的集合
            contactName: "",// 联系人
            contactPhone: "", // 联系电话
            captcha: "", // 验证码
            invoice: false, // 发票，写死
            
        }
    },
    mounted() {
        const {id, seat_xid} = this.$route.query
        this.$axios({
            url: '/airs/'+id,
            params: {
                seat_xid
            }
        }).then(res=>{
            // 准备传递机票信息的数据
            this.detail = res.data

            this.$emit('getTicket', res.data)
        })
    },
    computed: {
        allPrice() {

            // 如果this.detail.seat_infos还没有请求获取到数据就先不执行下面的代码
            if(!this.detail.seat_infos) return

            // 添加保险时的价格变动
            let price = 0
            if(this.insurances) {
                this.insurances.forEach((item, index)=>{
                    if(item === index+1) {
                        price += +this.detail.insurances[index].price
                    }
                })
            }
            // 获取总价相关数据进行计算
            let allPrice = this.users.length * (this.detail.seat_infos.org_settle_price + price + this.detail.airport_tax_audlet)


            // 传递过去给父组件
            this.$emit('getAllPrice',allPrice)
            return allPrice
        }
    },
    methods: {
        // 添加乘机人
        handleAddUsers(){
            this.users.push({
                username: '',
                id: ''
            })
        },
        
        // 移除乘机人
        handleDeleteUser(index){
            this.users.splice(index,1)
        },

        // 保险复选框改变的时候
        handleChange(id) {
            const index = this.insurances.indexOf(id)
            if(index > -1) {
                // 已经存在
                this.insurances.splice(index,1)
            } else {
                // 没有存在
                this.insurances.push(id)
            }
        },
        
        // 发送手机验证码
        handleSendCaptcha(){
            // 判断是否有手机号码
            if(!this.contactPhone){
                this.$message.error("手机号码不能为空");
                return;
            }

            this.$store.dispatch('user/sendCaptcha', this.contactPhone).then(res=>{
                this.$message.success(`当前的验证码：` + res.data.code)
            })
        },

        // 提交订单
        handleSubmit(){
            const data = {
                users: this.users,
                insurances: this.insurances,
                contactName: this.contactName,
                contactPhone: this.contactPhone,
                captcha: this.captcha,
                invoice: this.invoice,
                seat_xid: this.$route.query.seat_xid,
                air: this.$route.query.id,
            }
            // 提交订单接口
            this.$axios({
                url: "/airorders",
                method: "POST",
                data,
                headers: {
                    // 这是jwt标准的token
                    Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
                }
            }).then(res => {
                console.log(res)

                const {data,message} = res.data

                this.$message.success(message)

                this.$router.push({
                    path: '/air/pay',
                    query: {
                        id: data.id
                    }
                })
            })
        }
    }
}
</script>

<style scoped lang="less">
.air-column {
    border-bottom: 1px #ddd dashed;
    padding-bottom: 20px;
    margin-bottom: 20px;
}

.air-column h2 {
    margin-bottom: 20px;
    font-size: 22px;
    font-weight: normal;
}

/deep/ .el-select .el-input {
    width: 130px;
}

.input-with-select {
    width: 590px;
}

.input-with-select /deep/ .el-input-group__prepend {
    background-color: #fff;
}
.member-info /deep/ .el-form-item {
    margin-bottom: 0;
}

.member-info-item {
    border-bottom: 1px #eee dashed;
    padding-bottom: 20px;
    position: relative;

    &:first-child {
        .delete-user {
            display: none;
        }
    }
}

.add-member {
    margin-top: 20px;
}

.delete-user {
    display: block;
    background: #ddd;
    width: 16px;
    height: 16px;
    font-size: 14px;
    text-align: center;
    line-height: 16px;
    color: #fff;
    cursor: pointer;
    border-radius: 50px;
    position: absolute;
    right: -30px;
    top: 50%;
}

.insurance {
    > div {
        margin-top: 10px;
    }
}

.insurance-item {
    margin-bottom: 20px;
}

.contact {
    /deep/ .el-input {
        width: 50%;
    }
}

.submit {
    margin: 50px auto;
    display: block;
    width: 250px;
    height: 50px;
}
</style>