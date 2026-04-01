<script>
  import DataTable from "./DataTable.svelte";

  let {
    selectable = false,
    ...rest
  } = $props();

  const columns = [
    { key: 'name',  label: 'Name',  sortable: true },
    { key: 'role',  label: 'Role',  sortable: true, width: '140px' },
    { key: 'city',  label: 'City' },
  ];

  const rows = [
    { name: 'Alice Rossi',  role: 'Designer',   city: 'Rome' },
    { name: 'Bob Marini',   role: 'Developer',  city: 'Milan' },
    { name: 'Carol Ferri',  role: 'Manager',    city: 'Turin' },
    { name: 'Dave Esposito',role: 'Developer',  city: 'Naples' },
  ];

  let selectedRows = $state([]);
</script>

<DataTable
  {columns}
  {rows}
  {selectable}
  bind:selectedRows
  {...rest}
/>
