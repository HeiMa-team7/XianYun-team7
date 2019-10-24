export const state = () => {
  return {
    // 草稿箱
    draft: []
  }
}

export const mutations = {
  setDraft(state, data) {
    // 把最新的记录追加到第一个
    state.draft.unshift(data)
  },
  delDraftData(state, index) {
    state.draft.splice(index, 1)
  }
};
