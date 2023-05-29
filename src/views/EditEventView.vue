<template>
    <div class="container">
        <h2>Muuda ürituse andmeid</h2>
        <div class="row mt-4">
            <div class="col">
                <div class="input-group mb-3">
                    <span class="input-group-text">Algus</span>
                    <input type="date" class="form-control" id="firstName">
                </div>
            </div>
            <div class="col">
                <div class="input-group mb-3">
                    <span class="input-group-text">Kell</span>
                    <input type="time" class="form-control" id="firstName">
                </div>
            </div>
            <div class="col">
                Pilt
            </div>
        </div>
        <div class="row">
            <div class="col">
                <div class="input-group mb-3">
                    <span class="input-group-text">Lõpp</span>
                    <input type="date" class="form-control" id="firstName">
                </div>
            </div>
            <div class="col">
                <div class="input-group mb-3">
                    <span class="input-group-text">Kell</span>
                    <input type="time" class="form-control" id="firstName">
                </div>
            </div>
            <div class="col">

            </div>
        </div>
        <div class="row">
            <div class="col">
                <div class="input-group mb-3">
                    <LocationDropdown ref="locationDropdownRef"
                                      @event-emit-selected-location-name="setSelectedLocation"/>
                </div>
                <div class="input-group mb-3">
                    <ActivityTypeDropdown ref="activityTypeDropdownRef"
                                          @event-emit-selected-activity-type-name="setSelectedActivityType"/>
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text">Viimane aeg registreeruda</span>
                    <input type="date" class="form-control" id="firstName">
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text">Kirjeldus</span>
                    <input type="text" class="form-control" id="firstName">
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text">Osalejaid mahub</span>
                    <input type="text" class="form-control" id="firstName">
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text">Hetkel registreerunuid</span>
                    <input type="text" class="form-control" id="firstName">
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text">Vabu kohti jäänud</span>
                    <input type="text" class="form-control" id="firstName">
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text">Osalemistasu</span>
                    <input type="text" class="form-control" id="firstName">
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text">Täpne aadress</span>
                    <input type="text" class="form-control" id="firstName">
                </div>
                <div class="form-floating mb-5">
                    <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2"
                              style="height: 150px"></textarea>
                    <label for="floatingTextarea2">Muuda ürituse kirjeldust</label>
                </div>
            </div>
            <div class="col">
                <div class="input-group mb-3">
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="inputGroup-sizing-default">Lisa uus</span>
                        <input type="text" class="form-control" aria-label="Sizing example input"
                               aria-describedby="inputGroup-sizing-default">
                    </div>
                </div>
                <div class="input-group mb-3">
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="inputGroup-sizing-default">Lisa uus</span>
                        <input type="text" class="form-control" aria-label="Sizing example input"
                               aria-describedby="inputGroup-sizing-default">
                    </div>
                </div>
            </div>
            <div class="col">
                <div>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="inputGroup-sizing-default">Lisa uus</span>
                        <input type="text" class="form-control" aria-label="Sizing example input"
                               aria-describedby="inputGroup-sizing-default">
                    </div>
                </div>
                <div>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="inputGroup-sizing-default">Lisa uus</span>
                        <input type="text" class="form-control" aria-label="Sizing example input"
                               aria-describedby="inputGroup-sizing-default">
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div class="row">
                <div class="col">
                    <button type="button" class="btn btn-secondary">Katkesta</button>
                </div>
                <div class="col">
                    <button type="button" class="btn btn-success mb-5">Salvesta muudatused</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import ActivityTypeDropdown from "@/components/dropdown/ActivityTypeDropdown.vue";
import LocationDropdown from "@/components/dropdown/LocationDropdown.vue";

export default {
    name: "EditEventView",
    components: {LocationDropdown, ActivityTypeDropdown}
}
</script>
