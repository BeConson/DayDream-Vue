<template>
    <div>
        <van-address-edit
                :area-list="areaList"
                show-delete
                @save="onSave"
                @delete="onDelete"
                :address-info="addressInfo"
                save-button-text="修改"
        />
    </div>
</template>

<script>
    import {Toast} from 'vant';
    import AreaList from '../api/area';

    export default {
        name: "AddressEdit",
        created() {
            let data = JSON.parse(this.$route.query.item)
            this.addressInfo = data
            let index = data.address.indexOf('区')
            if (index < 0) index = data.address.indexOf('县')
            this.addressInfo.addressDetail = data.address.substring(index + 1)
        },
        data() {
            return {
                areaList: AreaList,
                addressInfo: null
            };
        },
        methods: {
            onSave(item) {
                const _this = this
                //console.log(item)
                axios.put('http://localhost:8181/address/update', item)
                    .then(function (response) {
                        if (response.data.code == 0) {
                            let instance = Toast('成功修改地址');
                            setTimeout(()=> {
                            instance.close();
                            _this.$router.push('/addressList')
                            },1000)
                        }
                    })
            },
            onDelete(item) {
                //console.log(item.id)
                //history.go(-1);
                const _this = this
                axios.get('http://localhost:8181/address/delete/' + item.id)
                setTimeout(() => {
                    let instance = Toast('成功删除地址');
                    instance.close();
                    _this.$router.push('/addressList')
                }, 1000)
            },
        },
    };
</script>

<style scoped>

</style>