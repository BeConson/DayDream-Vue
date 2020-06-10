<template>
    <div>
        <van-address-edit
                :area-list="areaList"
                @save="onSave"
        />
    </div>
</template>

<script>
    import { Toast } from 'vant';
    import AreaList from '../api/area';

    export default {
        name: "AddressNew",
        data() {
            return {
                areaList :AreaList,
                searchResult: [],
            };
        },
        methods: {
            onSave(item) {
                const _this = this
                //console.log(item)
                axios.post('http://localhost:8181/address/create',item).then(function (response) {
                    if (response.data.code == 0){
                        let instance = Toast('成功保存地址');
                        setTimeout(()=> {
                        instance.close();
                        _this.$router.push('/addressList')
                        },1000)
                    }
                })
            },
        },
    };
</script>

<style scoped>

</style>