<template>
    <Modal ref="modalRef" close-button-name="Loobu">
        <template #header>
            Korraldaja eemaldamine
        </template>
        <template #body>
            Kas Sa oled kindel, et soovid kasutaja {{ organiser.firstName }} {{ organiser.lastName }} eemaldada ürituse
            korraldjate seast?
        </template>
        <template #footer>
            <button @click="removeOrganiser" type="button" class="btn btn-danger">Eemalda korraldaja</button>
        </template>
    </Modal>
</template>

<script>
import Modal from "@/components/modal/Modal.vue";
import router from "@/router";

export default {
    name: "RemoveOrganiserModal",
    components: {Modal},
    data() {
        return {
            eventId: 0,
            organiser: {
                firstName: '',
                lastName: '',
                userId: 0
            }
        }
    },
    methods: {
        setOrganiser(organiser) {
            this.organiser = organiser
        },
        setEventId(eventId) {
            this.eventId = eventId
        },
        removeOrganiser: function () {
            this.$http.delete("/connection/organiser", {
                    params: {
                        eventId: this.eventId,
                        userId: this.organiser.userId
                    }
                }
            ).then(response => {
                this.$emit('event-organisers-changed')
                this.$refs.modalRef.closeModal()
            }).catch(error => {
                router.push({name: 'errorRoute'})
            })
        },
    }
}
</script>

<style scoped>

</style>
<script setup>
</script>
<script setup>
</script>