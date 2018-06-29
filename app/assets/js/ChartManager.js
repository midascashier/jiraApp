import Chart from 'chart.js'

export class ChartManager{
    constructor(name, container){
        document.getElementById(container).innerHTML = `<canvas id="${name}" width="100%" height="100%"></canvas>`;
        this.chart = document.getElementById(name);
    }

    pie(data, options = {}){
        let pieChart = new Chart(this.chart,{
            type: 'pie',
            data: data,
            options: options
        });
    }
}