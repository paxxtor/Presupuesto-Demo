const ingresos = [
  new Ingreso("Salario", 2100.0),
  new Ingreso("Venta coche", 1500),
];

const egresos = [
  new Egreso("Renta Departamento", 900),
  new Egreso("Ropa", 400),
];

let cargarApp = () => {
  cargarCabecero();
  cargarIngresos();
  cargarEgresos();
};

let totalIngresos = () => {
  let totalIngreso = 0;
  for (let ingreso of ingresos) {
    totalIngreso += ingreso.Valor;
  }
  return totalIngreso;
};

let totalEgresos = () => {
  let totalEgreso = 0;
  for (let egreso of egresos) {
    totalEgreso += egreso.Valor;
  }
  return totalEgreso;
};

let cargarCabecero = () => {
  let presupuesto = totalIngresos() - totalEgresos();
  let porcentajeEgreso = totalEgresos() / totalIngresos();
  if (presupuesto > 0)
    document.getElementById("presupuesto").innerHTML =
      "+" + formatoMoneda(presupuesto);
  else document.getElementById("presupuesto").innerHTML = presupuesto;
  document.getElementById("porcentaje").innerHTML =
    formatoPorcentaje(porcentajeEgreso);
  document.getElementById("ingresos").innerHTML = formatoMoneda(
    totalIngresos()
  );
  document.getElementById("egresos").innerHTML = formatoMoneda(totalEgresos());
};

const formatoMoneda = (valor) => {
  return valor.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });
};

const formatoPorcentaje = (valor) => {
  return valor.toLocaleString("en-US", {
    style: "percent",
    minimumFractionDigits: 1,
  });
};

const cargarIngresos = () => {
  let ingresosHTML = "";
  for (let ingreso of ingresos) {
    ingresosHTML += crearIngresoHTML(ingreso);
  }
  document.getElementById("lista-ingresos").innerHTML = ingresosHTML;
};

const cargarEgresos = () => {
  let egresosHTML = "";
  for (let egreso of egresos) {
    egresosHTML += crearEgresosHTML(egreso);
  }
  document.getElementById("lista-egresos").innerHTML = egresosHTML;
};

const eliminarIngreso =(id)=>{
  let indiceEliminar = ingresos.findIndex(Ingreso => Ingreso.ID === id);
  ingresos.splice(indiceEliminar,1);
  cargarCabecero();
  cargarIngresos();
};

const crearIngresoHTML = (ingreso) => {
  let ingresoHTML = `<div class="elemento limpiarEstilos">
  <div class="elemento_descripcion">${ingreso.Descripcion}</div>
  <div class="derecha limpiarEstilos">
    <div class="elemento_valor">+${formatoMoneda(ingreso.Valor)}</div>
    <div class="elemento_eliminar">
      <button class="elemento_eliminar--btn" >
          <ion-icon name="close-circle-outline" onclick='eliminarIngreso(${ingreso.ID})'> </ion-icon>
      </button>
    </div>
  </div>
</div>`;
  return ingresoHTML;
};

const crearEgresosHTML = (egreso) => {
  let egresosHTML = `<div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${egreso.Descripcion}</div>
    <div class="derecha limpiarEstilos">
        <div class="elemento_valor">-${egreso.Valor}</div>
        <div class="elemento_porcentaje">${formatoPorcentaje(egreso.Valor / totalEgresos())}</div>
        <div class="elemento_eliminar">
            <button class="elemento_eliminar--btn">
        <ion-icon name="close-circle-outline"></ion-icon>
            </button>
        </div>
    </div>
</div>`;
  return egresosHTML;
};
