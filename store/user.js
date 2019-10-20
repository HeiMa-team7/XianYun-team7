// 用户管理
export const state = () => ({
    // 采用接口返回的数据结构
    userInfo: {
        token: "",
        user: {},
    },
}) 

export const mutations = {
    // 第一个参数代表用户管理的state，第二个参数是修改的数据
    setUserInfo(state, data) {
        state.userInfo = data
    },

    // 清除用户数据
    cleanUserInfo(state, info){
        // process.browser表示在浏览器环境下
        if(process.browser){
            localStorage.removeItem("userInfo");
        }
        state.userInfo = {};
    }
};

export const actions = {
    // 登录
    login({commit}, data){
        return this.$axios({
            url: "/accounts/login",
            method: "POST",
            data: data
        }).then(res => {
            const data = res.data;
            // 保存到state
            commit("setUserInfo", data);
            return data;
        })
    },
    // store是固定必须要有的参数，执行当前的store == 组件内this.$store
    // 
    sendCaptcha(store, tel) {
        const res = this.$axios({
            url: "/captchas",
            method: "POST",
            data: {
                tel
            }
        })
        return res
    },
    // 注册提交
    register(store, props) {
        const res = this.$axios({
            url: "/accounts/register",
            method: "POST",
            data: props
        })

        return res
    }
};