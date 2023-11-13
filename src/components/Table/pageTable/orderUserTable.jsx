import { Column } from "primereact/column";

import { Table } from "@/components/Table";

import { formatDate } from "@/utils/formatDate";

export function OrderUserTable(props) {

  const formatTableDate = (rowData) => {
    return formatDate(rowData.created_at);
  }

  const formatCurrency = (rowData) => {
    return rowData.total.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});
  }

  return (
    <Table data={ props.data } globalFilterFields={ ['id', 'user.name', 'created_at'] } >
      <Column field="id" header="Pedido" sortable />
      <Column field="created_at" body={formatTableDate} header="Data" sortable />
      <Column field="user.name" header="Vendedor" sortable />
      <Column field="total" body={formatCurrency} header="Valor" sortable />
    </Table>
  )
}