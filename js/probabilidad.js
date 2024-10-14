function simularResultado() {
    const resultados = [3, 1, 0];
    return resultados[Math.floor(Math.random() * resultados.length)];
};

function simularTabla(tabla) {
    const puntosActualizados = {};
    const partidosJugados = new Set();

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
                    puntosActualizados[equipo.nombre] += 3;
                } else if (resultadoEquipo < resultadoRival) {
                    puntosActualizados[rivalNombre] += 3;
                } else {
                    puntosActualizados[equipo.nombre] += 1;
                    puntosActualizados[rivalNombre] += 1;
                };
            };
        });
    });

    const nuevaTabla = tabla.map(equipo => ({
        nombre: equipo.nombre,
        puntos: puntosActualizados[equipo.nombre],
    }));

    nuevaTabla.sort((a, b) => b.puntos - a.puntos);
    return nuevaTabla;
};

function calcularProbabilidadGimnasia(tabla, simulaciones = 100000) {

    let contadorUltimosPuestos = 0;
    let contadorPrimerosPuestos = 0;

    for (let i = 0; i < simulaciones; i++) {
        const tablaSimulada = simularTabla(tabla);
        const posicionGimnasia = tablaSimulada.findIndex(equipo => equipo.nombre === "Gimnasia");

        if (posicionGimnasia >= tablaSimulada.length - 1) {
            contadorUltimosPuestos++;
        };

        if (posicionGimnasia === 0 || posicionGimnasia === 1) {
            contadorPrimerosPuestos++;
        };
    };

    const probabilidadUltimo = (contadorUltimosPuestos / simulaciones) * 100;
    const probabilidadArriba = (contadorPrimerosPuestos / simulaciones) * 100;
    const mensaje = (`Sobre ${simulaciones} simulaciones realizadas, Gimnasia quedó último en ${contadorUltimosPuestos} de ellas.
Esto da un porcentaje del : ${probabilidadUltimo.toFixed(3)}% de quedar fuera del reducido

Sobre ${simulaciones} simulaciones realizadas, Gimnasia quedó 3ro o 4to en ${contadorPrimerosPuestos} de ellas.
Esto da un porcentaje del : ${probabilidadArriba.toFixed(3)}% de quedar 3ros o 4tos`);
    alert(mensaje);
};