const paypal=require("paypal-rest-sdk");

paypal.configure({
    mode: 'sandbox',
    client_id: 'ARTXyTTfKcya9wxINu90WXajTmryW2jkJD97jnPRtRoNIoXE-Ldzik0Z7WdmHFnTIJ6b3-Snv6HSoG3e',
    client_secret: 'EOzr_vZNN8eZhc3A2Plg1Ewz2uZeh5bhvIiUdS-Ubf94rUI7wwIzz5cMrdxsq5dg0x19SsWjWCLn9Ku3',
})

module.exports=paypal;