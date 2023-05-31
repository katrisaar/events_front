<template>
    <div class="container col-5">
        <AlertSuccess :message="successMessage"/>
        <AlertSuccess :message="createSuccessMessage"/>
        <div class="row">
            <div class="col">
                <h3>Kõik minuga seotud üritused </h3>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <OrganizedEvents/>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <ParticipatingEvents/>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <InterestedEvents/>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col">
                <button v-if="showHistoryEvents === false" @click="openHistoryEvents" class="btn btn-success"
                        type="submit">Vaata toimunud üritusi
                </button>
                <button v-else @click="closeHistoryEvents" class="btn btn-success" type="submit">Sulge toimunud ürituste
                    vaade
                </button>
            </div>
        </div>
        <div v-if="showHistoryEvents === true" class="row">
            <div class="col">
                <HistoryEvents/>
            </div>
        </div>
    </div>
</template>

<script>
import OrganizedEvents from "@/components/events/OrganizedEvents.vue";
import ParticipatingEvents from "@/components/events/ParticipatingEvents.vue";
import InterestedEvents from "@/components/events/InterestedEvents.vue";
import HistoryEvents from "@/components/events/HistoryEvents.vue";
import AlertSuccess from "@/components/alert/AlertSuccess.vue";

export default {
    name: "DashboardView",
    components: {AlertSuccess, HistoryEvents, InterestedEvents, ParticipatingEvents, OrganizedEvents},
    data() {
        return {
            message: '',
            createSuccessMessage: sessionStorage.getItem('createSuccessMessage'),
            successMessage: sessionStorage.getItem('successMessage'),
            userId: sessionStorage.getItem('userId'),
            showHistoryEvents: false
        }
    },
    methods: {
        openHistoryEvents() {
            this.showHistoryEvents = true
        },
        closeHistoryEvents() {
            this.showHistoryEvents = false
        },
    },
    beforeRouteLeave() {
        sessionStorage.removeItem('successMessage')
        sessionStorage.removeItem('createSuccessMessage')
    }
}
</script>
