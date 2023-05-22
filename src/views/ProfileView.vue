<template>
    <div class="container">
        <div class="row">
            <div class="col ">
                <h4>Eesnimi <span class="badge bg-secondary">{{ user.firstName }}</span></h4>
                <h4>Perekonnanimi <span class="badge bg-secondary">{{ user.lastName }}</span></h4>
                <h4>Meiliaadress <span class="badge bg-secondary">{{ user.email }}</span></h4>
                <h4>Kasutajanimi <span class="badge bg-secondary">{{ user.username }}</span></h4>
            </div>
            <div class="col">
                <img class="img-thumbnail image-size"
                     src="https://www.relofirm.com/wp-content/uploads/2013/11/panama-bank-account.jpg" alt="Panga pilt"
                     width="200" height="300">
            </div>
        </div>
        <div class="row justify-content-center  mt-5">
            <div class="col ">
                <button @click="login" class="btn btn-primary" type="submit">Muuda andmeid</button>
            </div>
            <div class="col">
                <button @click="handleDeleteUserModal" type="button" class="btn btn-outline-danger">Kustuta konto
                </button>
            </div>
        </div>
    </div>
    <DeleteUserModal ref="DeleteUserModal" @event-update-nav-menu="updateNavMenu"/>
</template>

<script>
import Modal from "@/components/modal/Modal.vue";
import DeleteUserModal from "@/components/modal/DeleteUserModal.vue";
import {useRoute} from "vue-router";
import router from "@/router";

export default {
    name: "ProfileView",
    components: {DeleteUserModal, Modal},
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
            this.userId = sessionStorage.getItem('userId')
            this.roleName = sessionStorage.getItem('roleName')
        },

        handleDeleteUserModal() {
            this.$refs.DeleteUserModal.$refs.modalRef.openModal()
        },
        defineUser() {
            if (useRoute().query.userId !== null) {
                this.userId = Number(useRoute().query.userId)
            } else {
                this.userId = sessionStorage.getItem('userId')
            }

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
    },
    beforeMount() {
        this.defineUser()
        this.getUserInfo()
    }
}
</script>

<style scoped>

</style>