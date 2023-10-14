class Ingreso extends Dato{
    static  contadorIngresos = 0;
    constructor(descripcion, valor){
        super(descripcion,valor);
        this._id = ++Ingreso.contadorIngresos;
    }
    get ID(){
        return this._id;
    }
}