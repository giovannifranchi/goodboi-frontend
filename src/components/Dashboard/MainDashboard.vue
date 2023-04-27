<template>
    <main>
        <div class="row">
            <div class="col-4">
                <VueApexCharts :type="'pie'" :series="getSeries" :labels="getLabels" :options="pieOptions"/>
            </div>
        </div>
    </main>
</template>

<script>
import VueApexCharts from 'vue3-apexcharts';
import { store } from '../../store/store';


    export default {
        name: 'MainDashboard',

        components: {VueApexCharts}, 

        data(){
            return {
                store,
                pieChart: store.mokup.pie_chart,
                pieOptions: {
                    dataLabels: {
                        enabled: true,
                    }
                }
            }
        },

        computed: {
            getSeries(){
                return this.pieChart.map((element)=> element.perc);
            },
            getLabels(){
                return this.pieChart.map((element)=> element.name);
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>