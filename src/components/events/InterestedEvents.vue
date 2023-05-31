<template>
    <div class="container">
        <div class="row mt-2 ">
            <div class="col">
                <h5>Tulevased üritused, mis olen märkinud huvipakkuvaks</h5>
            </div>
        </div>
        <div class="row mt-2">
            <div class="col">
                <h6 v-if="interestedEventsMessage !== ''">{{interestedEventsMessage}}</h6>
                <table v-else class="table table-hover">
                    <thead>
                    <tr>
                        <th scope="col">Toimumise aeg</th>
                        <th scope="col">Registreerumine</th>
                        <th scope="col">Üritus</th>
                        <th scope="col">Vabu kohti</th>
                        <th scope="col">Asukoht</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="event in interestedEvents" :key="event.eventId">
                        <td>{{event.startDate}}</td>
                        <td>{{event.registrationDate}}</td>
                        <td><a href="#" @click="navigateToEventView(event.eventId)">{{event.eventName}}</a></td>
                        <td>{{event.spotsAvailable}}</td>
                        <td>{{event.locationName}}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

</template>

<script>
import router from "@/router";

export default {
    name: "InterestedEvents",
    data() {
        return {
            userId: sessionStorage.getItem('userId'),
            interestedEventsMessage: '',
            interestedEvents: [
                {
                    eventId: 0,
                    eventName: '',
                    registrationDate: '',
                    startDate: '',
                    locationName: '',
                    spotsAvailable: 0
                }
            ],
            errorResponse: {
                message: '',
                errorCode: 0
            }
        }
    },
    methods: {
        getInterestedEvents() {
            this.$http.get("/events/interested", {
                params: {
                    userId: this.userId
                }
            })
                .then(response => {
                    this.interestedEvents = response.data
                })
                .catch(error => {
                    this.errorResponse = error.response.data
                    if (this.errorResponse.errorCode === 555) {
                        this.interestedEventsMessage = this.errorResponse.message
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
        this.getInterestedEvents()
    }
}
</script>