<template>
    <div class="container">
        <AlertDanger :message="message"/>
        <div class="row justify-content-center">
            <div class="col col-3">
                <div class="input-group mb-3">
                    <span class="input-group-text">Kasutajanimi</span>
                    <input v-model="username" type="text" class="form-control" id="username">
                </div>
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="col col-3">
                <div class="input-group mb-3">
                    <span class="input-group-text" id="inputGroup-sizing-default">Parool</span>
                    <input v-model="password" type="text" class="form-control" id="password">
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <button @click="login" class="btn btn-primary" type="submit">Logi sisse</button>
            </div>
        </div>
    </div>
</template>

<script>
import AlertDanger from "@/components/alert/AlertDanger.vue";

export default {
    name: "LoginView",
    components: {AlertDanger},
    data() {
        return {
            username: '',
            password: '',
            message: ''
        }
    },
    methods: {
        login() {
            this.message = ''
            if (this.username === '' || this.password === '') {
                this.message = 'Oot..oot..nii küll ei saa luurele minna. Täida ikka mõlemad väljad ära!'
            }
        },
    }
}
</script>

<style scoped>

</style>