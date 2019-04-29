<template>
    
</template>

<script>
export default {
    onLoad: function (options) {
        wx.hideLoading();
        Object.assign(this, this.$options.data());
        this.isShowTag = getCache('isShowTag')
        let inviter = "";
        var app = getApp();
        if (options.q) {
            let url = decodeURIComponent(options.q);
            options = getUrlParam(url);
            app.globalData.storeCode = options.storeCode;
            app.globalData.inviter = options.inviter;
        } else if (options.storeCode) {
            app.globalData.storeCode = options.storeCode;
            app.globalData.inviter = options.inviter;
        }
        if (!app.globalData.storeCode) {
            return;
        }
        this.storeCode = app.globalData.storeCode;
        inviter = app.globalData.inviter;
        setCache("storeCode", app.globalData.storeCode);
        setCache("inviter", app.globalData.inviter);
        let isNewIndex = getCache('isNewIndex')
        this.show();
        setCache('isShowTag', true);
        if(isNewIndex != 1){
            this.show();
            if(isNewIndex == 0) {
                setCache('isShowTag', true);
            } else if(isNewIndex == 2) {
                if(this.isFirst) {
                    setCache('isShowTag', true);
                }else {
                    setCache('isShowTag', false);
                }
                
            }
        } else {
            setCache('isShowTag', true);
        }
        wx.createSelectorQuery().select("#home").fields({
            rect: true,
            scrollOffset: true
        }, res => {
            // this.scrollHeight = res.top;
        }).exec();
    },
    onShow() {
        let isNewIndex = getCache('isNewIndex')
        if(isNewIndex == 1){
            if (this.isFirst) {
                this.show();
                setCache('isShowTag', true);
                // this.isFirst = false;
            } else {
                this.show();
                setCache('isShowTag', false);
            }
        } else if(isNewIndex == 0) {
            setCache('isShowTag', true);
        }
    },
}
</script>
    
<style>

</style>
