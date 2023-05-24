<template>
    <div class="container">
        <div class="row">
            <div class="col-sm">
                <h6 v-if="eventsMessage !== ''">{{eventsMessage}}</h6>
                <table v-else class="table">
                    <tbody>
                    <tr v-for="event in events" :key="event.eventId">
                        <td><ProfileImage :picture-data-base64="event.imageData"/></td>
                        <td>
                            <table>
                                <tr>
                                    <td><a href="#" @click="navigateToEventView(event.eventId)">{{event.eventName}}</a></td>
                                </tr>
                                <tr>
                                    <td>{{event.locationName}}</td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import router from "@/router";
import ProfileImage from "@/components/image/ProfileImage.vue";

export default {
    name: "SoonToFinishEvents",
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
            this.$http.get("/soontoendevents")
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
        }

    },
    beforeMount() {
        this.getEvents()
    }
}
</script>

