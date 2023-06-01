<template>
    <div class="container col-8">
        <AlertDanger :message="message"/>
        <h2>Loo uus üritus</h2>
        <div class="row mt-4">
            <div class="col">
                <div class="input-group mb-3">
                    <span class="input-group-text">Mis</span>
                    <input v-model="event.eventName" type="text" class="form-control">
                </div>
            </div>
        </div>
        <div class="row mt-4">
            <div class="col">
                <div class="input-group mb-3">
                    <span class="input-group-text">Minimaalne osalejate arv</span>
                    <input v-model="event.spotsMin" type="number" class="form-control">
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text">Maksimaalne osalejate arv</span>
                    <input v-model="event.spotsMax" type="number" class="form-control">
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text">Osalemistasu (EUR)</span>
                    <input v-model="event.fee" type="number" class="form-control">
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text">Viimane aeg registreeruda</span>
                    <input v-model="event.registrationDate" type="date" class="form-control">
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
                    <input v-model="event.startDate" type="date" class="form-control">
                </div>
            </div>
            <div class="col">
                <div class="input-group mb-3">
                    <span class="input-group-text">Kell</span>
                    <input v-model="event.startTime" class="form-control" type="time">
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <div class="input-group mb-3">
                    <span class="input-group-text">Lõpp</span>
                    <input v-model="event.endDate" type="date" class="form-control">
                </div>
            </div>
            <div class="col">
                <div class="input-group mb-3">
                    <span class="input-group-text">Kell</span>
                    <input v-model="event.endTime" type="time" class="form-control" id="endTime">
                </div>
            </div>
        </div>
        <div class="row mt-4">
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
                    <input v-model="event.addressDescription" type="text" class="form-control">
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col mb-3">
                <div class="form-floating">
                    <textarea v-model="event.description" class="form-control"
                              style="height: 150px"></textarea>
                    <label for="floatingTextarea2">Lisa ürituse kirjeldus</label>
                </div>
            </div>
        </div>
        <div class="row mb-3">
            <div class="col">
                <button @click="navigateToDashboard" type="button" class="btn btn-secondary">Katkesta</button>
            </div>
            <div class="col">
                <button @click="createEvent" type="button" class="btn btn-success">Salvesta üritus</button>
            </div>
        </div>
    </div>
</template>

<script>
import LocationDropdown from "@/components/dropdown/LocationDropdown.vue";
import router from "@/router";
import ImageInput from "@/components/image/ImageInput.vue";
import ProfileImage from "@/components/image/ProfileImage.vue";
import ActivityTypeDropdown from "@/components/dropdown/ActivityTypeDropdown.vue";
import AlertDanger from "@/components/alert/AlertDanger.vue";
import {end} from "@popperjs/core";

export default {
    name: "CreateEventView",
    components: {AlertDanger, ProfileImage, ImageInput, LocationDropdown, ActivityTypeDropdown},
    data() {
        return {
            newLocationName: '',
            message: '',
            userId: sessionStorage.getItem("userId"),
            location: {
                locationName: '',
                locationId: 0
            },
            event: {
                eventName: '',
                description: '',
                fee: 0,
                imageData: '',
                activityTypeName: '',
                activityTypeId: 0,
                locationName: '',
                locationId: 0,
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
        saveLocationInput() {
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
                }
            ).catch(error => {
                if (this.newLocationName !== this.location.locationName) {
                this.message = 'Selline piirkond on nimekirjas juba olemas.'
                } else {
                    router.push({name: 'errorRoute'})
                }
            })
        },
        saveActivityTypeInput() {
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
                if (this.newActivityTypeName !== this.activityType.activityTypeName) {
                    this.message = 'Selline valdkond on nimekirjas juba olemas.'
                } else {
                    router.push({name: 'errorRoute'})
                }
            })
        }
        ,
        createEvent() {
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
                this.postNewEvent()
            }
        }
        ,
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
        }
        ,
        postNewEvent() {
            this.$http.post("/event", this.event, {
                    params: {
                        userId: this.userId
                    }
                }
            ).then(response => {
                let createSuccessMessage = 'Uus üritus sai edukalt loodud!'
                sessionStorage.setItem('createSuccessMessage', createSuccessMessage)
                router.push({name: 'dashboardRoute'})
            }).catch(error => {
                router.push({name: 'errorRoute'})
            })
        }
        ,
        setSelectedLocationId(selectedLocationId) {
            this.event.locationId = selectedLocationId
        }
        ,
        setImageData(pictureDataBase64) {
            this.event.imageData = pictureDataBase64
        }
        ,
        setSelectedActivityTypeId(selectedActivityTypeId) {
            this.event.activityTypeId = selectedActivityTypeId
        }
        ,
        navigateToDashboard() {
            router.push({name: 'dashboardRoute'})
        }
    }
}
</script>
