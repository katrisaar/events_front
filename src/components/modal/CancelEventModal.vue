<template>
    <Modal ref="modalRef" close-button-name="Ei taha">
        <template #header>
            Ürituse tühistamine.
        </template>
        <template #body>
            <p>Oled Sa kindel, et soovid antud ürituse tühistada?</p>
            <p>Üritusel on juba registreerunud osalejaid, nende osalus tühistatakse siis samuti.</p>
        </template>
        <template #footer>
            <button @click="cancelEvent" type="button" class="btn btn-success">Jah, soovin ürituse tühistada</button>
        </template>
    </Modal>
</template>

<script>
import Modal from "@/components/modal/Modal.vue";
import router from "@/router";

export default {
    name: "CancelEventModal",
    components: {Modal},
    props: {
        eventId: 0
    },
    methods: {
        cancelEvent() {
            this.$http.delete("/event/cancel", {
                    params: {
                        eventId: this.eventId,
                    }
                }
            ).then(response => {
                router.push({name: 'dashboardRoute'})
            }).catch(error => {
                router.push({name: 'errorRoute'})
            })
        },
    }
}
</script>

