<template>
    <div class="container col-8">
        <AlertDanger :message="message"/>
        <h2>Muuda ürituse andmeid</h2>
        <div class="row mt-4">
            <div class="col">
                <div class="input-group mb-3">
                    <span class="input-group-text">Mis</span>
                    <input v-model="event.eventName" type="text" class="form-control" id="eventName">
                </div>
            </div>
        </div>
        <div class="row mt-4">
            <div class="col">
                <div class="input-group mb-3">
                    <span class="input-group-text">Minimaalne arv osalejaid</span>
                    <input v-model="event.spotsMin" type="number" class="form-control" id="spotsMin">
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text">Osalejaid mahub</span>
                    <input v-model="event.spotsMax" type="number" class="form-control" id="spotsMax">
                </div>
                <div>
                    <h6>Hetkel registreerunuid: {{ event.spotsTaken }}</h6>
                </div>
                <div>
                    <h6>Vabu kohti jäänud: {{ event.spotsMax - event.spotsTaken }}</h6>
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text">Osalemistasu (EUR)</span>
                    <input v-model="event.fee" type="number" class="form-control" id="fee">
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text">Registreerumise aeg</span>
                    <input v-model="event.registrationDate" type="date" class="form-control" id="registrationDate">
                </div>
            </div>
            <div class="col">
                <div>
                    <ProfileImage :picture-data-base64="event.imageData"/>
                </div>
                <div class="mt-2">
                    <ImageInput @event-emit-base64="setImageData"/>
                </div>
            </div>
        </div>
        <div class="row mt-4">
            <div class="col">
                <div class="input-group mb-3">
                    <span class="input-group-text">Algus</span>
                    <input v-model="event.startDate" type="date" class="form-control" id="startDate">
                </div>
            </div>
            <div class="col">
                <div class="input-group mb-3">
                    <span class="input-group-text">Kell</span>
                    <input v-model="event.startTime" type="time" class="form-control" id="startTime">
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <div class="input-group mb-3">
                    <span class="input-group-text">Lõpp</span>
                    <input v-model="event.endDate" type="date" class="form-control" id="endDate">
                </div>
            </div>
            <div class="col">
                <div class="input-group mb-3">
                    <span class="input-group-text">Kell</span>
                    <input v-model="event.endTime" type="time" class="form-control" id="endTime">
                </div>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col">
                <div class="input-group mb-3">
                    <span class="input-group-text">Piirkond</span>
                    <LocationDropdown ref="locationDropdownRef"
                                      @event-emit-selected-location-id="setSelectedLocationId"/>
                </div>
            </div>
            <div class="col">
                <div class="input-group mb-3">
                    <div class="input-group">
                        <span class="input-group-text">Lisa uus</span>
                        <input v-model="newLocationName" type="text" class="form-control">
                    </div>
                </div>
            </div>
            <div class="col col-1">
                <div class="input-group mb-3">
                    <button @click="saveLocationInput" class="btn btn-secondary" type="button">
                        <font-awesome-icon :icon="['fas', 'plus']" size="xl"/>
                    </button>
                </div>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col">
                <div class="input-group mb-3">
                    <span class="input-group-text">Valdkond</span>
                    <ActivityTypeDropdown ref="activityTypeDropdownRef"
                                          @event-emit-selected-activity-type-id="setSelectedActivityTypeId"/>
                </div>
            </div>
            <div class="col">
                <div class="input-group">
                    <div class="input-group mb-3">
                        <span class="input-group-text">Lisa uus</span>
                        <input v-model="newActivityTypeName" type="text" class="form-control">
                    </div>
                </div>
            </div>
            <div class="col col-1">
                <div class="input-group">
                    <button @click="saveActivityTypeInput" class="btn btn-secondary" type="button">
                        <font-awesome-icon :icon="['fas', 'plus']" size="xl"/>
                    </button>
                </div>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col">
                <div class="input-group mb-3">
                    <span class="input-group-text">Täpne aadress</span>
                    <input v-model="event.addressDescription" type="text" class="form-control" id="addressDescription">
                </div>
                <div class="form-floating mb-5">
                    <textarea v-model="event.description" class="form-control" placeholder="Leave a comment here"
                              id="description"
                              style="height: 150px"></textarea>
                    <label for="floatingTextarea2">Muuda ürituse kirjeldust</label>
                </div>
            </div>
        </div>
        <div>
            <div class="row">
                <div class="col">
                    <button @click="cancelEditEvent" type="button" class="btn btn-secondary">Katkesta</button>
                </div>
                <div class="col">
                    <button @click="editEvent" class="btn btn-success mb-5" type="submit">Salvesta muudatused</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import ActivityTypeDropdown from "@/components/dropdown/ActivityTypeDropdown.vue";
import LocationDropdown from "@/components/dropdown/LocationDropdown.vue";
import router from "@/router";
import {useRoute} from "vue-router";
import AlertDanger from "@/components/alert/AlertDanger.vue";
import ImageInput from "@/components/image/ImageInput.vue";
import ProfileImage from "@/components/image/ProfileImage.vue";

export default {
    name: "EditEventView",
    components: {ProfileImage, ImageInput, AlertDanger, LocationDropdown, ActivityTypeDropdown},
    data() {
        return {
            newLocationName: '',
            message: '',
            userId: sessionStorage.getItem("userId"),
            eventId: Number(useRoute().query.eventId),
            location: {
                locationName: '',
                locationId: 0
            },
            event: {
                eventName: '',
                description: '',
                fee: 0,
                imageData: '',
                activityTypeId: 0,
                activityTypeName: '',
                locationId: 0,
                locationName: '',
                spotsMin: 0,
                spotsMax: 0,
                spotsAvailable: 0,
                spotsTaken: 0,
                addressDescription: '',
                registrationDate: '',
                startDate: '',
                startTime: {
                    hour: 0,
                    minute: 0,
                    second: 0,
                    nano: 0
                },
                errorResponse: {
                    message: '',
                    errorCode: 0
                },
                endDate: '',
                endTime: {
                    hour: 0,
                    minute: 0,
                    second: 0,
                    nano: 0
                }
            },
            newActivityTypeName: '',
            activityType: {
                activityTypeName: '',
                activityTypeId: 0
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
                this.$refs.locationDropdownRef.setSelectedLocationId(this.event.locationId)
                this.$refs.activityTypeDropdownRef.setSelectedActivityTypeId(this.event.activityTypeId)
            }).catch(error => {
                router.push({name: 'errorRoute'})
            })
        },
        saveLocationInput() {
            if (this.newLocationName === '') {
                this.message = 'Sul jäi piirkond sisestamata.'
            } else {
                this.$http.post("/location", null, {
                        params: {
                            newLocationName: this.newLocationName
                        }
                    }
                ).then(response => {
                    this.message = ''
                    this.location = response.data
                    this.event.locationId = this.location.locationId
                    this.newLocationName = ''
                    this.$refs.locationDropdownRef.getLocations()
                    this.$refs.locationDropdownRef.setSelectedLocationId(this.location.locationId)
                }).catch(error => {
                    this.errorResponse = error.response.data
                    if (this.errorResponse.errorCode === 333) {
                        this.message = this.errorResponse.message
                    } else {
                        router.push({name: 'errorRoute'})
                    }
                })
            }
        },
        saveActivityTypeInput() {
            if (this.newActivityTypeName === '') {
                this.message = 'Sul jäi valdkond sisestamata.'
            } else {
                this.$http.post("/activitytype", null, {
                        params: {
                            newActivityTypeName: this.newActivityTypeName
                        }
                    }
                ).then(response => {
                    this.message = ''
                    this.activityType = response.data
                    this.event.activityTypeId = this.activityType.activityTypeId
                    this.newActivityTypeName = ''
                    this.$refs.activityTypeDropdownRef.getActivityTypes()
                    this.$refs.activityTypeDropdownRef.setSelectedActivityTypeId(this.activityType.activityTypeId)
                }).catch(error => {
                    this.errorResponse = error.response.data
                    if (this.errorResponse.errorCode === 444) {
                        this.message = this.errorResponse.message
                    } else {
                        router.push({name: 'errorRoute'})
                    }
                })
            }
        },
        editEvent() {
            const startDate = new Date(this.event.startDate);
            const endDate = new Date(this.event.endDate);
            const registrationDate = new Date(this.event.registrationDate);
            this.message = ''
            if (startDate > endDate) {
                this.message = 'Üritus ei saa lõppeda enne kui see veel alanudki pole.'
            } else if (registrationDate > startDate) {
                this.message = 'Üritusele ei saa enam registreeruda, kui üritus juba alanud on.'
            } else if (this.event.spotsMin > this.event.spotsMax) {
                this.message = 'Minimaalne osalejate arv ei saa olla suurem kui maksimaalne osalejate arv.'
            } else if (this.event.spotsMin < 0 || this.event.spotsMax < 0 || this.event.fee < 0) {
                this.message = 'Sisestatud numbrid ei saa olla negatiivsed.'
            } else if (this.isFieldsMissing()) {
                this.message = 'Ole hea, täida kõik väljad!'
            } else {
                this.updateEvent()
            }
        },
        isFieldsMissing() {
            return this.event.eventName === '' ||
                this.event.description === '' ||
                this.event.activityTypeId === 0 ||
                this.event.locationId === 0 ||
                this.event.spotsMax === 0 ||
                this.event.addressDescription === '' ||
                this.event.registrationDate === '' ||
                this.event.startDate === '' ||
                this.event.endDate === '' ||
                String(this.event.startTime) === '' ||
                String(this.event.endTime) === '';
        },
        updateEvent() {
            this.event.spotsAvailable = this.event.spotsMax - this.event.spotsTaken
            this.$http.put("/event", this.event, {
                    params: {
                        eventId: this.eventId
                    }
                }
            ).then(response => {
                this.event = response.data
                let successMessage = 'Ürituse andmed said edukalt muudetud!'
                sessionStorage.setItem('successMessage', successMessage)
                router.push({name: 'dashboardRoute', query: {eventId: this.eventId}})
            }).catch(error => {
                router.push({name: 'errorRoute'})
            })
        },
        cancelEditEvent() {
            router.push({name: 'eventRoute', query: {eventId: this.eventId}})
        },
        setSelectedLocationId(selectedLocationId) {
            this.event.locationId = selectedLocationId
        },
        setSelectedActivityTypeId(selectedActivityTypeId) {
            this.event.activityTypeId = selectedActivityTypeId
        },
        setImageData(pictureDataBase64) {
            this.event.imageData = pictureDataBase64
        }
    },
    beforeMount() {
        this.eventId = Number(useRoute().query.eventId)
        this.getEvent()
    }
}
</script>