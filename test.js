
var text1 = [10,48,39,90,37,58,38];
var timeTable = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
var dateTable = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28];
var LightSource;
var AirSource;
var LightMonthSource;
var AirMonthSource;
var GateMonthSource;
var LightTimeTable = new Array();
var AirTimeTable = new Array();
var LightDateTable = new Array();
var AirDateTable = new Array();
var dateValueLight = new Array();
var dateValueAir = new Array();
var dateValueGate = new Array();
var monthProportion = new Array();
var dayProportion = new Array();


function getData(){
    $.ajax({
        type:"get",
        async:false,
        url:"air.json",
        dataType:"json",
        success:function(res){
            AirSource = res;
        },
        error:function(res){
            console.log("A Something wrong!")
        }
    });

    $.ajax({
        type:"get",
        async:false,
        url:"light.json",
        dataType:"json",
        success:function(res){
            LightSource = res;
        },
        error:function(res){
            console.log("L Something wrong!")
        }
    });

    $.ajax({
        type:"get",
        async:false,
        url:"air_month.json",
        dataType:"json",
        success:function(res){
            AirMonthSource = res;
        },
        error:function(res){
            console.log("A Something wrong!")
        }
    });

    $.ajax({
        type:"get",
        async:false,
        url:"light_month.json",
        dataType:"json",
        success:function(res){
            LightMonthSource = res;
        },
        error:function(res){
            console.log("L Something wrong!")
        }
    });

    $.ajax({
        type:"get",
        async:false,
        url:"gate_month.json",
        dataType:"json",
        success:function(res){
            GateMonthSource = res;
        },
        error:function(res){
            console.log("G Something wrong!")
        }
    });
}
getData();
timeDataInit(1);
dateDataInit();
dateValueInit();
monthProportionInit();
dayProportionInit(1);

function displayByTime(day) {
    var ctx = document.getElementById("Chart_time").getContext('2d');
    var lineChartData = {
        // x轴的标示
        labels : timeTable,
        // 数据，数组中的每一个object代表一条线
        datasets : [
            {
                label: "照明用电",
                pointBackgroundColor : "yellow",
                pointBorderColor : "white",
                borderColor : "yellow",
                borderWidth: 2,
                //backgroundColor: 'rgba(255,255,0,0.1)',
                data : LightTimeTable
            },
            {
                label: "空调用电",
                pointBackgroundColor : "aqua",
                pointBorderColor : "white",
                borderColor : "aqua",
                borderWidth: 2,
                //backgroundColor: 'rgba(0,255,255,0.1)',
                data : AirTimeTable
            }
        ],
    }

    var myLineChart = new Chart(ctx, {
        type: 'line',
        data: lineChartData,
        options: Chart.defaults.line.spanGaps = true,
        options: Chart.defaults.global.defaultFontColor = 'white',
        options: {
            responsive: true,
            title: {
                display: true,
                text: '每日用电时间折线图 4月'+day+'日'
            },
            tooltips: {
                mode: 'index',
                intersect: false,
            },
            hover: {
                mode: 'nearest',
                intersect: true
            }
        }
    });
}

function timeDataInit(date) {
    LightTimeTable = new Array();
    AirTimeTable = new Array();
    var day = date;
    for(var i=0; i<LightSource.length; i++){
        if(LightSource[i].Date > day)
            break;
        else if(LightSource[i].Date==day){
            LightTimeTable[LightSource[i].Time]=LightSource[i].Elec;
        }
    }
    for(var i=0; i<AirSource.length; i++){
        if(AirSource[i].Date > day)
            break;
        else if(AirSource[i].Date==day){
            AirTimeTable[AirSource[i].Time]=AirSource[i].Elec;
        }
    }
    console.log(LightTimeTable);
    console.log(AirTimeTable);
    displayByTime(day);
}

function displayByDate() {
    var ctx = document.getElementById("Chart_date").getContext('2d');
    var lineChartData = {
        // x轴的标示
        labels : dateTable,
        // 数据，数组中的每一个object代表一条线
        datasets : [
            {
                label: "照明用电",
                type:'bar',
                backgroundColor:'yellow',
                data : LightDateTable
            },
            {
                label: "空调用电",
                type:'bar',
                backgroundColor:'aqua',
                data : AirDateTable
            },
            {
                label: "照明用电",
                type:'line',
                pointBackgroundColor : "yellow",
                pointBorderColor : "yellow",
                borderColor : "yellow",
                borderWidth: 2,
                data : LightDateTable
            },
            {
                label: "空调用电",
                type:'line',
                pointBackgroundColor : "aqua",
                pointBorderColor : "aqua",
                borderColor : "aqua",
                borderWidth: 2,
                data : AirDateTable
            }
        ],
    }

    var myMixedChart = new Chart(ctx, {
        type: 'bar',
        data: lineChartData,
        //options: Chart.defaults.line.spanGaps = true,
        options: Chart.defaults.global.defaultFontColor = 'white',
        options: {
            responsive: true,
            title: {
                display: true,
                text: '4月用电折线图'
            },
            elements:{
                point:{
                    pointStyle: 'dash'
                }
            },
            tooltips: {
                mode: 'index',
                intersect: false,
            },
            hover: {
                mode: 'nearest',
                intersect: true
            }
        }
    });
}

function dateDataInit() {
    for(var i=0; i<27; i++){
        LightDateTable[i] = LightMonthSource[i].Elec;
        AirDateTable[i] = AirMonthSource[i].Elec;
    }
    console.log(LightDateTable);
    console.log(AirDateTable);
    displayByDate();
}

function displayValueByDate() {
    var ctx1 = document.getElementById("Chart_value_light").getContext('2d');
    var ctx2 = document.getElementById("Chart_value_air").getContext('2d');
    var ctx3 = document.getElementById("Chart_value_gate").getContext('2d');
    var lineChartDataLight = {
        // x轴的标示
        labels : dateTable,
        // 数据，数组中的每一个object代表一条线
        datasets : [
            {
                label: "照明用电",
                pointBackgroundColor : "yellow",
                pointBorderColor : "white",
                borderColor : "yellow",
                borderWidth: 2,
                backgroundColor: 'rgba(255,255,0,0.1)',
                data : dateValueLight
            }
        ],
    };

    var lineChartDataAir = {
        // x轴的标示
        labels : dateTable,
        // 数据，数组中的每一个object代表一条线
        datasets : [

            {
                label: "空调用电",
                pointBackgroundColor : "aqua",
                pointBorderColor : "white",
                borderColor : "aqua",
                borderWidth: 2,
                backgroundColor: 'rgba(0,255,255,0.1)',
                data : dateValueAir
            }
        ],
    };

    var lineChartDataGate = {
        // x轴的标示
        labels : dateTable,
        // 数据，数组中的每一个object代表一条线
        datasets : [
            {
                label: "卷帘门用电",
                pointBackgroundColor : "lime",
                pointBorderColor : "white",
                borderColor : "lime",
                borderWidth: 2,
                backgroundColor: 'rgba(0,255,0,0.1)',
                data : dateValueGate
            }
        ],
    };

    var myLineChart1 = new Chart(ctx1, {
        type: 'line',
        data: lineChartDataLight,
        options: Chart.defaults.line.spanGaps = true,
        options: Chart.defaults.global.defaultFontColor = 'white',
        options: {
            responsive: true,
            title: {
                display: true,
                text: '4月照明用电电表数据折线图'
            },
            tooltips: {
                mode: 'index',
                intersect: false,
            },
            hover: {
                mode: 'nearest',
                intersect: true
            }
        }
    });
    var myLineChart2 = new Chart(ctx2, {
        type: 'line',
        data: lineChartDataAir,
        options: Chart.defaults.line.spanGaps = true,
        options: Chart.defaults.global.defaultFontColor = 'white',
        options: {
            responsive: true,
            title: {
                display: true,
                text: '4月空调用电电表数据折线图'
            },
            tooltips: {
                mode: 'index',
                intersect: false,
            },
            hover: {
                mode: 'nearest',
                intersect: true
            }
        }
    });
    var myLineChart3 = new Chart(ctx3, {
        type: 'line',
        data: lineChartDataGate,
        options: Chart.defaults.line.spanGaps = true,
        options: Chart.defaults.global.defaultFontColor = 'white',
        options: {
            responsive: true,
            title: {
                display: true,
                text: '4月卷帘门用电电表数据折线图'
            },
            tooltips: {
                mode: 'index',
                intersect: false,
            },
            hover: {
                mode: 'nearest',
                intersect: true
            }
        }
    });
}

function dateValueInit() {
    for(var i=0; i<LightMonthSource.length; i++){
        dateValueLight[LightMonthSource[i].Date-1] = LightMonthSource[i].AH_Value;
    }
    for(var i=0; i<AirMonthSource.length; i++){
        dateValueAir[AirMonthSource[i].Date-1] = AirMonthSource[i].AH_Value;
    }
    for(var i=0; i<GateMonthSource.length; i++){
        dateValueGate[GateMonthSource[i].Date-1] = GateMonthSource[i].AH_Value;
    }
    displayValueByDate();
}

function monthProportionDisplay(){
    var ctx = document.getElementById("Chart_month_proportion").getContext('2d');
    var PAChartData = {
        // x轴的标示
        labels : ['照明用电','空调用电','卷帘门用电'],
        // 数据，数组中的每一个object代表一条线
        datasets : [{
            data: monthProportion,
            backgroundColor: ['yellow','aqua','lime'],
            borderWidth:0,
        }],
    };
    var myPAChart = new Chart(ctx, {
        type: 'doughnut',
        data: PAChartData,
        options: Chart.defaults.global.defaultFontColor = 'white',
        options: {
            responsive: true,
            title: {
                display: true,
                text: '4月各项用电量占比图',
            },
        }
    });
}

function monthProportionInit() {
    monthProportion[0] = dateValueLight[dateValueLight.length-1]-dateValueLight[0];
    monthProportion[1] = dateValueAir[dateValueAir.length-1]-dateValueAir[0];
    monthProportion[2] = dateValueGate[dateValueGate.length-1]-dateValueGate[1];
    console.log(dateValueGate);
    console.log(monthProportion);
    monthProportionDisplay();
}

function dayProportionDisplay(date){
    var ctx = document.getElementById("Chart_day_proportion").getContext('2d');
    var PAChartData = {
        // x轴的标示
        labels : ['照明用电','空调用电'],
        // 数据，数组中的每一个object代表一条线
        datasets : [{
            data: dayProportion,
            backgroundColor: ['yellow','aqua'],
            borderWidth:0,
        }],
    };
    var myPAChart = new Chart(ctx, {
        type: 'doughnut',
        data: PAChartData,
        options: Chart.defaults.global.defaultFontColor = 'white',
        options: {
            responsive: true,
            title: {
                display: true,
                text: '4月'+date+'日各项用电量占比图',
            },
        }
    });
}

function dayProportionInit(date){
    dayProportion[0] = LightDateTable[date-1];
    dayProportion[1] = AirDateTable[date-1];
    dayProportionDisplay(date);
}


function node(index, date, light, air, temperature, weather){
    this.index = index;
    this.date = date;
    this.light = air;
    this.air = air;
    this.temperature = temperature;
    this.weather = weather;
}

var listTable = new Array();
for(var i = 0; i<27; i++){
    var n = i+1;
    var date = "4月"+n+"日";
    var light = LightDateTable[i];
    var air = AirDateTable[i];
    var temperature = "20°C";
    var weather = "晴";
    listTable[i] = new node(n,date,light,air,temperature,weather);
}

var datalist = new Vue({
    el:"#sideBar",
    data: {
        dateInApril:listTable,
    },
    methods:{
        show:function(index, event){
            timeDataInit(index);
            dayProportionInit(index);
        },
    }
});