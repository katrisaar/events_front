<template>
    <Modal ref="modalRef" close-button-name="Ei taha">
        <template #header>
            Ürituse kustutamine.
        </template>
        <template #body>
            <p>Oled Sa kindel, et soovid antud ürituse kustutada?</p>
        </template>
        <template #footer>
            <button @click="deleteEvent" type="button" class="btn btn-danger">Jah, soovin ürituse kustutada</button>
        </template>
    </Modal>
</template>

<script>
import Modal from "@/components/modal/Modal.vue";
import router from "@/router";

export default {
    name: "DeleteEventModal",
    components: {Modal},
    props: {
        eventId: 0
    },
    methods: {
        deleteEvent() {
            this.$http.delete("/event", {
                    params: {
                        eventId: this.eventId,
                    }
                }
            ).then(response => {
                router.push({name: 'dashboardRoute'})
            }).catch(error => {
                router.push({name: 'errorRoute'})
            })
        }
    }
}
</script>

