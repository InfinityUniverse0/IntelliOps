"use strict";

$(document).ready(function () {

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