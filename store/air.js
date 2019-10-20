// 用户管理
export const state = () => {
    return {
        // 搜索的历史记录
        history: []
    }
}

export const mutations = {
    setHistory(state,data) {
        // 把最新的记录追加到第一个
        state.history.unshift(data)
    }
};