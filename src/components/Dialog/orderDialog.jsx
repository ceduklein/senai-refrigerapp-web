import { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { HiOutlineClipboardList } from 'react-icons/hi';
import { FiTrash2, FiXCircle } from "react-icons/fi";
import { deleteOrderItem, getOrderItemsByOrder } from "@/services/resources/orderResource";


export function OrderDialog(props) {
  const { showDialog, closeDialog, data, order, user } = props;
  const [itemsList, setItemsList] = useState(data);

  useEffect(() => {
    if(data) {
      setItemsList(data);
    }
  },[data]);

  const formatCurrency = (rowData) => {
    return rowData.totalItem.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});
  }

  const formatCurrencyOrder = (total) => {
    return total.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});
  }

  const dialogHeader = () => {
    return(
      <span style={{ cursor: 'default' }}>
        <HiOutlineClipboardList size={30} color={'#3459E6'} style={{margin: '-3px 20px 0 0'}} />
        {`Pedido ${order.id} - ${order.customer.name}`}
      </span>
    )
  }

  const dialogFooter = () => {
    return(
      <div>
        <span style={{fontWeight:'bold', marginRight: '5px'}}>
          {`Total: ${formatCurrencyOrder(order.total)}`}
        </span> <br/>
        <button type="button" className="btn btn-danger" onClick={ closeDialog }>
          <FiXCircle size={16} style={{marginTop:'-2px'}}/> Fechar
        </button>
      </div>
    )
  }

  const actionButtons = (rowData) => {
    return(
      <button type='button' className="btn btn-danger" disabled={!user.admin}
        style={{marginTop: '-5px', padding: '5px'}}
        title="excluir" onClick={e => onClickDelete(rowData)} >
        <FiTrash2 size={18}/>
      </button>
    )
  }

  const onClickDelete = async(rowData) => {
    await deleteOrderItem(rowData.id);
    setItemsList(await getOrderItemsByOrder(order.id));
  }

  return(
    <Dialog header={ dialogHeader } visible={ showDialog } style={{ width: '40vw' }} 
    onHide={ closeDialog } footer={ dialogFooter }  >
      <DataTable value={ itemsList }>
        <Column field="product.name" header="Produto" />
        <Column field="quantity" header="Quantitade" />
        <Column field="totalItem" body={ formatCurrency } header="Total Item" />
        <Column field="actions" body={actionButtons} header="Ações" />
      </DataTable>
    </Dialog>
  )
}