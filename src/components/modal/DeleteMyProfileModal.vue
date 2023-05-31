<template>
 <Modal ref="modalRef" close-button-name="Ei taha">
     <template #header>
         Oma profiili kustutamine
     </template>
     <template #body>
         <p>Oled Sa kindel, et soovid oma konto ja kõik sellega seotud info kustutada?</p>
         <p>Kustutamine on lõplik ja Sa ei saa pärast seda oma kasutajaga sisse logida.</p>
     </template>
     <template #footer>
         <button @click="deleteMyProfile" type="button" class="btn btn-danger">Jah, soovin oma konto kustutada</button>
     </template>
 </Modal>
</template>

<script>
import Modal from "@/components/modal/Modal.vue";
import router from "@/router";

export default {
    name: "DeleteMyProfileModal",
    components: {Modal},
    data() {
        return {
            userId : sessionStorage.getItem('userId')
        }
    },
    methods: {
        deleteMyProfile() {
            this.$http.delete("/profile", {
                params: {
                    userId: this.userId
                }
            }).then(response => {
                sessionStorage.clear()
                this.$refs.modalRef.closeModal()
                this.$emit('event-update-nav-menu')
                router.push({name: 'homeRoute'})
            }).catch(error => {
                router.push({name: 'errorRoute'})
            })
        },
    }

}
</script>

