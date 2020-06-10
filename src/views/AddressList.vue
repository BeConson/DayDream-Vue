<template>
    <div>

        <van-divider :style="{ color: '#1989fa', borderColor: 'gray', padding: '0 16px' }">
            点击左边小按钮即可使用此地址下单哦
        </van-divider>

        <van-address-list
                v-model="chosenAddressId"
                :list="list"
                default-tag-text="默认"
                @add="onAdd"
                @edit="onEdit"
                @select="onselect"
        ></van-address-list>
        </div>

</template>

<script>
    import {Toast} from 'vant';
    import {Dialog} from 'vant';

    export default {

        name: "addressList",
        data() {
            return {
                chosenAddressId: '1',
                list: []
            };
        },
        created() {
            const _this = this
            axios.get('http://localhost:8181/address/list').then(function (response) {
                    _this.list = response.data.data
                    //console.log(_this.list)
                })
        },
        methods: {
            onAdd() {
                Toast('新增地址');
                this.$router.push('/addressNew')
            },
            onEdit(item) {
                let data = JSON.stringify(item);
                this.$router.push({path: '/addressEdit', query: {item: data}})
            },
            onselect(item) {
                function beforeClose(action, done) {
                    if (action === 'confirm') {
                        setTimeout(done, 1000);
                    } else {
                        done();
                    }
                }

                Dialog.confirm({
                    title: '你好呀',
                    message: '确认使用此地址下单吗？',
                    beforeClose
                }).then(() => {
                    // on confirm
                    let orderForm = {
                        name: item.name,
                        tel: item.tel,
                        address: item.address,
                        specsId: this.$store.state.specsId,
                        quantity: this.$store.state.quantity
                    }
                    //console.log(item)
                    const _this = this
                    axios.post('http://localhost:8181/order/createOrder', orderForm).then(function (response) {
                            if (response.data.code == 0) {
                                let instance = Toast('下单成功呀');
                                instance.close();
                                _this.$router.push('/orderForm?orderId=' + response.data.data.orderId)
                            }
                        })
                }).catch(() => {
                    // on cancel
                });
            }
        },
    };
</script>

<style>

</style>