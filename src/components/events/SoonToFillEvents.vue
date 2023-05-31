<template>
    <div class="container">
        <h3>Viimased kohad jäänud</h3>
        <button @click="navigateToAllEventsView" class="btn btn-success" type="submit">Vaata kõiki üritusi</button>
        <h6 v-if="eventsMessage !== ''">{{eventsMessage}}</h6>
        <div v-else v-for="event in events" :key="event.eventId" class="row">
            <div class="card col-sm">
                <img :src="event.imageData" class="card-img-top" alt="Üritust tutvustav pilt">
                <div class="card-body">
                    <h5 class="card-title">{{event.eventName}}</h5>
                    <p class="card-text">{{event.locationName}}</p>
                    <a href="#"  @click="navigateToEventView(event.eventId)" class="btn btn-success">Vaata ürituse infot</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ProfileImage from "@/components/image/ProfileImage.vue";
import router from "@/router";

export default {
    name: "SoonToFillEvents",
    components: {ProfileImage},
    data() {
        return {
            eventsMessage: '',
            events: [
                {
                    eventId: 0,
                    eventName: '',
                    imageData: '',
                    locationName: ''
                }
            ]
        }
    },
    methods: {
        getEvents() {
            this.$http.get("/events/soontofill")
                .then(response => {
                    this.events = response.data
                })
                .catch(error => {
                    this.errorResponse = error.response.data
                    if (this.errorResponse.errorCode === 555) {
                        this.eventsMessage = this.errorResponse.message
                    } else {
                        router.push({name: 'errorRoute'})
                    }
                })
        },
        navigateToEventView(eventId) {
            router.push({name: 'eventRoute', query: {eventId: eventId}})
        },
        navigateToAllEventsView() {
            router.push({name: 'eventsRoute'})
        },
    },
    beforeMount() {
        this.getEvents()
    }
}
</script>

<style scoped>

</style>