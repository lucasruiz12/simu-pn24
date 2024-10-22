const divButtons = document.getElementById("btn-div");
divButtons.style.display = "flex";
divButtons.style.justifyContent = "space-between";


let partidos = [];

function simularResultado() {
    const resultados = [3, 1, 0];
    return resultados[Math.floor(Math.random() * resultados.length)];
};

function simularFechas(tabla) {
    const puntosActualizados = {};
    const partidosJugados = new Set();
    partidos = [];

    tabla.forEach(equipo => puntosActualizados[equipo.nombre] = equipo.puntos);

    tabla.forEach(equipo => {
        equipo.rivales.forEach(rivalRaw => {
            const rivalNombre = rivalRaw.split("(")[0].trim();
            const partidoId = [equipo.nombre, rivalNombre].sort().join("-");

            if (!partidosJugados.has(partidoId)) {
                partidosJugados.add(partidoId);

                const resultadoEquipo = simularResultado();
                const resultadoRival = simularResultado();

                if (resultadoEquipo > resultadoRival) {
                    partidos.push({equipo: equipo.nombre, resultado: "O", rival: rivalNombre})
                    puntosActualizados[equipo.nombre] += 3;
                } else if (resultadoEquipo < resultadoRival) {
                    partidos.push({equipo: equipo.nombre, resultado: "X", rival: rivalNombre})
                    puntosActualizados[rivalNombre] += 3;
                } else {
                    partidos.push({equipo: equipo.nombre, resultado: "-", rival: rivalNombre})
                    puntosActualizados[equipo.nombre] += 1;
                    puntosActualizados[rivalNombre] += 1;
                };
            } else {
                const partidoRepetido = partidos.find(el => (el.equipo === partidoId.split("-")[0] && el.rival === partidoId.split("-")[1]) || (partidoId.split("-")[1] && el.rival === partidoId.split("-")[0]) );
                
                const resultadoInvertido = (resultado) => {
                    switch (resultado) {
                        case "O":
                            return "X"
                        case "X":
                            return "O"
                        default:
                            return "-"
                    };
                };
                
                partidos.push({equipo: partidoRepetido.rival, resultado: resultadoInvertido(partidoRepetido.resultado), rival: partidoRepetido.equipo})
            };
        });
    });

    const nuevaTabla = tabla.map(equipo => ({
        nombre: equipo.nombre,
        puntos: puntosActualizados[equipo.nombre],
    }));

    nuevaTabla.sort((a, b) => b.puntos - a.puntos);

    renderTabla(nuevaTabla);
    generarTablaResultados(partidos);
};

const botonSimulacion = document.createElement("button");
botonSimulacion.innerText = "Simular";
botonSimulacion.addEventListener("click", () => simularFechas(tabla));
divButtons.append(botonSimulacion);

const botonReset = document.createElement("button");
botonReset.innerText = "Resetear tabla";
botonReset.addEventListener("click", () => renderTabla(tabla));
divButtons.append(botonReset);

const botonProbabilidadFuera = document.createElement("button");
botonProbabilidadFuera.innerText = "Simular 100.000 veces";
botonProbabilidadFuera.addEventListener("click", () => calcularProbabilidadGimnasia(tabla));
divButtons.append(botonProbabilidadFuera);

renderTabla(tabla);