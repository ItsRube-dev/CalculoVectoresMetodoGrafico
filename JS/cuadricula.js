//Proceso de datos
const botonEnviar= document.getElementById("enviar");

function calcular_vectores(vect_Ax,vect_Ay,vect_Bx,vect_By){

    resultanteX=vect_Ax+vect_Bx;
    resultanteY=vect_Ay+vect_By;

    resultante=((resultanteX**2)+(resultanteY**2))**(1/2);

    return {x : resultanteX, y : resultanteY, r : resultante};

}

function comparador_componentes(cantidad1,cantidad2,cantidad3){

    if(cantidad1>cantidad2 && cantidad1>cantidad3){
        return [ true, false,false];
    }else if(cantidad2>cantidad1 && cantidad2>cantidad3){
        return [false, true, false];
    }else if(cantidad3>cantidad2 && cantidad3>cantidad1){
        return [false,false,true];
    }else {
        return [false, false, false];
    }

}

function determinacion_eje_negativo(cantidad) {
    return Math.min(0, ...cantidad);
}

botonEnviar.addEventListener("click",enviar_datos);
function enviar_datos() {
    let ejeXpositivo_cuadricula = 0;   
    let ejeYpositivo_cuadricula = 0;

    const vectorAx_input=document.getElementById("vectorA_x");
    const vectorAy_input=document.getElementById("vectorA_y");
    const vectorBx_input=document.getElementById("vectorB_x");
    const vectorBy_input=document.getElementById("vectorB_y");

    let vectorAx=vectorAx_input.value;
    let vectorAy=vectorAy_input.value;
    let vectorBx=vectorBx_input.value;
    let vectorBy=vectorBy_input.value;

    vectorAx=Number(vectorAx);
    vectorAy=Number(vectorAy);
    vectorBx=Number(vectorBx);
    vectorBy=Number(vectorBy);

    let resultante=calcular_vectores(vectorAx,vectorAy,vectorBx,vectorBy);

    comparacionXpositiva=comparador_componentes(resultante.x,vectorAx,vectorBx);
    comparacionYpositiva=comparador_componentes(resultante.y,vectorAy,vectorBy);
    let valoresX=[resultante.x,vectorAx,vectorBx];
    let valoresY=[resultante.y,vectorAy,vectorBy];

    ejeXnegativo_cuadricula=determinacion_eje_negativo(valoresX);
    ejeYnegativo_cuadricula=determinacion_eje_negativo(valoresY);

 
    
    
    
   
    
    ejeXpositivo_cuadricula;
    comparacionXpositiva.forEach((dato,i) => {
        if(dato){
           ejeXpositivo_cuadricula += (valoresX[i] + ejeXnegativo_cuadricula * -1) * 100;
        }
        
    });

    ejeYpositivo_cuadricula;
    comparacionYpositiva.forEach((dato,i) => {
        if(dato){
           ejeYpositivo_cuadricula += (valoresY[i] + ejeYnegativo_cuadricula * -1) * 100;
        }
        
    });
    
    
    valoresX.forEach((element,i) => {
        valoresX[i]+=ejeXnegativo_cuadricula*-1;
        valoresX[i]*=100;
    });

    valoresY.forEach((element,i) => {
        valoresY[i]+=ejeYnegativo_cuadricula*-1;
        valoresY[i]*=100;
    });

    
    

    datos = {
        ejeXnegativo_cuadricula,
        ejeYnegativo_cuadricula,
        valoresX,
        valoresY
    };

    datosCuadricula={
        ejeXpositivo_cuadricula,
        ejeYpositivo_cuadricula,
        ejeXnegativo_cuadricula,
        ejeYnegativo_cuadricula
    }

    

    dibujar();
    
}


//Vectores

//Asignacion de instancia
const canvas = document.getElementById("cuadricula");
//Contexto 2D
const ctx= canvas.getContext("2d");
//instancia de contedor
const contenedor = canvas.parentElement;

// logitud del plano
const RANGO = 1000;

function ajustarCanvas() {
    dibujar();
}

function dibujarVector(x1, y1, x2, y2, color) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = color;
    ctx.stroke();
}

function dibujarPunto(x, y, radio, color) {
    ctx.beginPath();
    ctx.arc(x,y,radio,0,Math.PI*2)
    ctx.fillStyle = color;
    ctx.fill();
}

function dibujarEje(x1, y1, x2, y2, color ,  componente) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = color;
    ctx.lineWidth= 5;
    ctx.stroke(); 

    console.log("eje dibujado");
    console.log("x1:",x1," y1:",y1," x2:",x2," y2:",y2," ",componente)
    
}

function dibujarCuadricula(){
    const { ejeXpositivo_cuadricula, ejeYpositivo_cuadricula, ejeXnegativo_cuadricula, ejeYnegativo_cuadricula  } = datosCuadricula;


    
    // vector en x
    for (let i = 0; i <=ejeXpositivo_cuadricula; i+=100) {
        if (i==(ejeXnegativo_cuadricula*-100)){
            dibujarEje(i,0,i,ejeYpositivo_cuadricula,"green", "X");

            
        }else{
            dibujarVector(i,0,i,ejeYpositivo_cuadricula,"white");
        }
        
        
    }
    // Vector en y
    for (let i = 0; i <=ejeYpositivo_cuadricula; i+=100) {
        if (i==(ejeYnegativo_cuadricula*-100)){
            dibujarEje(0,i,ejeXpositivo_cuadricula,i,"green", "Y");
        }else{
            dibujarVector(0,i,ejeXpositivo_cuadricula,i,"white");
        }
    }

}

let datos = {
  ejeXnegativo_cuadricula: 0,
  ejeYnegativo_cuadricula: 0,
  valoresX: [0, 0, 0],
  valoresY: [0, 0, 0]
};

let datosCuadricula={
    ejeXpositivo_cuadricula:0,
    ejeYpositivo_cuadricula:0,
    ejeXnegativo_cuadricula:0,
    ejeYnegativo_cuadricula:0
};

function dibujar() {
    const { ejeXnegativo_cuadricula, ejeYnegativo_cuadricula, valoresX, valoresY } = datos;
    const { ejeXpositivo_cuadricula, ejeYpositivo_cuadricula } = datosCuadricula;

    canvas.width  = Math.max(ejeXpositivo_cuadricula, 100);
    canvas.height = Math.max(ejeYpositivo_cuadricula, 100);

    ctx.save();

  
    ctx.translate(0, canvas.height);
    ctx.scale(1, -1);
    ctx.lineWidth = 2;

    const ox = ejeXnegativo_cuadricula *  -100;
    const oy = ejeYnegativo_cuadricula *  -100;

    dibujarCuadricula();
    dibujarPunto(valoresX[0],valoresY[0],10,"red");

    dibujarVector(ox, oy, valoresX[1], valoresY[1], 'yellow');                    // A
    dibujarVector(valoresX[1], valoresY[1], valoresX[0], valoresY[0], 'orange');    // B
    dibujarVector(ox, oy, valoresX[0], valoresY[0], 'red');                       // Resultante

    ctx.restore();
}

window.addEventListener('resize', ajustarCanvas);
ajustarCanvas(); 