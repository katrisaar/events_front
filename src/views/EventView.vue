<template>
    <div class="container">
        <div class="row">
            <div class="col-sm">
                <h2>{{ event.eventName }}</h2>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-sm">
                <div class="row">
                    <div class="col-sm">
                        Algus: {{ event.startDate }}, kell {{ event.startTime }}
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm">
                        Lõpp: {{ event.endDate }}, kell {{ event.endTime }}
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm">
                        Kus: {{ event.locationName }}
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm">
                        Valdkond: {{ event.activityTypeName }}
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm">
                        Viimane aeg registreeruda: {{ event.registrationDate }}
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm">
                        Kirjeldus: {{ event.description }}
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm">
                        Osalejaid mahub: {{ event.spotsMin }} - {{ event.spotsMax }}
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm">
                        Hetkel registreerunuid: {{ event.spotsTaken }}
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm">
                        Vabu kohti jäänud: {{ event.spotsAvailable }}
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm">
                        Osalemistasu: {{ event.fee }} eur
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm">
                        Täpne aadress: {{ event.addressDescription }}
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm">
                        <Organisers :event-id="eventId"/>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm">
                        <Participants :event-id="eventId"/>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm">
                        Siia tuleb hunnik nuppe
                    </div>
                </div>
            </div>
            <div class="col-sm">
                <ProfileImage :picture-data-base64="event.imageData"/>
            </div>
        </div>
    </div>
</template>

<script>
import {useRoute} from "vue-router";
import router from "@/router";
import ProfileImage from "@/components/image/ProfileImage.vue";
import Organisers from "@/components/connection/Organisers.vue";
import Participants from "@/components/connection/Participants.vue";

export default {
    name: "EventView",
    components: {Participants, Organisers, ProfileImage},
    data() {
        return {
            eventId: Number(useRoute().query.eventId),
            event: {
                eventName: '',
                description: '',
                fee: 0,
                imageData: '',
                activityTypeName: '',
                locationName: '',
                spotsMin: 0,
                spotsMax: 0,
                spotsAvailable: 0,
                spotsTaken: 0,
                addressDescription: '',
                registrationDate: '',
                startDate: '',
                startTime: '',
                endDate: '',
                endTime: ''
            }
        }
    },
    methods: {
        getEvent() {
            this.$http.get("/event", {
                    params: {
                        eventId: this.eventId
                    }
                }
            ).then(response => {
                this.event = response.data
            }).catch(error => {
                router.push({name: 'errorRoute'})
            })
        },
    },
    beforeMount() {
        this.getEvent()
    }
}
</script>

