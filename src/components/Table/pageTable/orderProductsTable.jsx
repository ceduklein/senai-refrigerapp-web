import { Column } from "primereact/column";

import { Table } from "@/components/Table";

import { formatDate } from "@/utils/formatDate";

export function OrderProductTable(props) {

  const formatTableDate = (rowData) => {
    return formatDate(rowData.created_at);
  }

  return (
    <Table data={ props.data } globalFilterFields={ ['id', 'customer.name', 'created_at', 'user.name'] } >
      <Column field="order.id" header="Pedido" sortable />
      <Column field="created_at" body={formatTableDate} header="Data" sortable />
      <Column field="order.customer.name" header="Cliente" sortable />
      <Column field="product.name" header="Produto" sortable />
      <Column field="quantity" header="Quantidade" sortable />
      <Column field="order.user.name" header="Vendedor" sortable />
    </Table>
  )
}