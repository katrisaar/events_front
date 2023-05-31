<template>
    <div @keydown.enter="login" class="container">
        <AlertDanger :message="message"/>
        <div class="row justify-content-center  mt-5">
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
                <button @click="login" class="btn btn-success" type="submit">Logi sisse</button>
            </div>
        </div>
        <div class="row mt-5" >
            <div class="col">
                Kas Sul pole veel kasutajat? Siin saad registreeruda.
            </div>
        </div>
        <div class="row mt-2">
            <div class="col">
                <button @click="initiateRegistration" class="btn btn-success" type="submit ">Registreeru</button>
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
            message:
                '',
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
                sessionStorage.setItem('userId', this.loginResponse.userId)
                sessionStorage.setItem('roleName', this.loginResponse.roleName)
                this.$emit('event-update-nav-menu')
                router.push({name: 'dashboardRoute'})
            }).catch(error => {
                this.errorResponse = error.response.data
                if (this.errorResponse.errorCode === 111) {
                    this.message = this.errorResponse.message
                } else {
                    router.push({name: 'errorRoute'})
                }
            })
        },
        initiateRegistration() {
            router.push({name: 'registerRoute'})
        },
    }
}
</script>
