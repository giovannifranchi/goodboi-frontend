<template>
    <main>
        <div class="row">
            <div class="col-4">
                <VueApexCharts :type="'pie'" :series="getSeries"  :options="getOptions"/>
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
            }
        },

        computed: {

            getSeries(){
                return this.pieChart.map((element)=> element.tot);
            },

            getOptions(){
                const pieLabels = this.pieChart.map((element)=> element.name);
                return {
                    labels: pieLabels,
                    dataLabels: {
                        enabled: true,
                    }
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>