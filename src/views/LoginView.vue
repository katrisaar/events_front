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
                    <input v-model="password" type="password" class="form-control" id="password">
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
import router from "@/router";

export default {
    name: "LoginView",
    components: {AlertDanger},
    data() {
        return {
            username: '',
            password: '',
            message: '',
            loginResponse: {
                userId: 0,
                roleName: ''
            },
            errorResponse: {
                message: '',
                errorCode: 0
            }
        }
    },
    methods: {
        login() {
            this.message = ''
            if (this.username === '' || this.password === '') {
                this.message = 'Oot..oot..nii küll ei saa luurele minna. Täida ikka mõlemad väljad ära!'
            } else {
                this.sendLoginRequest()
            }
        },

        sendLoginRequest() {
            this.$http.get("/login", {
                params: {
                    username: this.username,
                    password: this.password
                }
            }).then(response => {
                this.loginResponse = response.data
            }).catch(error => {
                this.errorResponse = error.response.data
                if (this.errorResponse.errorCode === 111) {
                    this.message = this.errorResponse.message
                } else {
                    router.push({name: 'errorRoute'})
                }
            })
        },
    }
}
</script>

<style scoped>

</style>