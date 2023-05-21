<template>
    <div class="container justify-content-center">
        <h4>Admini töölaud</h4>
        <div class="row mt-5">
            <div class="col">
                <table class="table table-hover">
                    <thead>
                    <tr>
                        <th scope="col">Kasutajanimi</th>
                        <th scope="col">Eesnimi</th>
                        <th scope="col">Perekonnanimi</th>
                        <th scope="col">E-mail</th>
                        <th scope="col">Roll</th>
                        <th scope="col">Staatus</th>
                        <th scope="col">Muuda/kustuta</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th scope="row">...</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                            <font-awesome-icon class="hoverable-link me-3" :icon="['fas', 'pen-to-square']"/>
                            <font-awesome-icon class="hoverable-link" :icon="['fas', 'xmark']"/>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">...</th>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                            <font-awesome-icon class="hoverable-link me-3" :icon="['fas', 'pen-to-square']"/>
                            <font-awesome-icon class="hoverable-link" :icon="['fas', 'xmark']"/>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row"></th>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                            <font-awesome-icon class="hoverable-link me-3" :icon="['fas', 'pen-to-square']"/>
                            <font-awesome-icon class="hoverable-link" :icon="['fas', 'xmark']"/>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "AdminView"
}
</script>

<style scoped>

</style>