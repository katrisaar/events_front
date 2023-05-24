<template>
    <div class="container col-5">
        <div class="row">
            <div class="col col-6 mb-4">
                <div class="input-group flex-nowrap">
                    <span class="input-group-text" id="addon-wrapping">Mis</span>
                    <input type="text" class="form-control" aria-label="Username" aria-describedby="addon-wrapping">
                </div>
            </div>
            <div class="col">
                Lisa pilt
            </div>
        </div>
        <div class="row col-7 mb-3">
            <div class="col">
                Algus
            </div>
            <div class="col">
                <input type="date">
            </div>
            <div class="col">
                Kell
            </div>
            <div class="col">
                <input type="time">
            </div>
        </div>
        <div class="row col-7 mb-3">
            <div class="col">
                Lõpp
            </div>
            <div class="col">
                <input type="date">
            </div>
            <div class="col">
                Kell
            </div>
            <div class="col">
                <input type="time">
            </div>
        </div>
        <div class="row mb-3">
            <div class="col col-1 mt-2">
                Piirkond
            </div>
            <div class="col">
                <LocationDropdown ref="locationDropdownRef" @event-emit-selected-location-id="setSelectedLocation" />
            </div>
            <div class="col">
                <div class="input-group mb-3">
                    <span class="input-group-text" id="inputGroup-sizing-default"><font-awesome-icon :icon="['fas', 'plus']" size="1x"/></span>
                    <input v-model="newLocationName" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
                </div>
            </div>
            <div class="col mt-2">
                <button type="button" @click="saveLocationInput">Lisa uus piirkond</button>
            </div>
        </div>
        <div class="row">
            <div class=" col-1 mt-2">
                Valdkond
            </div>
            <div class="col">
                <select class="form-select"
                        aria-label="Default select example">
                    <option selected value="0">Kõik valdkonnad</option>
                    <option >.....valdkonnad.....</option>
                </select>
            </div>
            <div class="col">
                <div class="input-group mb-3">
                    <span class="input-group-text" id="inputGroup-sizing-default"><font-awesome-icon :icon="['fas', 'plus']" size="1x"/></span>
                    <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
                </div>
            </div>
            <div class="col mt-2">
                Lisa uus valdkond
            </div>
        </div>
        <div class="row col-7 mt-3 mb-4">
            <div class="col">Viimane aeg registreeruda
            </div>
            <div class="col">
                <input type="date">
            </div>
        </div>
        <div class="row">
            <div class="col col-6 mb-3">
                <div class="input-group flex-nowrap">
                    <span class="input-group-text" id="addon-wrapping">Minimaalne osalejate arv</span>
                    <input type="text" class="form-control" aria-label="Username" aria-describedby="addon-wrapping">
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col col-6 mb-3">
                <div class="input-group flex-nowrap">
                    <span class="input-group-text" id="addon-wrapping">Maksimaalne osalejate arv</span>
                    <input type="text" class="form-control" aria-label="Username" aria-describedby="addon-wrapping">
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col col-6 mb-3">
                <div class="input-group flex-nowrap">
                    <span class="input-group-text" id="addon-wrapping">Osalemistasu</span>
                    <input type="text" class="form-control" aria-label="Username" aria-describedby="addon-wrapping">
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col col-9 mb-3">
                <div class="input-group flex-nowrap">
                    <span class="input-group-text" id="addon-wrapping">Täpne aadress</span>
                    <input type="text" class="form-control" aria-label="Username" aria-describedby="addon-wrapping">
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col mb-2">
                <button type="button" class="btn btn-success">Sisesta aadressi koordinaadid</button>
            </div>
        </div>
        <div class="row">
            <div class="col mb-4">
                <button type="button" class="btn btn-success">Määra aadress kaardil</button>
            </div>
        </div>
        <div class="row">
            <div class="col mb-3">
                <div class="form-floating">
                    <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style="height: 150px"></textarea>
                    <label for="floatingTextarea2">Lisa ürituse kirjeldus</label>
                </div>
            </div>
        </div>
        <div class="row mb-3">
            <div class="col">
                <button type="button" class="btn btn-secondary">Katkesta</button>
            </div>
            <div class="col">
                <button type="button" class="btn btn-success">Salvesta üritus</button>
            </div>
        </div>
    </div>
</template>

<script>
import LocationDropdown from "@/components/dropdown/LocationDropdown.vue";
import router from "@/router";

export default {
    name: "CreateEventView",
    components: {LocationDropdown},
    data() {
        return {
            newLocationName: '',
            location: {
                locationId: 0,
                locationName: ''
            },
            event: {
                locationId: 0,

            }
        }
    },
    methods: {
        getLocationName() {
            return this.location.locationName
        },
        saveLocationInput() {
            this.$http.post("/location", null, {
                    params: {
                        newLocationName: this.newLocationName
                    }
                }
            ).then(response => {
                this.location = response.data
                this.newLocationName = ''
                this.$refs.locationDropdownRef.getLocations()
                this.$refs.locationDropdownRef.setSelectedLocationId(this.location.locationId)
            }).catch(error => {
                router.push({name: 'errorRoute'})
            })
        },
        setSelectedLocation(selectedLocationId) {
            this.event.locationId = selectedLocationId
        }
    }
}
</script>
