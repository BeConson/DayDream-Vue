
<template>
    <div class="goods">
        <van-pull-refresh v-model="isLoading" :head-height="80" @refresh="onRefresh">
            <!-- 下拉提示，通过 scale 实现一个缩放效果 -->
            <template #pulling="props">
                <img
                        class="doge"
                        src="https://consonblog-1257792125.cos.ap-chengdu.myqcloud.com/money2.gif"
                        :style="{ transform: `scale(${props.distance / 80})` }"
                />
            </template>

            <!-- 释放提示 -->
            <template #loosing>
                <img class="doge" src="https://consonblog-1257792125.cos.ap-chengdu.myqcloud.com/money2.gif" />
            </template>

            <!-- 加载提示 -->
            <template #loading>
                <img class="doge" src="https://consonblog-1257792125.cos.ap-chengdu.myqcloud.com/money2.gif" />
            </template>

        <van-cell-group :border="false" v-for="(item,index) in data" class="goods-cell-group" :key="index+'shop'">
            <van-cell>
                <van-divider v-if="item" :style="{ color: '#1AC66D', borderColor: '#1AC66D', padding: '0 16px' }">
                    {{item.userName}} 的订单尾号：{{item.orderId | CutString}} ({{item.payStatus?'已支付':'未支付'}})
                </van-divider>
            </van-cell>
            <van-card
                    :num="item.shopQuantity"
                    :price="item.orderAmount+'.00'"
                    :desc="item.specsName"
                    :title="item.shopName"
                    :thumb="item.shopIcon"
            />
            <div class="button"><br>
                <van-button @click="showUAVInfo(index)" size="small"
                            color="linear-gradient(to right, #4bb0ff, #6149f6)">无人机信息
                </van-button>
                &emsp;
                <van-button @click="showInfo(index)" size="small" color="linear-gradient(to right, #4bb0ff, #6149f6)">
                    订单详情
                </van-button>
            </div>
        </van-cell-group>
        </van-pull-refresh>
        <br><br><br><br>
    </div>

</template>

<script>

    import {Toast} from "vant";

    export default {
        filters: {
            CutString(value) {
                value = value.substring(13,20);
                return value
            }
        },
        data() {
            return {
                count: 0,
                isLoading: false,
                data: {
                    shopName: "",
                    shopQuantity: "",
                    specsName: "",
                    orderAmount: "",
                    shopIcon: "",
                    userName: '',
                    userPhone: '',
                    userAddress: '',
                    orderId: ''
                }
            };
        },
        created() {
            const _this = this
            axios.get('http://localhost:8181/order/myOrder').then(function (response) {
                //console.log(response)
                _this.data = response.data.data
            })
        },
        methods: {
            onRefresh() {
                setTimeout(() => {
                    Toast('刷新成功');
                    this.isLoading = false;
                    this.count++;
                }, 1000);
            },
            showUAVInfo: function (index) {
                let conson = this.data[index]
                // console.log(this.data[index].orderId)
                // console.log(coco)
                let data = JSON.stringify(conson)
                this.$router.push({path: '/UAVInfo', query: {conson: data}})
            },
            payStatusTrans(status) {
                if (status == 1) return '已支付'
                if (status == 0) return '未支付'
            },
            showInfo: function (index) {
                //console.log(index)
                this.$router.push('/orderInfo?orderId=' + this.data[index].orderId)
            }
        }
    };
</script>

<style>
    .button {
        text-align: right;
        padding-right: 15px;
    }
</style>