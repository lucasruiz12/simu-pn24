function renderTabla(tabla) {
    const tablaExistente = document.querySelector("#tabla-simulada");
    if (tablaExistente) tablaExistente.remove();

    const resultadosExistentes = document.querySelector("#resultados-simulados");
    if (resultadosExistentes) resultadosExistentes.remove();

    const table = document.createElement("table");
    table.id = "tabla-simulada";
    table.style.borderCollapse = "collapse";
    table.style.width = "100%";
    table.style.margin = "20px auto";
    table.style.textAlign = "center";

    const header = table.createTHead();
    const headerRow = header.insertRow();

    const headers = ["Posición", "Equipo", "Puntos"];
    headers.forEach(texto => {
        const th = document.createElement("th");
        th.innerText = texto;
        th.style.border = "1px solid black";
        th.style.padding = "10px";
        th.style.backgroundColor = "#f0f0f0";
        headerRow.appendChild(th);
    });

    const body = table.createTBody();
    tabla.forEach((equipo, index) => {
        const row = body.insertRow();

        const posicionCell = row.insertCell();
        posicionCell.innerText = index + 3;
        posicionCell.style.border = "1px solid black";
        posicionCell.style.padding = "10px";


        const nombreCell = row.insertCell();
        nombreCell.innerText = equipo.nombre;
        nombreCell.style.border = "1px solid black";
        nombreCell.style.padding = "10px";

        const puntosCell = row.insertCell();
        puntosCell.innerText = equipo.puntos;
        puntosCell.style.border = "1px solid black";
        puntosCell.style.padding = "10px";

        if (index < 6) {
            posicionCell.style.backgroundColor = "#f5f374"
            nombreCell.style.backgroundColor = "#f5f374"
            puntosCell.style.backgroundColor = "#f5f374"
        };

        if (equipo.nombre === "Gimnasia") {
            nombreCell.style.backgroundColor = "#9acc85"
            puntosCell.style.backgroundColor = "#9acc85"
        };

    });

    document.body.appendChild(table);
};

function generarTablaResultados(partidos) {
    const tablaExistente = document.querySelector("#resultados-simulados");
    if (tablaExistente) tablaExistente.remove();

    const resultadosPorEquipo = {};

    partidos.forEach(({ equipo, resultado, rival }) => {
        if (!resultadosPorEquipo[equipo]) {
            resultadosPorEquipo[equipo] = [];
        }
        resultadosPorEquipo[equipo].push({ resultado, rival });
    });

    const tabla = document.createElement("table");
    tabla.id = "resultados-simulados";
    tabla.style.borderCollapse = "collapse";
    tabla.style.width = "100%";
    tabla.style.margin = "20px auto";
    tabla.style.textAlign = "center";

    const header = tabla.createTHead();
    const headerRow = header.insertRow();

    const headers = ["Equipo", "F37", "F38"];
    headers.forEach(texto => {
        const th = document.createElement("th");
        th.innerText = texto;
        th.style.border = "1px solid black";
        th.style.padding = "10px";
        th.style.backgroundColor = "#f0f0f0";
        headerRow.appendChild(th);
    });

    for (const [equipo, rivales] of Object.entries(resultadosPorEquipo)) {
        const row = tabla.insertRow();

        const equipoCell = row.insertCell();
        equipoCell.innerText = equipo;
        equipoCell.style.border = "1px solid black";
        equipoCell.style.padding = "10px";

        rivales.forEach(({ resultado, rival }) => {
            const rivalCell = row.insertCell();
            rivalCell.innerText = `${rival}`;
            rivalCell.style.border = "1px solid black";
            rivalCell.style.padding = "10px";

            if (resultado === "O") {
                rivalCell.style.backgroundColor = "green";
            } else if (resultado === "-") {
                rivalCell.style.backgroundColor = "darkgrey";
            } else if (resultado === "X") {
                rivalCell.style.backgroundColor = "red";
            };
        });
    }

    document.body.appendChild(tabla);
}