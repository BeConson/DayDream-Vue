<template>
    <div class="home">
        <div class="main" v-title data-title="DayDream"></div>
        <van-tabs @click="categoriesEvent" animated>
            <van-tab v-for="index in categories.length" :title="categories[index-1].name" :key="'categories'+index">
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
                    <van-card v-if="item" v-for="(item,index) in shop" :key="'shop'+index"
                              :num="item.num"
                              :price="item.price"
                              :desc="item.desc"
                              :title="item.title"
                              :thumb="item.thumb"
                    >
                        <template #tags>
                            <van-button v-if="item" v-for="item in item.tag" :key="'tag'+index" type="primary" size="mini">
                                {{item.name}}
                            </van-button>
                        </template>


                        <template #footer>
                            <div >
                                <van-button @click="buy(index)" size="small" round color="linear-gradient(to right, #4bb0ff, #6149f6)">购买
                                </van-button>
                            </div>
                        </template>

                    </van-card>
                </van-pull-refresh>
            </van-tab>
        </van-tabs>

        <br><br><br><br>

        <van-sku v-if="sku&&goods"
                v-model="show"
                :sku="sku"
                :goods="goods"
                :quota="2"
                 hide-quota-text
                 :reset-stepper-on-hide="true"
                 safe-area-inset-bottom
                :hide-stock="sku.hide_stock"
                @buy-clicked="onBuyClicked"
        >
            <template #sku-actions="props">
                <div class="van-sku-action skuDiv" >
                    <van-button round size="large" color="linear-gradient(to top, #4bb0ff, #6149f6)" type="info"
                                @click="props.skuEventBus.$emit('sku:buy')">购买
                    </van-button>
                </div>
            </template>
        </van-sku>

    </div>
</template>

<script>

    import { Toast } from 'vant';

    export default {
        name: 'Home',
        components: {

        },
        data() {
            return {
                show: true,
                // currentPage: 1,
                categories: '',
                shop: '',
                sku: '',
                goods: '',
                count: 0,
                isLoading: false,
            };
        },
        created() {
            const _this = this;
            axios.get("http://localhost:8181/shop/index").then(function (response) {
                //console.log(response)
                _this.shop = response.data.data.shop
                _this.categories = response.data.data.categories
            })
        },
        methods: {
            categoriesEvent(index) {
                //alert(this.categories[index].type)
                const _this = this
                axios.get("http://localhost:8181/shop/findByCategoryType/"
                    +this.categories[index].type).then(function (response) {
                    _this.shop = response.data.data
                })
            },
            buy(index){
                //alert(this.shop[index].id)
                this.show = true
                const _this = this
                axios.get('http://localhost:8181/shop/findSpecsByShopId/'
                    +this.shop[index].id).then(function (response) {
                    _this.goods = response.data.data.goods
                    _this.sku = response.data.data.sku
                })
            },
            onBuyClicked(item){
                this.$store.state.specsId = item.selectedSkuComb.s1
                this.$store.state.quantity = item.selectedNum
                setTimeout(() => {
                    this.$router.push('/addressList')
                }, 1000)
            },
            onRefresh() {
                setTimeout(() => {
                    Toast('刷新成功');
                    this.isLoading = false;
                    this.count++;
                }, 1000);
            },
        },
    }
</script>

<style>
    .doge {
        width: 140px;
        height: 72px;
        margin-top: 8px;
        border-radius: 4px;
    }
    .skuDiv {
        padding-bottom: 35px;
        padding-right: 30px;
        padding-left: 30px;
    }
</style>