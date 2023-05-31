<template>
    <div @keydown.enter="register" class="container">
        <AlertDanger :message="message"/>
        <div class="row justify-content-center  mt-5">
            <div class="col col-3">
                <div class="input-group mb-3">
                    <span class="input-group-text">Eesnimi</span>
                    <input v-model="newUser.firstName" type="text" class="form-control" id="firstName">
                </div>
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="col col-3">
                <div class="input-group mb-3">
                    <span class="input-group-text">Perekonnanimi</span>
                    <input v-model="newUser.lastName" type="text" class="form-control" id="lastName">
                </div>
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="col col-3">
                <div class="input-group mb-3">
                    <span class="input-group-text">E-mail</span>
                    <input v-model="newUser.email" type="email" class="form-control" id="email">
                </div>
            </div>
        </div>
        <div class="row justify-content-center  mt-5">
            <div class="col col-3">
                <div class="input-group mb-3">
                    <span class="input-group-text">Kasutajanimi</span>
                    <input v-model="newUser.username" type="text" class="form-control" id="username">
                </div>
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="col col-3">
                <div class="input-group mb-3">
                    <span class="input-group-text" id="inputGroup-sizing-default">Parool</span>
                    <input v-model="newUser.password" type="password" class="form-control" id="password">
                </div>
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="col col-3">
                <div class="input-group mb-3">
                    <span class="input-group-text" id="inputGroup-sizing-default">Korda parooli</span>
                    <input v-model="repeatPassword" type="password" class="form-control" id="repeatPassword">
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <button @click="register" class="btn btn-success" type="submit">Registreeru</button>
            </div>
        </div>
    </div>
</template>

<script>
import AlertDanger from "@/components/alert/AlertDanger.vue";
import router from "@/router";

export default {
    name: "RegisterView",
    components: {AlertDanger},
    data() {
        return {
            message: '',
            repeatPassword: '',
            newUser: {
                firstName: '',
                lastName: '',
                email: '',
                username: '',
                password: ''
            },
            registerResponse: {
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
        register() {
            this.message = ''
            if (this.isFieldsMissing()) {
                this.message = 'Ole hea, täida kõik väljad!'
            } else if (this.existsPasswordsMismatch()) {
                this.message = 'Sisestatud paroolid ei kattu omavahel. Proovi uuesti!';
            } else {
                this.postNewUser()
            }
        },

        isFieldsMissing() {
            return this.newUser.firstName === '' ||
                this.newUser.lastName === '' ||
                this.newUser.email === '' ||
                this.newUser.username === '' ||
                this.newUser.password === '' ||
                this.repeatPassword === '';
        },

        existsPasswordsMismatch() {
            return this.newUser.password !== this.repeatPassword;
        },

        postNewUser() {
            this.message = ''
            this.$http.post("/profile", this.newUser
            ).then(response => {
                this.registerResponse = response.data
                sessionStorage.setItem('userId', this.registerResponse.userId)
                sessionStorage.setItem('roleName', this.registerResponse.roleName)
                this.$emit('event-update-nav-menu')
                router.push({name: 'dashboardRoute'})
            }).catch(error => {
                    this.errorResponse = error.response.data
                    if (this.errorResponse.errorCode === 222) {
                        this.message = this.errorResponse.message
                    } else {
                        router.push({name: 'errorRoute'})
                    }
                }
            )
        },
    }

}
</script>
