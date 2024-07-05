"use strict";
$(function () {
    new ApexCharts(document.querySelector("#cpu-memory-util-chart"), {
        chart: {
            height: 370,
            type: "area",
            stacked: false,
            toolbar: {
                show: false
            }
        },
        xaxis: {
            type: 'datetime',
            categories: [
                1590854416000, 1590854476000, 1590854606000, 1590854656000,
                1590854716000, 1590854776000, 1590854836000, 1590854896000,
                1590854956000, 1590855016000
            ],
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
                    // 使用 Date 对象和 toLocaleDateString 来格式化时间戳
                    return new Date(value).toLocaleDateString('zh-CN', {
                        // year: 'numeric', month: 'short', day: 'numeric'
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
            data: [
                [1590854416000, 1.896559],
                [1590854476000, 1.843433],
                [1590854606000, 70],
                [1590854656000, 50],
                [1590854716000,],
                [1590854776000, 1.83448],
                [1590854836000, 10],
                [1590854896000, 1.873758],
                [1590854956000, 2.048189],
                [1590855016000, 1.834786]
            ],
            type: "area"
        }, {
            name: "内存使用率",
            data: [
                [1590854416000, 75.98],
                [1590854476000, 75.98],
                [1590854536000, 75.97],
                [1590854596000, 75.98],
                [1590854656000, 75.98],
                [1590854716000, 75.98],
                [1590854776000, 75.98],
                [1590854836000, 75.97],
                [1590854896000, 75.98],
                [1590854956000, 75.98],
                [1590855016000, 75.98]
            ],
            type: "area"
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
    }).render()
}), $(document).ready(function () {
    new ApexCharts(document.querySelector("#disk-io-chart"), {
        chart: {
            height: 370,
            type: "line",
            stacked: false,
            toolbar: {
                show: false
            }
        },
        xaxis: {
            type: 'datetime',
            categories: [
                1590854407000, 1590854467000, 1590854547000, 1590854587000,
                1590854647000, 1590854707000, 1590854767000, 1590854827000,
                1590854887000, 1590854947000, 1590855007000
            ],
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
            data: [
                [1590854407000, 0.0],
                [1590854467000, 0.0],
                [1590854547000, 0.00003],
                [1590854587000, 0.00001],
                [1590854647000, 0.0],
                [1590854707000, 0.0],
                [1590854767000, 0.0],
                [1590854827000, 0.0],
                [1590854887000, 0.0],
                [1590854947000, 0.0],
                [1590855007000, 0.0]
            ],
            yAxisIndex: 0,
            type: "area"
        }, {
            name: '磁盘写',
            data: [
                [1590854407000, 0.006462],
                [1590854467000, 0.009086],
                [1590854547000, 0.005401],
                [1590854587000, 0.007714],
                [1590854647000, 0.005601],
                [1590854707000, 0.006883],
                [1590854767000, 0.006774],
                [1590854827000, 0.007113],
                [1590854887000, 0.008213],
                [1590854947000, 0.005209],
                [1590855007000, 0.007457]
            ],
            yAxisIndex: 0,
            type: "area"
        }, {
            name: '磁盘IO利用率',
            data: [
                [1590854407000, 0.0],
                [1590854467000, 0.0],
                [1590854547000, 0.033285],
                [1590854587000, 0.25013],
                [1590854647000, 0.04997],
                [1590854707000, 0.383127],
                [1590854767000, 0.218898],
                [1590854827000, 0.100136],
                [1590854887000, 1.225659],
                [1590854947000, 0.0],
                [1590855007000, 0.0]
            ],
            yAxisIndex: 1,
            type: 'line'
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
    }).render();
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
                [1590854596000, 192.0],
                [1590854896000, 193.0],
                [1590855196000, 193.0],
                [1590855496000, 193.0],
                [1590855796000, 192.0],
                [1590856096000, 192.0],
                [1590856396000, 193.0],
                [1590856696000, 192.0],
                [1590856996000, 194.0],
                [1590857296000, 193.0],
                [1590857596000, 193.0]
            ].map(item => ({ x: item[0], y: item[1] }))
        }, {
            name: "正在运行的进程数",
            type: "bar",
            data: [
                [1590854598000, 1.0],
                [1590854898000, 1.0],
                [1590855198000, 1.0],
                [1590855498000, 1.0],
                [1590855798000, 1.0],
                [1590856098000, 1.0],
                [1590856398000, 1.0],
                [1590856698000, 1.0],
                [1590856998000, 2.0],
                [1590857298000, 3.0],
                [1590857598000, 1.0]
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
        [1590854425000, 0.012698],
        [1590854485000, 0.012027],
        [1590854545000, 0.012343],
        [1590854605000, 0.012425],
        [1590854665000, 0.012824],
        [1590854725000, 0.01309],
        [1590854785000, 0.013779],
        [1590854845000, 0.012379],
        [1590854905000, 0.013389],
        [1590854965000, 0.013143],
        [1590855026000, 0.013099]
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
                    speed: 1000
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
        var newOutflow = (Math.random() / 10).toFixed(6);

        dataInflow.push([newTimestamp, parseFloat(newInflow)]);
        dataOutflow.push([newTimestamp, parseFloat(newOutflow)]);

        if (dataInflow.length > 10) {
            dataInflow.shift();
            dataOutflow.shift();
        }

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
    }, 1000);
});
