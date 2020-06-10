<template>
    <div>
        <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">
            下单信息
        </van-divider>
        <van-cell-group class="goods-cell-group">
            <van-cell>
                <van-col span="14">
                    <van-icon name="manager-o" style="margin-right: 10px;"/>
                    收货人：{{data.name}}
                </van-col>
                <van-col>
                    <van-icon name="phone-o" style="margin-right: 10px;"/>
                    电话：{{data.tel}}
                </van-col>
                <van-col span="21" style="font-size: 13px">
                    <van-icon name="location-o" style="margin-right: 10px;"/>
                    收货地址：{{data.address}}
                </van-col>
            </van-cell>

        </van-cell-group>

        <van-card
                :num="data.num"
                :price="data.price"
                :desc="data.specs"
                :title="data.shopName"
                :thumb="data.icon"
        />

        <van-cell-group class="goods-cell-group">
            <van-cell class="goods-express">
                <van-col span="20">配送方式</van-col>
                <van-col>无人机</van-col>
            </van-cell>
        </van-cell-group>

        <van-cell-group class="goods-cell-group">
            <van-cell class="goods-express" style="font-weight: bold">
                <van-col span="17">商品金额</van-col>
                <van-col style="color: red">￥{{data.amount-520+'.00'}}</van-col>
            </van-cell>
        </van-cell-group>

        <van-cell-group>
            <van-cell class="goods-express" style="font-weight: bold">
                <van-col span="19">运费</van-col>
                <van-col style="color: red">￥{{data.freight+'.00'}}</van-col>
            </van-cell>
        </van-cell-group>
        <br><br>

        <van-notice-bar text="消息提示 : 正在为您生成订单哦，确认信息无误之后便可付款啦" left-icon="volume-o"/>
        <van-submit-bar
                :price="data.amount*100"
                button-text="确认付款"
                @submit="onSubmit"
        />
    </div>
</template>

<script>

    import {Dialog, Toast} from "vant";
    import Vue from 'vue';
    import {NoticeBar} from 'vant';

    Vue.use(NoticeBar);
    export default {
        components: {},
        data() {
            return {
                data: {
                    orderId: "",
                    userName: "",
                    shopName: "",
                    payStatus: 0,
                    freight: 520,
                    tel: "",
                    address: "",
                    num: 1,
                    specs: "",
                    price: "",
                    icon: "",
                    amount: 2800
                }
            };
        },
        created() {
            const _this = this
            axios.get('http://localhost:8181/order/detail/' + this.$route.query.orderId)
                .then(function (response) {
                    //console.log(response)
                    _this.data = response.data.data
                })
        },
        methods: {
            onSubmit: function () {
                function beforeClose(action, done) {
                    if (action === 'confirm') {
                        setTimeout(done, 1000);
                    } else {
                        done();
                    }
                }

                Dialog.confirm({
                    title: '你好呀',
                    message: '订单已经确认 , 点击确认就能付款哦',
                    beforeClose
                }).then(() => {
                    // on confirm
                    const _this = this
                    axios.put('http://localhost:8181/order/pay/' + this.$route.query.orderId)
                        .then(function (response) {
                            if (response.data.code == 0) {
                                let instance = Toast('订单 : ' + response.data.data.orderId + ' 支付成功啦');
                                setTimeout(() => {
                                    instance.close();
                                    _this.$router.push('/paymentSuccess?orderId=' + _this.data.orderId + "&amount=" + (_this.data.amount))
                                }, 1000)
                            }
                        })
                }).catch(() => {
                    // on cancel
                });
            }
        }
    }
</script>