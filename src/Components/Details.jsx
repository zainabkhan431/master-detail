import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography, Avatar, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const customers = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
  { id: 3, name: "Alice Johnson", email: "alice@example.com" },
];

const orders = {
  1: [
    { id: 101, product: "Laptop", price: 1200, quantity: 1 },
    { id: 102, product: "Mouse", price: 50, quantity: 2 },
  ],
  2: [
    { id: 201, product: "Phone", price: 800, quantity: 1 },
    { id: 202, product: "Charger", price: 30, quantity: 1 },
  ],
  3: [
    { id: 301, product: "Tablet", price: 500, quantity: 1 },
    { id: 302, product: "Headphones", price: 100, quantity: 2 },
  ],
};

const dataGridStyles = {
  bgcolor: "#1F2937",
  color: "#E5E7EB",
  borderColor: "#374151",

  "& .MuiDataGrid-cell": {
    borderBottom: "0.5px solid #374151",
    color: "#E5E7EB",
    display: "flex", 
    alignItems: "center", // Ensures vertical centering inside all cells
  },

  "& .MuiDataGrid-columnHeaders": {
    color: "white",
    borderBottom: "0.5px solid #374151",
  },

  "& .MuiDataGrid-footerContainer": {
    backgroundColor: "#111827",
    color: "white",
    borderTop: "0.5px solid #374151",
    "& .MuiTablePagination-root, & .MuiTablePagination-caption, & .MuiSvgIcon-root": {
      color: "white",
    },
  },

  "& .MuiDataGrid-row": {
    borderBottom: "1px solid rgba(68, 65, 65, 0.2)", 
  },

  "& .MuiDataGrid-columnSeparator": {
    "& svg": { width: "0.3px" },
  },
};

const MasterDetail = () => {
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const handleRowSelection = (selection) => {
    setSelectedCustomer(selection[0] || null);
  };

  return (
    <Box
      sx={{
        p: 3,
        bgcolor: "#111827",
        minHeight: "100vh",
        borderRadius: 2,
      }}
    >
      <Typography variant="h5" color="white" gutterBottom>
        Customers Table
      </Typography>
      <DataGrid
        rows={customers}
        columns={[
          { field: "id", headerName: "ID", width: 90 },
          {
            field: "name",
            headerName: "Name",
            flex: 1,
            renderCell: (params) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center", // Ensures Avatar + Name are aligned vertically center
                  gap: 1, 
                }}
              >
                <Avatar sx={{ width: 32, height: 32 }} />
                <Typography sx={{ fontWeight: "bold", color: "#E5E7EB" }}>
                  {params.value}
                </Typography>
              </Box>
            ),
          },
          { field: "email", headerName: "Email", flex: 1 },
          {
            field: "actions",
            headerName: "Actions",
            width: 120,
            renderCell: () => (
              <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
                <IconButton sx={{ color: "#3B82F6" }}>
                  <EditIcon />
                </IconButton>
                <IconButton sx={{ color: "#EF4444" }}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            ),
          },
        ]}
        pageSize={3}
        onRowSelectionModelChange={handleRowSelection}
        sx={dataGridStyles}
      />

      <Typography variant="h5" color="white" sx={{ mt: 3 }} gutterBottom>
        Orders Table
      </Typography>
      <DataGrid
        rows={selectedCustomer ? orders[selectedCustomer] || [] : []}
        columns={[
          { field: "id", headerName: "Order ID", width: 100 },
          { field: "product", headerName: "Product", flex: 1 },
          { field: "price", headerName: "Price ($)", width: 120 },
          { field: "quantity", headerName: "Quantity", width: 120 },
        ]}
        pageSize={5}
        sx={dataGridStyles}
      />
    </Box>
  );
};

export default MasterDetail;
