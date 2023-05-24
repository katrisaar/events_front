<template>
    <div class="container">
        <div class="row mt-4">
            <div class="col">
                <h5>Tulevased üritused, mis olen märkinud huvipakkuvaks</h5>
                <h6 v-if="interestedEventsMessage !== ''">{{interestedEventsMessage}}</h6>
                <table v-else class="table table-hover">
                    <thead>
                    <tr>
                        <th scope="col">Toimumise aeg</th>
                        <th scope="col">Registreerumine</th>
                        <th scope="col">Üritus</th>
                        <th scope="col">Vabu kohti</th>
                        <th scope="col">Asukoht</th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="event in interestedEvents" :key="event.eventId">
                        <td>{{event.startDate}}</td>
                        <td>{{event.registrationDate}}</td>
                        <td>{{event.eventName}}</td>
                        <td>{{event.spotsAvailable}}</td>
                        <td>{{event.locationName}}</td>
                        <td>
                            <font-awesome-icon  class="hoverable-link me-3" :icon="['fas', 'pen-to-square']"/>
                            <font-awesome-icon  class="hoverable-link" :icon="['fas', 'xmark']"/>
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
            this.$http.get("/interestedevents", {
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
        }
    },
    beforeMount() {
        this.getInterestedEvents()
    }
}
</script>

<style scoped>

</style>