import React, { useState, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
import Icon from "@mui/material/Icon";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import MDSnackbar from "components/MDSnackbar";
import MDInput from "components/MDInput";
import Switch from "@mui/material/Switch";
import MDTypography from "components/MDTypography";

export default function Table({ entity, colDefs, fields }) {
  const [gridApi, setGridApi] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [action, setAction] = useState("create");
  const [item, setItem] = useState({});

  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarColor, setSnackbarColor] = useState("success");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const openSnackbar = (message, color = "success") => {
    setSnackbarMessage(message);
    setSnackbarColor(color);
    setSnackbarOpen(true);
  };

  const closeSnackbar = () => setSnackbarOpen(false);

  const getSelectedItem = () => {
    const selectedItem = gridApi.api.getSelectedRows();
    if (selectedItem.length === 0) {
      openSnackbar("Выберите поле", "error");
      return;
    }
    return selectedItem[0];
  };

  const handleCreateItem = async () => {
    console.log(item);
    const response = await fetch(`http://localhost:8080/api/${entity}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    const data = await response.json();
    if (response.status === 200) {
      gridApi.api.refreshInfiniteCache();
      openSnackbar(entity + " успешно добавлен");
      setOpenMenu(false);
    } else {
      openSnackbar(data.message, "error");
    }
  };

  const handleDeleteItem = async () => {
    const selectedItem = getSelectedItem();
    if (!selectedItem) return;
    const response = await fetch(`http://localhost:8080/api/${entity}/${selectedItem.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (response.status === 200) {
      gridApi.api.refreshInfiniteCache();
      openSnackbar(entity + " удален");
      setOpenMenu(false);
    } else {
      openSnackbar(data.message, "error");
    }
  };

  const handleEditItem = async () => {
    const { id, ..._item } = item;
    const response = await fetch(`http://localhost:8080/api/${entity}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: _item }),
    });
    const data = await response.json();
    if (response.status === 200) {
      gridApi.api.refreshInfiniteCache();
      openSnackbar(entity + " изменен");
      setOpenMenu(false);
    } else {
      openSnackbar(data.message, "error");
    }
  };

  const handleOpenMenu = (action) => {
    setAction(action);
    if (action === "create") {  
      setItem(fields.reduce((acc, field) => ({ ...acc, [field.name]: field.type === "boolean" ? field.default || false : field.default || "" }), {}));
    } else if (action === "edit") {
      const selectedItem = getSelectedItem();
      if (!selectedItem) return;
      setItem(selectedItem);
    }
    setOpenMenu(true);
  };

  const getRowId = useCallback((params) => params.data.id, []);

  const datasource = {
    getRows(params) {
      const { startRow, endRow } = params;
      let url = `http://localhost:8080/api/${entity}?offset=${startRow}&limit=${endRow}`;
      fetch(url)
        .then((httpResponse) => httpResponse.json())
        .then((response) => {
          params.successCallback(response, 499);
        })
        .catch((error) => {
          console.error(error);
          params.failCallback();
        });
    },
  };

  const onGridReady = (params) => {
    setGridApi(params);
    params.api.setGridOption("datasource", datasource);
  };

  return (
    <>
      <MDSnackbar
        color={snackbarColor}
        title="Оповещение"
        content={snackbarMessage}
        open={snackbarOpen}
        onClose={closeSnackbar}
        close={closeSnackbar}
        bgWhite
      />
      <Modal
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          height: "fit-content",
          transform: "translate(-50%, -50%)",
          width: "fit-content",
          boxShadow: 24,
          p: 4,
          borderRadius: "4px",
        }}
        style={{ background: "#fff" }}
        open={openMenu}
        BackdropProps={{
          sx: {
            background: "#fff",
            borderRadius: 4,
          },
        }}
        onClose={() => setOpenMenu(false)}
      >
        <MDBox
          component="form"
          role="form"
          sx={{ width: "100%", background: "#fff" }}
          style={{ background: "#fff" }}
        >
          {fields.map((field) => (
            <MDBox mb={2} key={field.name}>
              {field.type !== "boolean" ? (
                <MDInput
                  type={field.type || "text"}
                  label={field.label}
                  value={item[field.name] || ""}
                  fullWidth
                  onChange={(e) => setItem({ ...item, [field.name]: e.target.value })}
                />
              ) : (
                <MDBox display="flex" alignItems="center" ml={-1}>
                  <Switch
                    checked={item[field.name] === '' ? field.default : item[field.name]}
                    onChange={() => (console.log(item),
                      setItem({
                        ...item,
                        [field.name]: !item[field.name],
                      }))
                    }
                  />
                  <MDTypography
                    variant="button"
                    fontWeight="regular"
                    sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
                  >
                    &nbsp;&nbsp;Доступен
                  </MDTypography>
                </MDBox>
              )}
            </MDBox>
          ))}

          <MDBox mb={2}>
            <MDButton
              fullWidth
              variant="gradient"
              color="dark"
              onClick={action === "edit" ? handleEditItem : handleCreateItem}
            >
              <Icon sx={{ fontWeight: "bold" }}>{action === "edit" ? "edit" : "add"}</Icon>
              &nbsp;{action === "edit" ? "Редактировать" : "Добавить"}
            </MDButton>
          </MDBox>
        </MDBox>
      </Modal>
      <MDBox>
        <MDBox sx={{ mb: 4 }}>
          <MDButton variant="gradient" color="success" onClick={() => handleOpenMenu("create")}>
            <Icon sx={{ fontWeight: "bold" }}>create</Icon>
            &nbsp;Добавить
          </MDButton>
          <MDButton
            sx={{ mr: 2, ml: 2 }}
            variant="gradient"
            color="warning"
            onClick={() => handleOpenMenu("edit")}
          >
            <Icon sx={{ fontWeight: "bold" }}>edit</Icon>
            &nbsp;Редактировать
          </MDButton>
          <MDButton variant="gradient" color="error" onClick={() => handleDeleteItem()}>
            <Icon sx={{ fontWeight: "bold" }}>delete</Icon>
            &nbsp;Удалить
          </MDButton>
        </MDBox>
        <div className="ag-theme-quartz" style={{ width: "100%", height: 400 }}>
          <AgGridReact
            columnDefs={colDefs}
            rowModelType={"infinite"}
            rowSelection={{ mode: "singleRow" }}
            cacheBlockSize={100}
            getRowId={getRowId}
            onGridReady={onGridReady}
            pagination={true}
            paginationPageSizeSelector={[5, 10, 25]}
          />
        </div>
      </MDBox>
    </>
  );
}
