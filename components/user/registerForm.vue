<template>
    <el-form :model="form" ref="form" :rules="rules" class="form">
        <el-form-item class="form-item" prop="username">
            <el-input placeholder="用户名手机" v-model="form.username"></el-input>
        </el-form-item>

        <el-form-item class="form-item" prop="captcha">
            <el-input placeholder="验证码" v-model="form.captcha">
                <template slot="append">
                    <el-button @click="handleSendCaptcha">发送验证码</el-button>
                </template>
            </el-input>
        </el-form-item>

        <el-form-item class="form-item" prop="nickname">
            <el-input placeholder="你的名字" v-model="form.nickname"></el-input>
        </el-form-item>

        <el-form-item class="form-item" prop="password">
            <el-input placeholder="密码" type="password" v-model="form.password"></el-input>
        </el-form-item>

        <el-form-item class="form-item" prop="checkPassword">
            <el-input placeholder="确认密码" type="password" v-model="form.checkPassword"></el-input>
        </el-form-item>

        <el-button class="submit" type="primary" @click="handleRegSubmit">注册</el-button>
    </el-form>
</template>

<script>
export default {
    data() {
        let validatePass = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请再次输入密码"));
            } else if (value !== this.form.password) {
                callback(new Error("两次输入密码不一致!"));
            } else {
                callback();
            }
        };
        return {
            // 表单数据
            form: {
                username: "",
                password: "",
                nickname: "",
                captcha: "",
                checkPassword: ""
            },
            // 表单规则
            rules: {
                checkPassword: [{ validator: validatePass, trigger: "blur" }],
                username: [
                    {
                        required: true,
                        message: "请输入用户名/手机号",
                        trigger: "blur"
                    }
                ],
                password: [
                    {
                        required: true,
                        message: "请输入账户密码",
                        trigger: "blur"
                    }
                ],
                nickname: [
                    {
                        required: true,
                        message: "请输入昵称",
                        trigger: "blur"
                    }
                ],
                captcha: [
                    {
                        required: true,
                        message: "请输入验证码",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    methods: {
        // 发送验证码
        handleSendCaptcha() {
            if (!this.form.username) {
                this.$confirm("手机号码不能为空", "提示", {
                    confirmButtonText: "确定",
                    showCancelButton: false,
                    type: "warning"
                });
                return;
            }

            if (this.form.username.length !== 11) {
                this.$confirm("手机号码不能少于11位", "提示", {
                    confirmButtonText: "确定",
                    showCancelButton: false,
                    type: "warning"
                });
                return;
            }

            // 发送手机验证码
            // dispatch方法用于调运actions的方法
            this.$store
                .dispatch("user/sendCaptcha", this.form.username)
                .then(res => {
                    if (res.status === 200) {
                        this.$confirm(`您的验证码是 ${res.data.code}`, "提示", {
                            confirmButtonText: "确定",
                            showCancelButton: false,
                            type: "success"
                        });
                    }
                });
        },

        // 注册
        handleRegSubmit() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    // 注册提交
                    const { checkPassword, ...props } = this.form;
                    this.$store.dispatch("user/register", props).then(res => {
                        if (res.status === 200) {
                            console.log(res);
                            this.$message.success("注册成功");
                            // 把注册信息存储到store
                            this.$store.commit("user/setUserInfo", res.data);

                            setTimeout(() => {
                                this.$router.replace("/");
                            });
                        }
                    });
                }
            });
        }
    }
};
</script>

<style scoped lang="less">
.form {
    padding: 25px;
}

.form-item {
    margin-bottom: 20px;
}

.form-text {
    font-size: 12px;
    color: #409eff;
    text-align: right;
    line-height: 1;
}

.submit {
    width: 100%;
    margin-top: 10px;
}
</style>