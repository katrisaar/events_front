<template>
    <div class="container">
        <AlertDanger :message="message"/>
        <AlertSuccess :message="successMessage"/>
        <div class="row mt-5">
            <div class="col">
                <div class="input-group mb-3">
                    <span class="input-group-text">Eesnimi</span>
                    <input v-model="user.firstName" type="text" class="form-control" id="firstName">
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text">Perekonnanimi</span>
                    <input v-model="user.lastName" type="text" class="form-control" id="lastName">
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text">E-mail</span>
                    <input v-model="user.email" type="email" class="form-control" id="email">
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text">Kasutajanimi</span>
                    <input v-model="user.username" type="text" class="form-control" id="username">
                </div>
                <div>
                    <h5>Kui soovid muuta parooli</h5>
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text" id="inputGroup-sizing-default">Uus parool</span>
                    <input v-model="password" type="password" class="form-control" id="password">
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text" id="inputGroup-sizing-default">Korda uut parooli</span>
                    <input v-model="repeatPassword" type="password" class="form-control" id="repeatPassword">
                </div>

            </div>
            <div class="col col-3">
                <div><ProfileImage :picture-data-base64="user.imageData"/></div>
                <div class="mt-2"><ImageInput @event-emit-base64="setImageData" /></div>
            </div>
        </div>
        <div class="row justify-content-center mt-2">
            <div class="col col-3 align-content-lg-start">
                <button v-if="userId !== myUserId" @click="goBackToList" type="button" class="btn btn-secondary">Tagasi kasutajate nimekirja</button>
            </div>
            <div class="col col-3">
                <button v-if="userId === myUserId" @click="goBackToMyProfile" type="button" class="btn btn-secondary">Tagasi oma profiili vaatama</button>
            </div>
            <div class="col col-3">
                <button @click="editUserInfo" class="btn btn-success" type="submit">Salvesta</button>
            </div>
            <div class="col col-3"></div>
        </div>
    </div>
</template>

<script>
import router from "@/router";
import {useRoute} from "vue-router";
import ProfileImage from "@/components/image/ProfileImage.vue";
import AlertDanger from "@/components/alert/AlertDanger.vue";
import AlertSuccess from "@/components/alert/AlertSuccess.vue";
import ImageInput from "@/components/image/ImageInput.vue";

export default {
    name: "EditProfileView",
    components: {ImageInput, AlertSuccess, AlertDanger, ProfileImage},
    data() {
        return {
            myRoleName: sessionStorage.getItem('roleName'),
            myUserId: Number(sessionStorage.getItem('userId')),
            userId: Number(useRoute().query.userId),
            message: '',
            successMessage: '',
            password: '',
            repeatPassword: '',
            user: {
                username: '',
                firstName: '',
                lastName: '',
                email: '',
                imageData: '',
                password: ''
            },
            errorResponse: {
                message: '',
                errorCode: 0
            }
        }
    },
    methods: {
        getUserInfo() {
            this.$http.get("/profile", {
                params: {
                    userId: this.userId
                }
            })
                .then(response => {
                    this.user = response.data
                })
                .catch(error => {
                    router.push({name: 'errorRoute'})
                })
        },
        setImageData(pictureDataBase64) {
            this.user.imageData = pictureDataBase64
        },
        editUserInfo() {
            this.message = ''
            this.successMessage = ''
            if (this.isFieldsMissing()) {
                this.message = 'Ole hea, täida kõik väljad!'
            } else if (this.existsPasswordsMismatch()) {
                this.message = 'Sisestatud paroolid ei kattu omavahel. Proovi uuesti!';
            } else {
                this.user.password = this.password
                this.updateUser()
            }
        },
        isFieldsMissing() {
            return this.user.firstName === '' ||
                this.user.lastName === '' ||
                this.user.email === '' ||
                this.user.username === '';
        },
        existsPasswordsMismatch() {
            return this.password !== this.repeatPassword;
        },
        updateUser() {
            this.message = ''
            this.successMessage = ''
            this.$http.put("/profile", this.user, {
                    params: {
                        userId: this.userId
                    }
                }
            ).then(response => {
                this.successMessage = "Kasutaja andmed on edukalt muudetud!"
            }).catch(error => {
                this.errorResponse = error.response.data
                if (this.errorResponse.errorCode === 222) {
                    this.message = this.errorResponse.message
                } else {
                    router.push({name: 'errorRoute'})
                }
            })
        },
        goBackToList() {
            router.push({name: 'adminRoute'})
        },
        goBackToMyProfile() {
            router.push({name: 'profileRoute'})
        },
    },
    beforeMount() {
        this.getUserInfo()
    }
}
</script>
