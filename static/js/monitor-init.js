"use strict";

$(document).ready(function () {
    const logs = [
        { month: 'July', date: '04', time: '12:34:56', component: 'Component A', hostname: 'Host1', pid: '1234', event_id: 'Event1', content: 'Log content 1' },
        { month: 'July', date: '04', time: '12:35:56', component: 'Component B', hostname: 'Host2', pid: '1235', event_id: 'Event2', content: 'Log content 2' },
        { month: 'July', date: '04', time: '12:36:56', component: 'Component C', hostname: 'Host3', pid: '1236', event_id: 'Event3', content: 'Log content 3' },
        { month: 'July', date: '04', time: '12:37:56', component: 'Component D', hostname: 'Host4', pid: '1237', event_id: 'Event4', content: 'Log content 4' },
        { month: 'July', date: '04', time: '12:38:56', component: 'Component E', hostname: 'Host5', pid: '1238', event_id: 'Event5', content: 'Log content 5' },
        { month: 'July', date: '04', time: '12:39:56', component: 'Component F', hostname: 'Host6', pid: '1239', event_id: 'Event6', content: 'Log content 6' },
        { month: 'July', date: '04', time: '12:40:56', component: 'Component G', hostname: 'Host7', pid: '1240', event_id: 'Event7', content: 'Log content 7' },
        { month: 'July', date: '04', time: '12:41:56', component: 'Component H', hostname: 'Host8', pid: '1241', event_id: 'Event8', content: 'Log content 8' },
        { month: 'July', date: '04', time: '12:42:56', component: 'Component I', hostname: 'Host9', pid: '1242', event_id: 'Event9', content: 'Log content 9' },
        { month: 'July', date: '04', time: '12:43:56', component: 'Component J', hostname: 'Host10', pid: '1243', event_id: 'Event10', content: 'Log content 10' },
        { month: 'July', date: '04', time: '12:44:56', component: 'Component K', hostname: 'Host11', pid: '1244', event_id: 'Event11', content: 'Log content 11' },
        { month: 'July', date: '04', time: '12:45:56', component: 'Component L', hostname: 'Host12', pid: '1245', event_id: 'Event12', content: 'Log content 12' },
    ];

    function renderTable() {
        const logTableBody = $('#leadList tbody');
        logTableBody.empty();

        logs.forEach((log, index) => {
            const row = `<tr class="single-item">
                <td>${log.month}</td>
                <td>${log.date}</td>
                <td>${log.time}</td>
                <td>${log.hostname}</td>
                <td>${log.component}</td>
                <td>${log.pid}</td>
                <td>${log.event_id}</td>
                <td class="text-end">
                    <button style="padding: 5px 10px; background-color: #007bff; color: #fff; border: none; border-radius: 5px; cursor: pointer;" onclick="showDetails(${index},this)">查看详情</button>
                </td>
            </tr>`;
            logTableBody.append(row);
        });
    }
    window.showDetails = function (index, button) {
        const log = logs[index];
        const detailRow = $(button).closest('tr').next('.detail-row');
        if (detailRow.length) {
            // 如果已经展示了详细内容，则移除
            detailRow.remove();
        } else {
            // 插入一个新的行来展示详细内容
            const detailContent = `<tr class="detail-row"><td colspan="8">${log.content}</td></tr>`;
            $(button).closest('tr').after(detailContent);
        }
    };

    renderTable();

}), $(document).ready(function () {
    $("#leadList").DataTable({
        pageLength: 10,
        lengthMenu: [10, 20, 50, 100, 200, 500]
    })
})