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
        <div class="row col-6 mb-3">
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
        <div class="row col-6 mb-3">
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
                <select class="form-select"
                        aria-label="Default select example">
                    <option selected value="0">Kõik piirkonnad</option>
                    <option >.....piirkonnad.....</option>
                </select>
            </div>
            <div class="col mt-2">
                Lisa uus piirkond
            </div>
            <div class="col mt-2">
                Lisa piirkond nupp
            </div>
        </div>
        <div class="row">
            <div class=" col-1 mt-2">Valdkond
            </div>
            <div class="col">
                <select class="form-select"
                        aria-label="Default select example">
                    <option selected value="0">Kõik valdkonnad</option>
                    <option >.....valdkonnad.....</option>
                </select>
            </div>
            <div class="col mt-2">
                Lisa uus valdkond
            </div>
            <div class="col mt-2">
                Valdkonna lisamise nupp
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
            <div class="col">
                <div class="form-floating">
                    <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style="height: 150px"></textarea>
                    <label for="floatingTextarea2">Lisa ürituse kirjeldus</label>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "CreateEventView"
}
</script>

<style scoped>

</style>