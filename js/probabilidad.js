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

    nuevaTabla.sort((a, b) => {
      if (b.puntos !== a.puntos) {
        return b.puntos - a.puntos;
      } else {
          if (a.nombre === "Gimnasia") return 1;
          if (b.nombre === "Gimnasia") return -1;
      };
    };
    return nuevaTabla;
};

function calcularProbabilidadGimnasia(tabla, simulaciones = 100000) {

    let contadorQuinto = 0;
    let contadorCuarto = 0;
    let contadorTercero = 0;

    for (let i = 0; i < simulaciones; i++) {
        const tablaSimulada = simularTabla(tabla);
        const posicionGimnasia = tablaSimulada.findIndex(equipo => equipo.nombre === "Gimnasia");

        if(posicionGimnasia === 0){
            contadorTercero++;
        } else if(posicionGimnasia === 1){
            contadorCuarto++;
        } else {
            contadorQuinto++;
        }

    };

    const probabilidadQuinto = (contadorQuinto / simulaciones) * 100;
    const probabilidadCuarto = (contadorCuarto / simulaciones) * 100;
    const probabilidadTercero = (contadorTercero / simulaciones) * 100;
    const mensaje = (`Sobre ${simulaciones} simulaciones realizadas, Gimnasia quedó tercero en ${contadorTercero} de ellas, cuarto en ${contadorCuarto} de ellas y quinto en ${contadorQuinto} de ellas.
Esto da un porcentaje del ${probabilidadTercero.toFixed(3)}%, ${probabilidadCuarto.toFixed(3)}% y ${probabilidadQuinto.toFixed(3)}% respectivamente`);
    alert(mensaje);
};
