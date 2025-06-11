import React, { useState, useEffect } from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import { collection, getDocs, deleteDoc, doc, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../Database/FirebaseConfig";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

import TablaVentas from "../Components/Ventas/TablaVentas";
import Paginacion from "../Components/Ordenamiento/Paginacion";
import RegistroVenta from "../Components/Ventas/RegistroVenta";
import EdicionVenta from "../Components/Ventas/EdicionVenta";
import EliminacionVenta from "../Components/Ventas/EliminacionVenta";
import CuadroBusquedas from "../Components/Busqueda/CuadroBusquedas";


const Ventas = () => {
  const [ventas, setVentas] = useState([]);
  const [showRegistroModal, setShowRegistroModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [ventaEditada, setVentaEditada] = useState(null);
  const [ventaAEliminar, setVentaAEliminar] = useState(null);

  const [searchText, setSearchText] = useState("");
  const [ventasFiltradas, setVentasFiltradas] = useState([]);


  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [negocioId, setNegocioId] = useState("");
  const [emprendedorId, setEmprendedorId] = useState("");

  const [productos, setProductos] = useState([]);

  const [idProducto, setIdProducto] = useState("");
  const [cantidad, setCantidad] = useState(1);
  const [itemsVenta, setItemsVenta] = useState([]);

  const productoSeleccionado = productos.find((p) => p.id === idProducto);
  const precio = productoSeleccionado ? productoSeleccionado.precio : 0;
  const subtotal = cantidad * precio;
  const total = itemsVenta.reduce((acc, item) => acc + item.subtotal, 0);

  const agregarProductoAVenta = () => {
    if (!idProducto || cantidad <= 0) {
      alert("Selecciona un producto y una cantidad válida.");
      return;
    }

    const yaExiste = itemsVenta.find((item) => item.id_producto === idProducto);
    if (yaExiste) {
      alert("Este producto ya ha sido agregado.");
      return;
    }

    const producto = {
      id_producto: idProducto,
      nombre: productoSeleccionado.nombre,
      precio: precio,
      cantidad: parseInt(cantidad),
      subtotal: parseFloat((cantidad * precio).toFixed(2)),
    };

    setItemsVenta([...itemsVenta, producto]);
    setIdProducto("");
    setCantidad(1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (itemsVenta.length < 1) {
      alert("Debes agregar al menos 1 producto antes de registrar la venta.");
      return;
    }

    const monto = itemsVenta.reduce((acc, item) => acc + item.subtotal, 0);

    handleAgregarVenta({
      productos: itemsVenta,
      monto,
      fecha: new Date().toISOString(),
    });

    setItemsVenta([]);
    setIdProducto("");
    setCantidad(1);
    setShowRegistroModal(false);
  };

    const fetchData = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) return;

        setEmprendedorId(user.uid);

        // Cargar negocios
        const negociosSnapshot = await getDocs(collection(db, "Negocio"));
        const negocios = negociosSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        const negocioDoc = negocios.find(n => n.id_emprendedor === user.uid);
        if (!negocioDoc) {
          console.warn("No se encontró un negocio para este usuario.");
          return;
        }

        const idNegocio = negocioDoc.id;
        setNegocioId(idNegocio);

        // Cargar productos
        const productosSnapshot = await getDocs(collection(db, "Producto"));
        const productosFiltrados = productosSnapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .filter(producto => producto.id_negocio === idNegocio);
        setProductos(productosFiltrados);

        // Cargar emprendedores
        const emprendedoresSnapshot = await getDocs(collection(db, "Emprendedor"));
        const emprendedores = emprendedoresSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        // Cargar ventas
        const ventasSnapshot = await getDocs(collection(db, "Venta"));
        const ventasData = ventasSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        // Unificar ventas con productos, negocios y emprendedores
        const ventasConInfo = ventasData.map(venta => {
          const producto = productosFiltrados.find(p => p.id === venta.id_producto);
          const negocio = negocios.find(n => n.id === venta.id_negocio);
          const emprendedor = emprendedores.find(e => e.id === venta.id_emprendedor);

          return {
            ...venta,
            nombre_producto: producto ? producto.nombre : "Producto no encontrado",
            precio_producto: producto ? producto.precio : 0,
            nombre_negocio: negocio ? negocio.nombre_negocio : "Negocio no encontrado",
            nombre_emprendedor: emprendedor
              ? `${emprendedor.nombres} ${emprendedor.apellidos}`
              : "Emprendedor no encontrado"
          };
        });

        setVentas(ventasConInfo);
        setVentasFiltradas(ventasConInfo);

      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    };


      useEffect(() => {
        fetchData();
      }, []);

      const handleDeleteVenta = async () => {
        if (!ventaAEliminar) return;
        try {
          await deleteDoc(doc(db, "Venta", ventaAEliminar.id));
          setShowDeleteModal(false);
          fetchData();
        } catch (error) {
          console.error("Error eliminando venta:", error);
        }
      };

       const openEditModal = (venta) => {
        setVentaEditada(venta);
        setShowEditModal(true);
      };

      const openDeleteModal = (venta) => {
        setVentaAEliminar(venta);
        setShowDeleteModal(true);
      };

      const handleAgregarVenta = async (nuevaVenta) => {
        try {
          for (const item of nuevaVenta.productos) {
            await addDoc(collection(db, "Venta"), {
              id_negocio: negocioId,
              id_emprendedor: emprendedorId,
              id_producto: item.id_producto,
              nombre_producto: item.nombre,
              precio_producto: item.precio,
              cantidad: item.cantidad,
              subtotal: item.subtotal,
              fecha: nuevaVenta.fecha,
            });
          }

          fetchData();
        } catch (error) {
          console.error("Error al registrar venta manual:", error);
        }
      };

      const handleSearchChange = (e) => {
      const text = e.target.value.toLowerCase();
      setSearchText(text);

      const filtradas = ventas.filter((venta) =>
        venta.nombre_producto?.toLowerCase().includes(text) ||
        venta.precio_producto?.toString().includes(text) ||
        venta.cantidad?.toString().includes(text) ||
        venta.subtotal?.toString().includes(text) ||
        venta.fecha?.toLowerCase().includes(text)
      );

      setVentasFiltradas(filtradas);
    };

    const handleCopyVenta = (venta) => {
    const rowData = `Producto: ${venta.nombre_producto}\nPrecio: C$${venta.precio_producto}\nCantidad: ${venta.cantidad}\nSubtotal: C$${venta.subtotal}\nFecha: ${venta.fecha}`;
    navigator.clipboard
      .writeText(rowData)
      .then(() => {
        console.log("Datos de venta copiados al portapapeles:\n" + rowData);
      })
      .catch((err) => {
        console.error("Error al copiar al portapapeles:", err);
      });
  };

      const generarPDFVentas = () => {
      const doc = new jsPDF();

      // Encabezado con fondo gradiente (simulado con color sólido azul)
      doc.setFillColor(9, 132, 227); // #0984E3
      doc.rect(0, 0, 220, 30, "F");

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(26);
      doc.text("Reporte de Ventas", doc.internal.pageSize.getWidth() / 2, 18, { align: "center" });

      const columnas = ["#", "Producto", "Precio", "Cantidad", "Subtotal", "Fecha"];
      const filas = ventasFiltradas.map((venta, index) => [
        index + 1,
        venta.nombre_producto,
        `C$ ${venta.precio_producto}`,
        venta.cantidad,
        `C$ ${venta.subtotal}`,
        venta.fecha.substring(0, 10)
      ]);

      const totalPaginas = "{total_pages_count_string}";

      autoTable(doc, {
        head: [columnas],
        body: filas,
        startY: 40,
        theme: "grid",
        headStyles: {
          fillColor: [9, 132, 227], // Azul cabecera
          textColor: 255,
          fontStyle: 'bold',
          halign: 'center'
        },
        bodyStyles: {
          textColor: [0, 0, 0],
          fontSize: 10,
          halign: 'center'
        },
        alternateRowStyles: {
          fillColor: [240, 248, 255] // un azul clarito para filas alternas
        },
        margin: { top: 20, left: 14, right: 14 },
        tableWidth: "auto",
        didDrawPage: function (data) {
          const alturaPagina = doc.internal.pageSize.getHeight();
          const anchoPagina = doc.internal.pageSize.getWidth();
          const numeroPagina = doc.internal.getNumberOfPages();
          doc.setFontSize(10);
          doc.setTextColor(100);
          const piePagina = `Página ${numeroPagina} de ${totalPaginas}`;
          doc.text(piePagina, anchoPagina / 2, alturaPagina - 10, { align: "center" });
        }
      });

      if (typeof doc.putTotalPages === 'function') {
        doc.putTotalPages(totalPaginas);
      }

      const fecha = new Date();
      const dia = String(fecha.getDate()).padStart(2, '0');
      const mes = String(fecha.getMonth() + 1).padStart(2, '0');
      const anio = fecha.getFullYear();
      const nombreArchivo = `ventas_${dia}${mes}${anio}.pdf`;

      doc.save(nombreArchivo);
    };

    const generarPDFDetalleVenta = (venta) => {
      const pdf = new jsPDF();

      // Encabezado con fondo gradiente simulado
      pdf.setFillColor(9, 132, 227); // #0984E3
      pdf.rect(0, 0, 220, 30, 'F');

      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(22);
      pdf.text("Detalle de Venta", pdf.internal.pageSize.getWidth() / 2, 18, { align: "center" });

      pdf.setTextColor(0, 0, 0);
      pdf.setFontSize(14);

      const detalles = [
        `Producto: ${venta.nombre_producto}`,
        `Precio Unitario: C$ ${venta.precio_producto}`,
        `Cantidad: ${venta.cantidad}`,
        `Subtotal: C$ ${venta.subtotal}`,
        `Fecha: ${venta.fecha.substring(0, 10)}`,
      ];

      let y = 50;
      detalles.forEach(texto => {
        pdf.text(texto, 20, y);
        y += 12;
      });

      pdf.save(`venta_${venta.id}.pdf`);
    };

      const exportarExcelVentas = () => {
      const datos = ventasFiltradas.map((venta, index) => ({
        "#": index + 1,
        Producto: venta.nombre_producto,
        Precio: parseFloat(venta.precio_producto),
        Cantidad: venta.cantidad,
        Subtotal: parseFloat(venta.subtotal),
        Fecha: venta.fecha.substring(0, 10)
      }));

      const hoja = XLSX.utils.json_to_sheet(datos);
      const libro = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(libro, hoja, 'Ventas');

      const excelBuffer = XLSX.write(libro, { bookType: 'xlsx', type: 'array' });

      const fecha = new Date();
      const dia = String(fecha.getDate()).padStart(2, '0');
      const mes = String(fecha.getMonth() + 1).padStart(2, '0');
      const anio = fecha.getFullYear();
      const nombreArchivo = `Ventas_${dia}${mes}${anio}.xlsx`;

      const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
      saveAs(blob, nombreArchivo);
    };

  return (
    <Container className="mt-5">
      <br />
      <h4>Gestión de Ventas</h4>
      <Row>
        <Col lg={2} md={2} sm={2} xs={3}>
          <Button className="mb-3" onClick={() => setShowRegistroModal(true)} style={{ width: "100%" }}>
            <i className="bi bi-plus-circle me-2"></i>
            Agregar
          </Button>
        </Col>
       <Col lg={3} md={4} sm={4} xs={5}>
        <Button
        className="mb-3"
        onClick={generarPDFVentas}
        variant="secondary"
        style={{ width: "100%" }}
        >
          Generar reporte PDF
        </Button>
        </Col>
        <Col lg={3} md={4} sm={4} xs={5}>
        <Button
        className="mb-3"
        variant="success"
        onClick={exportarExcelVentas}
        style={{ width: "100%" }}
      >
          Generar Excel
          </Button>
        </Col>
        <Col lg={3} md={3} sm={3} xs={5}>
          <CuadroBusquedas
            searchText={searchText}
            handleSearchChange={handleSearchChange}
          />
        </Col>
      </Row>

      <TablaVentas
        ventas={ventasFiltradas}
        openEditModal={openEditModal}
        openDeleteModal={openDeleteModal}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        setCurrentPage={setCurrentPage}
        totalItems={ventasFiltradas.length}
        handleCopyVenta={handleCopyVenta} 
        generarPDFDetalleVenta={generarPDFDetalleVenta}
      />

      <Paginacion
        itemsPerPage={itemsPerPage}
        totalItems={ventasFiltradas.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />


       <RegistroVenta
        show={showRegistroModal}
        onHide={() => setShowRegistroModal(false)}
        idProducto={idProducto}
        setIdProducto={setIdProducto}
        cantidad={cantidad}
        setCantidad={setCantidad}
        itemsVenta={itemsVenta}
        agregarProductoAVenta={agregarProductoAVenta}
        handleSubmit={handleSubmit}
        productos={productos}
        total={total}
      />

      <EdicionVenta
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        venta={ventaEditada}
        onVentaEditada={fetchData}
      />

      <EliminacionVenta
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        handleDeleteVenta={handleDeleteVenta}
      />
    </Container>
  );
};

export default Ventas;
