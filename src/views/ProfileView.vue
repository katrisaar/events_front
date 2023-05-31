<template>
    <DeleteMyProfileModal ref="deleteMyProfileModalRef" @event-update-nav-menu="updateNavMenu"/>
    <div class="container col-6">
        <div class="row justify-content-center mt-5">
            <div class="col col-6">
                <h4>Eesnimi: {{ user.firstName }}</h4>
                <h4>Perekonnanimi: {{ user.lastName }}</h4>
                <h4>Meiliaadress: {{ user.email }}</h4>
                <h4>Kasutajanimi: {{ user.username }}</h4>
            </div>
            <div class="col col-3">
                <ProfileImage :picture-data-base64="user.imageData"/>
            </div>
        </div>
        <div class="row justify-content-center  mt-5">
            <div class="col ">
                <button @click="navigateToEditProfile()" class="btn btn-success" type="submit">Muuda andmeid</button>
            </div>
            <div class="col">
                <button @click="deleteMyProfile()" type="button" class="btn btn-danger">Kustuta konto </button>
            </div>
        </div>
    </div>
</template>

<script>
import Modal from "@/components/modal/Modal.vue";
import DeleteProfileModal from "@/components/modal/DeleteProfileModal.vue";
import router from "@/router";
import ProfileImage from "@/components/image/ProfileImage.vue";
import DeleteMyProfileModal from "@/components/modal/DeleteMyProfileModal.vue";

export default {
    name: "ProfileView",
    components: {DeleteMyProfileModal, ProfileImage, DeleteProfileModal, Modal},
    data() {
        return {
            userId: sessionStorage.getItem('userId'),
            user: {
                username: '',
                firstName: '',
                lastName: '',
                email: '',
                imageData: ''
            },
        }
    },
    methods: {
        updateNavMenu() {
            this.$emit('event-update-nav-menu')
        },
        getUserInfo() {
            this.$http.get("/profile", {
                    params: {
                        userId: this.userId
                    }
                }
            ).then(response => {
                this.user = response.data
            }).catch(error => {
                router.push({name: 'errorRoute'})
            })
        },
        navigateToEditProfile(userId) {
            router.push({name: 'editProfileRoute', query: {userId: this.userId}})
        },
        deleteMyProfile() {
            this.$refs.deleteMyProfileModalRef.$refs.modalRef.openModal()
        },
    },
    beforeMount() {
        this.userId = sessionStorage.getItem('userId')
        this.getUserInfo()
    }
}
</script>
