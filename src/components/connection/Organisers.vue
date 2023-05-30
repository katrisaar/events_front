<template>
    <div class="container">
        <RemoveOrganiserModal ref="removeOrganiserModal" @event-organisers-changed="emitEventOrganisersChanged"/>
        <div class="row">
            <div class="col">
                Korraldaja(d):
            </div>
            <div class="col">
                <div v-for="organiser in organisers" :key="organiser.userId" class="row">
                    <div class="col">
                        {{ organiser.firstName }} {{ organiser.lastName }}
                    </div>
                    <div  class="col">
                        <font-awesome-icon v-if="organiser.userId !== currentUserId" @click="openRemoveOrganiserModal(organiser)"  class="hoverable-link"
                                           :icon="['fas', 'xmark']"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import router from "@/router";
import RemoveOrganiserModal from "@/components/modal/RemoveOrganiserModal.vue";

export default {
    name: "Organisers",
    components: {RemoveOrganiserModal},
    props: {
        eventId: 0
    },
    data() {
        return {
            currentUserId: Number(sessionStorage.getItem('userId')),
            organisers: [
                {
                    firstName: '',
                    lastName: '',
                    userId: 0
                }]
        }
    },
    methods: {
        getOrganisers() {
            this.$http.get("/connection/organisers", {
                    params: {
                        eventId: this.eventId
                    }
                }
            ).then(response => {
                this.organisers = response.data
            }).catch(error => {
                router.push({name: 'errorRoute'})
            })
        },
        openRemoveOrganiserModal(organiser) {
            this.$refs.removeOrganiserModal.setOrganiser(organiser)
            this.$refs.removeOrganiserModal.setEventId(this.eventId)
            this.$refs.removeOrganiserModal.$refs.modalRef.openModal()
        },
        emitEventOrganisersChanged() {
            this.$emit('event-organisers-changed')
        },
    },
    beforeMount() {
        this.getOrganisers()
    }
}
</script>

