<template>
    <div class="floor_wrap">
        <floor v-if="data.parent" :data="data.parent" />
        <div class="floor_item">
            <div class="floor_head">
                {{data.account.nickname}}
                <i>{{comment_time}}</i>
                <span>{{data.level}}</span>
            </div>
            <div class="comments_content">{{data.content}}</div>
            <div class="reply">
                <a href="javascript:;">回复</a>
            </div>
        </div>
    </div>
</template>

<script>
// 引入转换时间格式插件
import moment from "moment";

export default {
    name: "floor",
    props: {
        data: {
            type: Object,
            default: {
                account: {}
            }
        }
    },
    data() {
        return {
            comment_time: ""
        };
    },
    mounted() {
        setTimeout(() => {
            this.comment_time = moment(this.data.updated_at).format(
                "YYYY-MM-DD hh:mm"
            );
        }, 200);
    }
};
</script>

<style scoped lang="less">
.floor_wrap {
    border: 1px solid #ddd;
    padding: 2px;
    background-color: #f9f9f9;
    .floor_item {
        padding: 5px 10px 0;

        &:hover .reply a {
            display: inline;
        }
        .floor_head {
            font-size: 12px;
            color: #666;
            margin-bottom: 10px;
            i {
                font-size: 12px;
                color: #999;
            }
            span {
                float: right;
            }
        }
        .comments_content {
            margin-top: 10px;
        }

        .reply {
            height: 20px;
            line-height: 20px;
            font-size: 12px;
            text-align: right;
            color: #1e50a2;
            a {
                display: none;
                color: inherit;
                &:hover {
                    text-decoration: underline;
                }
            }
        }
    }
}
</style>