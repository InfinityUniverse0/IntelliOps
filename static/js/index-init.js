"use strict";
$(function () {
    var dataCPU = [
        [1590854416000, 1.896559],
        [1590854476000, 6.843433],
        [1590854596000, 7.323213],
        [1590854606000, 9.843433],
        [1590854656000, 11.896434],
        [1590854716000, 20.714378],
        [1590854776000, 17.806021],
        [1590854836000, 16.213132],
        [1590854896000, 23.873758],
        [1590854956000, 25.048189],
        [1590855016000, 13.834786]
    ];

    var dataMemory = [
        [1590854416000, 41.90],
        [1590854476000, 43.63],
        [1590854596000, 50.71],
        [1590854606000, 56.32],
        [1590854656000, 64.12],
        [1590854716000, 75.98],
        [1590854776000, 73.41],
        [1590854836000, 77.23],
        [1590854896000, 80.11],
        [1590854956000, 82.34],
        [1590855016000, 60.12]
    ];

    var options = {
        chart: {
            height: 370,
            type: "area",
            stacked: false,
            toolbar: {
                show: false
            },
            animations: {
                enabled: true,
                easing: 'linear',
                dynamicAnimation: {
                    speed: 2000
                }
            },
            zoom: {
                enabled: false
            },
            events: {
                legendClick: function (chartContext, seriesIndex, config) {
                    var series = chartContext.w.config.series;
                    series[seriesIndex].show = !series[seriesIndex].show;
                    chartContext.updateOptions({
                        series: series
                    });
                }
            }
        },
        xaxis: {
            type: 'datetime',
            range: 600000, // 显示10分钟的数据
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            },
            labels: {
                style: {
                    fontSize: "11px",
                    colors: "#64748b"
                },
                formatter: function (value) {
                    return new Date(value).toLocaleDateString('zh-CN', {
                        hour: 'numeric', minute: 'numeric', hour12: false
                    });
                }
            }
        },
        yaxis: {
            labels: {
                formatter: function (e) {
                    return e + "%"
                },
                offsetX: -22,
                offsetY: 0,
                style: {
                    fontSize: "11px",
                    color: "#64748b"
                }
            }
        },
        stroke: {
            curve: "smooth",
            width: [1, 1],
            dashArray: [3, 3],
            lineCap: "round"
        },
        grid: {
            padding: {
                left: 0,
                right: 0
            },
            strokeDashArray: 3,
            borderColor: "#ebebf3",
            row: {
                colors: ["#ebebf3", "transparent"],
                opacity: .02
            }
        },
        legend: {
            show: true
        },
        colors: ["#3454d1", "#25b865"],
        dataLabels: {
            enabled: false
        },
        fill: {
            type: "gradient",
            gradient: {
                shadeIntensity: 1,
                opacityFrom: .4,
                opacityTo: .3,
                stops: [0, 90, 100]
            }
        },
        series: [{
            name: "CPU 使用率",
            data: dataCPU,
            show: true // 默认显示
        }, {
            name: "内存使用率",
            data: dataMemory,
            show: true // 默认显示
        }],
        tooltip: {
            y: {
                formatter: function (e) {
                    return e + "%"
                }
            },
            style: {
                fontSize: "12px",
                fontFamily: "Inter"
            }
        }
    };

    var chart = new ApexCharts(document.querySelector("#cpu-memory-util-chart"), options);
    chart.render();

    function getNewData() {
        var lastCPUDate = dataCPU[dataCPU.length - 1][0];
        var lastMemoryDate = dataMemory[dataMemory.length - 1][0];
        var newTimestamp = Math.max(lastCPUDate, lastMemoryDate) + 60000;

        var newCPU = (Math.random() * 20 + 5).toFixed(6);
        var newMemory = (Math.random() * 40 + 40).toFixed(6);

        dataCPU.push([newTimestamp, parseFloat(newCPU)]);
        dataMemory.push([newTimestamp, parseFloat(newMemory)]);


        // 获取当前图例显示状态
        var activeSeries = chart.w.config.series.map(series => series.show);

        // 更新数据并保持显示状态
        chart.updateSeries([{
            name: "CPU 使用率",
            data: dataCPU,
            show: activeSeries[0]
        }, {
            name: "内存使用率",
            data: dataMemory,
            show: activeSeries[1]
        }]);
    }

    window.setInterval(function () {
        getNewData();
    }, 2000);
}), $(function () {
    var dataDiskRead = [
        [1590854407000, 0.001],
        [1590854467000, 0.002],
        [1590854547000, 0.0015],
        [1590854587000, 0.0025],
        [1590854647000, 0.0018],
        [1590854707000, 0.0022],
        [1590854767000, 0.0019],
        [1590854827000, 0.0024],
        [1590854887000, 0.0021],
        [1590854947000, 0.0017],
        [1590855007000, 0.0019]
    ];

    var dataDiskWrite = [
        [1590854407000, 0.005],
        [1590854467000, 0.0055],
        [1590854547000, 0.0052],
        [1590854587000, 0.006],
        [1590854647000, 0.0057],
        [1590854707000, 0.0062],
        [1590854767000, 0.0058],
        [1590854827000, 0.0061],
        [1590854887000, 0.0059],
        [1590854947000, 0.0056],
        [1590855007000, 0.0057]
    ];

    var dataDiskUtilization = [
        [1590854407000, 10.0],
        [1590854467000, 15.0],
        [1590854547000, 12.0],
        [1590854587000, 17.0],
        [1590854647000, 13.0],
        [1590854707000, 18.0],
        [1590854767000, 14.0],
        [1590854827000, 16.0],
        [1590854887000, 15.0],
        [1590854947000, 11.0],
        [1590855007000, 12.0]
    ];

    var options = {
        chart: {
            height: 370,
            type: "line",
            stacked: false,
            toolbar: {
                show: false
            },
            animations: {
                enabled: true,
                easing: 'linear',
                dynamicAnimation: {
                    speed: 2000
                }
            },
            zoom: {
                enabled: false
            },
            events: {
                legendClick: function (chartContext, seriesIndex, config) {
                    var series = chartContext.w.config.series;
                    series[seriesIndex].show = !series[seriesIndex].show;
                    chartContext.updateOptions({
                        series: series
                    });
                }
            }
        },
        xaxis: {
            type: 'datetime',
            range: 600000,
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            },
            labels: {
                style: {
                    fontSize: "11px",
                    colors: "#64748b"
                },
                formatter: function (value) {
                    return new Date(value).toLocaleDateString('zh-CN', {
                        hour: 'numeric', minute: 'numeric', hour12: false
                    });
                }
            }
        },
        yaxis: [{
            title: {
                text: '磁盘读量',
            },
            labels: {
                formatter: function (e) {
                    return e + "MB/s"
                },
                offsetX: -22,
                offsetY: 0,
                style: {
                    fontSize: "11px",
                    color: "#64748b"
                }
            },
            show: false
        },
        {
            title: {
                text: '磁盘写量',
            },
            labels: {
                formatter: function (e) {
                    return e + "MB/s"
                },
                offsetX: -22,
                offsetY: 0,
                style: {
                    fontSize: "11px",
                    color: "#64748b"
                }
            },
            show: false
        }, {
            opposite: true,
            title: {
                text: '磁盘IO利用率',
                rotate: -90,
            },
            labels: {
                formatter: function (e) {
                    return e.toFixed(4) + "%"
                }
            }
        }],
        stroke: {
            curve: "smooth",
            width: [1, 1, 1],
            dashArray: [3, 3, 0],
            lineCap: "round"
        },
        grid: {
            padding: {
                left: 0,
                right: 0
            },
            strokeDashArray: 3,
            borderColor: "#ebebf3",
            row: {
                colors: ["#ebebf3", "transparent"],
                opacity: .02
            }
        },
        legend: {
            show: true
        },
        colors: ["#FF4560", "#00E396", "#4D82FF"],

        dataLabels: {
            enabled: false
        },
        fill: {
            type: ['gradient', 'gradient', 'solid'],
            opacity: [0.3, 0.3, 1],
            gradient: {
                shade: 'light',
                type: 'vertical',
                shadeIntensity: 0.5,
                gradientToColors: undefined,
                inverseColors: true,
                opacityFrom: 0.5,
                opacityTo: 0.3,
                stops: [0, 90, 100]
            }
        },
        series: [{
            name: '磁盘读',
            data: dataDiskRead,
            show: true,
            type: "area"
        }, {
            name: '磁盘写',
            data: dataDiskWrite,
            show: true,
            type: "area"
        }, {
            name: '磁盘IO利用率',
            data: dataDiskUtilization,
            show: true,
            type: "line"
        }],
        tooltip: {
            y: {
                formatter: function (value, { seriesIndex, dataPointIndex, w }) {
                    if (seriesIndex === 0 || seriesIndex === 1) {
                        return value + " MB/s";
                    } else if (seriesIndex === 2) {
                        return value + "%";
                    }
                    return value;
                }
            },
            style: {
                fontSize: "12px",
                fontFamily: "Inter"
            }
        }
    };

    var chart = new ApexCharts(document.querySelector("#disk-io-chart"), options);
    chart.render();

    function getNewData() {
        var lastReadDate = dataDiskRead[dataDiskRead.length - 1][0];
        var lastWriteDate = dataDiskWrite[dataDiskWrite.length - 1][0];
        var lastUtilizationDate = dataDiskUtilization[dataDiskUtilization.length - 1][0];
        var newTimestamp = Math.max(lastReadDate, lastWriteDate, lastUtilizationDate) + 60000;

        var newRead = (Math.random() * 0.001 + 0.001).toFixed(6);
        var newWrite = (Math.random() * 0.001 + 0.005).toFixed(6);
        var newUtilization = (Math.random() * 10 + 10).toFixed(6);

        dataDiskRead.push([newTimestamp, parseFloat(newRead)]);
        dataDiskWrite.push([newTimestamp, parseFloat(newWrite)]);
        dataDiskUtilization.push([newTimestamp, parseFloat(newUtilization)]);

        var activeSeries = chart.w.config.series.map(series => series.show);

        chart.updateSeries([{
            name: '磁盘读',
            data: dataDiskRead,
            show: activeSeries[0],
            type: "area"
        }, {
            name: '磁盘写',
            data: dataDiskWrite,
            show: activeSeries[1],
            type: "area"
        }, {
            name: '磁盘IO利用率',
            data: dataDiskUtilization,
            show: activeSeries[2],
            type: "line"
        }]);
    }

    window.setInterval(function () {
        getNewData();
    }, 2000);
}), $(document).ready(function () {
    new ApexCharts(document.querySelector("#user-processes-chart"), {
        chart: {
            height: 380,
            width: "100%",
            type: 'bar',
            toolbar: {
                show: false
            }
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded'
            },
        },
        colors: ["#FFC300", "#FF5733"],
        series: [{
            name: "总运行进程数",
            type: "bar",
            data: [
                [1590854596000, 180.0],
                [1590854896000, 185.0],
                [1590855196000, 182.0],
                [1590855496000, 188.0],
                [1590855796000, 185.0],
                [1590856096000, 190.0],
                [1590856396000, 187.0],
                [1590856696000, 183.0],
                [1590856996000, 188.0],
                [1590857296000, 186.0],
                [1590857596000, 184.0]
            ].map(item => ({ x: item[0], y: item[1] }))
        }, {
            name: "正在运行的进程数",
            type: "bar",
            data: [
                [1590854598000, 36.0],
                [1590854898000, 37.0],
                [1590855198000, 36.0],
                [1590855498000, 38.0],
                [1590855798000, 37.0],
                [1590856098000, 39.0],
                [1590856398000, 38.0],
                [1590856698000, 36.0],
                [1590856998000, 38.0],
                [1590857298000, 37.0],
                [1590857598000, 36.0]
            ].map(item => ({ x: item[0], y: item[1] }))
        }],
        xaxis: {
            type: 'datetime',
            labels: {
                style: {
                    colors: "#A0ACBB"
                },
                formatter: function (value) {
                    return new Date(value).toLocaleDateString('zh-CN', {
                        hour: 'numeric', minute: 'numeric', hour12: false
                    });
                }
            }
        },
        yaxis: {
            labels: {
                formatter: function (val) {
                    return val.toFixed(0);
                },
                style: {
                    color: "#A0ACBB"
                }
            }
        },
        grid: {
            xaxis: {
                lines: {
                    show: false
                }
            },
            yaxis: {
                lines: {
                    show: false
                }
            }
        },
        dataLabels: {
            enabled: false
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return val.toFixed(0);
                }
            }
        },
        legend: {
            labels: {
                colors: "#A0ACBB"
            },
            fontSize: "12px",
            fontFamily: "Inter"
        }
    }).render();
}), $(document).ready(function () {
    var dataInflow = [
        [1590854425000, 11.557136],
        [1590854485000, 11.026352],
        [1590854545000, 11.257099],
        [1590854605000, 11.456979],
        [1590854665000, 12.320941],
        [1590854725000, 12.533992],
        [1590854785000, 13.538003],
        [1590854845000, 11.531398],
        [1590854905000, 13.111662],
        [1590854965000, 12.450254],
        [1590855026000, 12.395362]
    ];

    var dataOutflow = [
        [1590854425000, 1.5],
        [1590854485000, 2.1],
        [1590854545000, 1.8],
        [1590854605000, 2.0],
        [1590854665000, 3.2],
        [1590854725000, 4.5],
        [1590854785000, 3.8],
        [1590854845000, 2.3],
        [1590854905000, 4.0],
        [1590854965000, 3.1],
        [1590855026000, 3.6]
    ];

    var options = {
        chart: {
            height: 370,
            type: "area",
            toolbar: {
                show: false
            },
            animations: {
                enabled: true,
                easing: 'linear',
                dynamicAnimation: {
                    speed: 2000
                }
            },
            zoom: {
                enabled: false
            },
            events: {
                legendClick: function (chartContext, seriesIndex, config) {
                    var series = chartContext.w.config.series;
                    series[seriesIndex].show = !series[seriesIndex].show;
                    chartContext.updateOptions({
                        series: series
                    });
                }
            }
        },
        xaxis: {
            type: 'datetime',
            range: 600000, // 显示10分钟的数据
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            },
            labels: {
                style: {
                    fontSize: "11px",
                    colors: "#64748b"
                },
                formatter: function (value) {
                    return new Date(value).toLocaleDateString('zh-CN', {
                        hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false
                    });
                }
            }
        },
        yaxis: {
            labels: {
                formatter: function (e) {
                    return e.toFixed(2) + " MB/s"
                },
                offsetX: -22,
                offsetY: 0,
                style: {
                    fontSize: "11px",
                    color: "#64748b"
                }
            }
        },
        stroke: {
            width: 2,
            curve: "smooth",
            lineCap: "round"
        },
        grid: {
            padding: {
                left: 0,
                right: 0
            },
            strokeDashArray: 3,
            borderColor: "#ebebf3",
            row: {
                colors: ["#ebebf3", "transparent"],
                opacity: .02
            }
        },
        legend: {
            show: true
        },
        colors: ["#008FFB", "#00E396"],
        dataLabels: {
            enabled: false
        },
        fill: {
            type: "gradient",
            gradient: {
                shadeIntensity: 1,
                opacityFrom: .4,
                opacityTo: .8,
                stops: [0, 90, 100]
            }
        },
        series: [{
            name: "平均每秒流入总流量",
            data: dataInflow,
            show: true // 默认显示
        }, {
            name: "平均每秒流出总流量",
            data: dataOutflow,
            show: true // 默认显示
        }],
        tooltip: {
            y: {
                formatter: function (e) {
                    return e + " MB/s"
                }
            },
            style: {
                fontSize: "12px",
                fontFamily: "Inter"
            }
        }
    };

    var chart = new ApexCharts(document.querySelector("#network-traffic-chart"), options);
    chart.render();

    function getNewData() {
        var lastInflowDate = dataInflow[dataInflow.length - 1][0];
        var lastOutflowDate = dataOutflow[dataOutflow.length - 1][0];
        var newTimestamp = Math.max(lastInflowDate, lastOutflowDate) + 60000;

        var newInflow = (Math.random() * 3 + 10).toFixed(6);
        var newOutflow = (Math.random() * 2 + 3).toFixed(6);

        dataInflow.push([newTimestamp, parseFloat(newInflow)]);
        dataOutflow.push([newTimestamp, parseFloat(newOutflow)]);

        // 获取当前图例显示状态
        var activeSeries = chart.w.config.series.map(series => series.show);

        // 更新数据并保持显示状态
        chart.updateSeries([{
            name: "平均每秒流入总流量",
            data: dataInflow,
            show: activeSeries[0]
        }, {
            name: "平均每秒流出总流量",
            data: dataOutflow,
            show: activeSeries[1]
        }]);
    }

    window.setInterval(function () {
        getNewData();
    }, 2000);
});
