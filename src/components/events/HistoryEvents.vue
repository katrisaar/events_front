<template>
    <div class="container">
        <div class="row mt-4">
            <div class="col">
                <h5>Toimunud üritused, mida oled korraldanud või kus oled osalenud</h5>
                <h6 v-if="message !== ''">{{message}}</h6>
                <table v-else class="table table-hover">
                    <thead>
                    <tr>
                        <th scope="col">Toimumise aeg</th>
                        <th scope="col">Üritus</th>
                        <th scope="col">Osalejaid</th>
                        <th scope="col">Asukoht</th>
                        <th scope="col">Minu seos</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="event in events" :key="event.eventId">
                        <td>{{formatDate(event.startDate)}}</td>
                        <td>{{event.eventName}}</td>
                        <td>{{event.spotsTaken}}</td>
                        <td>{{event.locationName}}</td>
                        <td>{{event.connectionTypeName}}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import router from "@/router";
import moment from "moment/moment";

export default {
    name: "HistoryEvents",
    data() {
        return {
            userId: sessionStorage.getItem('userId'),
            message: '',
            events: [
                {
                    eventId: 0,
                    eventName: '',
                    startDate: '',
                    locationName: '',
                    spotsTaken: 0,
                    connectionTypeName: ''
                }
            ],
            errorResponse: {
                message: '',
                errorCode: 0
            }
        }
    },
    methods: {
        getEvents() {
            this.$http.get("/connection/history", {
                params: {
                    userId: this.userId
                }
            })
                .then(response => {
                    this.events = response.data
                })
                .catch(error => {
                    this.errorResponse = error.response.data
                    if (this.errorResponse.errorCode === 555) {
                        this.message = this.errorResponse.message
                    } else {
                        router.push({name: 'errorRoute'})
                    }
                })
        },
        formatDate(date) {
            return moment(date).format('DD.MM.YYYY');
        }
    },
    beforeMount() {
        this.getEvents()
    }
}
</script>

