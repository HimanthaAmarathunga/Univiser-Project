import jsPDF from "jspdf";
import "jspdf-autotable";

const generateDeliveryPDF = (deliveries) => {
    const document = new jsPDF();

    const tableColumn = [
        "title",
        "orderDate",
        "orderStatus",
        "deliveryDate",
        "paymentStatus",
        "address",
        "contactNo",
    ];
    const tableRows = [];
if(deliveries && deliveries.length > 0) {
    deliveries.forEach((delivery) => {
        const dataRow = [
            delivery.title,
            delivery.orderDate.slice(0,10),
            delivery.orderStatus,
            delivery.deliveryDate.slice(0,10),
            delivery.paymentStatus,
            delivery.address,
            delivery.contactNo,
        ];
        tableRows.push(dataRow);
    });
    document.autoTable(tableColumn, tableRows, { startY: 20 });
        const date = Date().split(" ");

        const dateStr =
        date[0] + date[1] + date[2] + date[3] + date[4] + date[5] + date[6];
        // ticket title. and margin-top + margin-left
        document.text("Detail Order Report", 14, 15);
        // we define the name of our PDF file.
        document.save(`report_${dateStr}.pdf`);
}

}

export default generateDeliveryPDF;