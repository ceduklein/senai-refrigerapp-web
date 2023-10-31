import { useState } from "react";
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { FilterMatchMode } from 'primereact/api';
import { FaSearch, FaUserPlus } from 'react-icons/fa';
import { Button } from "primereact/button";

export function Table(props) {
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [filters, setFilters] = useState({
    'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const renderHeader = () => {
    return(
      <div className="flex justify-content-end">
        <span className="p-input-icon-left">
          <FaSearch />
          <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Buscar" />
        </span>
      </div>
    )
  }

  const [selectRow, setSelectedRow] = useState(null);

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;

    let _filters = { ...filters };
    _filters['global'].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  }

  const header = renderHeader();
  
  return(
    <DataTable value={props.data} header={header} dataKey="id"
      className="p-datatable-sm p-datatable-striped"
      paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
      currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
      columnResizeMode="fit"
      removableSort
      resizableColumns
      filterDisplay="row" filters={filters}
      globalFilterFields={props.globalFiltersFields}
      selection={selectRow} 
      onSelectionChange={(e) => setSelectedRow(e.value)} selectionMode="single"
      paginator rows={10} rowsPerPageOptions={[10,20,30,40,50]}>

        {props.children}

    </DataTable>
  )
}