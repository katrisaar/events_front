<template>
    <div class="container">
        <div class="row">
            <div class="col ">
                <h4>Eesnimi <span class="badge bg-secondary">Jüri</span></h4>
                <h4>Perekonnanimi <span class="badge bg-secondary">Tamm</span></h4>
                <h4>Meiliaadress <span class="badge bg-secondary">juri.tamm@mistoimub.ee</span></h4>
                <h4>Kasutajanimi <span class="badge bg-secondary">jürka63</span></h4>
            </div>
            <div class="col">
                <img class="img-thumbnail image-size" src="https://www.relofirm.com/wp-content/uploads/2013/11/panama-bank-account.jpg" alt="Panga pilt" width="200" height="300">
            </div>
        </div>
        <div class="row justify-content-center  mt-5">
            <div class="col ">
                <button @click="login" class="btn btn-primary" type="submit">Muuda andmeid</button>
            </div>
            <div class="col">
                <button @click="handleDeleteUserModal" type="button" class="btn btn-outline-danger">Kustuta konto</button>
            </div>
        </div>
    </div>
    <DeleteUserModal ref="DeleteUserModal" @event-update-nav-menu="updateNavMenu"/>
</template>

<script>
import Modal from "@/components/modal/Modal.vue";
import DeleteUserModal from "@/components/modal/DeleteUserModal.vue";

export default {
    name: "ProfileView",
    components: {DeleteUserModal, Modal},
    data() {
        return {
            userId: 0,

        }
    },
    methods: {
        updateNavMenu() {
            this.userId = sessionStorage.getItem('userId')
            this.roleName = sessionStorage.getItem('roleName')
        },
        handleDeleteUserModal() {
            this.$refs.DeleteUserModal.$refs.modalRef.openModal()
        }
    }
}
</script>

<style scoped>

</style>