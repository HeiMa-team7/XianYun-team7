<template>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: `${router.parent.parent.path}` }" v-if="router.parent.parent.exist">{{router.parent.parent.meta.title}}</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `${router.parent.path}` }">{{router.parent.meta.title}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{router.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
export default {
    props:["router_data"],
    data() {
        return {
            router: {//伪造的当前页面matched信息
                meta: {
                    title: ""
                },
                path: "/",
                parent: {//当前页面的上一级
                    meta: {
                        title: ""
                    },
                    path: "/",
                    parent: {// 当前页面的上上级，如果有，将exist改为true，不存在则保持false
                        exist:false,
                        meta: {
                            title: ""
                        },
                        path: "/"
                    }
                }
            }
        };
    },
};
</script>

<style>
</style>