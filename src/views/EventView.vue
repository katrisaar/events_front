<template>
    <div class="container col-7">
        <AddOrganiserModal ref="addOrganiserModalRef" @event-organisers-changed="refreshEventView"/>
        <CancelEventModal ref="cancelEventModalRef" :event-id="eventId"/>
        <DeleteEventModal ref="deleteEventModalRef" :event-id="eventId"/>
        <div class="row">
            <div class="col-sm">
                <h2>{{ event.eventName }}</h2>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col col-8">
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
                <div v-if="userEventConnection === 'korraldaja' || userEventConnection === 'osaleja'" class="row">
                    <div class="col-sm">
                        Täpne aadress: {{ event.addressDescription }}
                    </div>
                </div>
                <div v-if="userEventConnection !== 'anonymous'" class="row">
                    <div class="col-sm">
                        <Organisers ref="organisersRef" :event-id="eventId" :user-event-connection="userEventConnection"
                                    @event-organisers-changed="refreshEventView"/>
                    </div>
                </div>
                <div v-if="userEventConnection !== 'anonymous'" class="row mb-5">
                    <div class="col-sm">
                        <Participants ref="participantsRef" :event-id="eventId"/>
                    </div>
                </div>
                <div v-if="userEventConnection === 'korraldaja'" class="row">
                    <div class="col-sm">
                        <button @click="navigateToEditEventView" class="btn btn-success" type="submit">Muuda üritust
                        </button>
                    </div>
                    <div class="col-sm">
                        <button @click="openAddOrganiserModal" type="button" class="btn btn-success">Lisa korraldajaid
                        </button>
                    </div>
                    <div v-if="event.spotsTaken === 0" class="col-sm">
                        <button @click="openDeleteEventModal" type="button" class="btn btn-danger">Kustuta üritus
                        </button>
                    </div>
                    <div v-if="event.spotsTaken !== 0" class="col-sm">
                        <button @click="openCancelEventModal" type="button" class="btn btn-danger">Tühista üritus
                        </button>
                    </div>
                </div>
                <div v-if="userEventConnection === 'osaleja'" class="row">
                    <div class="col-sm">
                        <button @click="deleteParticipant" type="button" class="btn btn-success">Loobun
                            osalemisest
                        </button>
                    </div>
                </div>
                <div v-if="userEventConnection === 'huvitatud'" class="row">
                    <div class="col-sm">
                        <button @click="deleteInterested" type="button" class="btn btn-success">Eemalda huvitavate seast</button>
                    </div>
                    <div class="col-sm">
                        <button v-if="event.spotsAvailable > 0" @click="addParticipant" type="button"
                                class="btn btn-success">Osalen üritusel
                        </button>
                        <button v-else type="button" class="btn btn-success">Kõik kohad täis</button>
                    </div>
                </div>
                <div v-if="userEventConnection === 'none'" class="row">
                    <div class="col-sm">
                        <button @click="addInterested" type="button" class="btn btn-success">Märgi huvitavaks</button>
                    </div>
                    <div class="col-sm">
                        <button v-if="event.spotsAvailable > 0" @click="addParticipant" type="button"
                                class="btn btn-success">Osalen üritusel
                        </button>
                        <button v-else type="button" class="btn btn-success">Kõik kohad täis</button>
                    </div>
                </div>
            </div>
            <div class="col col-3">
                <div class="row">
                    <div class="col">
                        <ProfileImage :picture-data-base64="event.imageData"/>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col">
                        Kirjeldus: {{ event.description }}
                    </div>
                </div>
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
import AddOrganiserModal from "@/components/modal/AddOrganiserModal.vue";
import CancelEventModal from "@/components/modal/CancelEventModal.vue";
import DeleteEventModal from "@/components/modal/DeleteEventModal.vue";
import Router from "@/router";
import dashboardView from "@/views/DashboardView.vue";

export default {
    name: "EventView",
    components: {DeleteEventModal, CancelEventModal, AddOrganiserModal, Participants, Organisers, ProfileImage},
    data() {
        return {
            userId: sessionStorage.getItem('userId'),
            eventId: Number(useRoute().query.eventId),
            userEventConnection: '',
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
            },
            connectionResponse: {
                name: ''
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
        defineUserConnectionToEvent() {
            if (this.userId === null) {
                this.userEventConnection = "anonymous"
            } else {
                this.getUserConnectionToEvent()
            }
        },
        getUserConnectionToEvent() {
            this.$http.get("/connection/type", {
                    params: {
                        eventId: this.eventId,
                        userId: this.userId
                    }
                }
            ).then(response => {
                this.connectionResponse = response.data
                this.userEventConnection = this.connectionResponse.name
            }).catch(error => {
                router.push({name: 'errorRoute'})
            })
        },
        addInterested() {
            this.$http.post("/connection/interested", null, {
                    params: {
                        eventId: this.eventId,
                        userId: this.userId
                    }
                }
            ).then(response => {
                router.push({name: 'dashboardRoute'})
            }).catch(error => {
                router.push({name: 'errorRoute'})
            })
        },
        addParticipant() {
            this.$http.post("/connection/participant", null, {
                    params: {
                        eventId: this.eventId,
                        userId: this.userId
                    }
                }
            ).then(response => {
                router.push({name: 'dashboardRoute'})
            }).catch(error => {
                router.push({name: 'errorRoute'})
            })
        },
        openAddOrganiserModal() {
            this.$refs.addOrganiserModalRef.setEventId(this.eventId)
            this.$refs.addOrganiserModalRef.$refs.modalRef.openModal()
        },
        refreshEventView() {
            this.getEvent()
            this.$refs.organisersRef.getOrganisers()
            this.$refs.participantsRef.getParticipants()
        },
        deleteInterested() {
            this.$http.delete("/connection/interested", {
                    params: {
                        eventId: this.eventId,
                        userId: this.userId
                    }
                }
            ).then(response => {
                router.push({name: 'dashboardRoute'})
            }).catch(error => {
                router.push({name: 'errorRoute'})
            })
        },
        deleteParticipant() {
            this.$http.delete("/connection/participant", {
                    params: {
                        eventId: this.eventId,
                        userId: this.userId
                    }
                }
            ).then(response => {
                router.push({name: 'dashboardRoute'})
            }).catch(error => {
                router.push({name: 'errorRoute'})
            })
        },
        openCancelEventModal() {
            this.$refs.cancelEventModalRef.$refs.modalRef.openModal()
        },
        openDeleteEventModal() {
            this.$refs.deleteEventModalRef.$refs.modalRef.openModal()
        },
        navigateToEditEventView() {
            router.push({name: 'editEventRoute', query: {eventId: this.eventId}})
        }
    },

    beforeMount() {
        this.getEvent()
        this.defineUserConnectionToEvent()
    }
}
</script>

