
import { Pizza } from "./IPizza";
import { Adicional } from "./IAdicional";
/**
 * Interface para modelar objetos Combinacion
 */
export interface Combinacion{
    pizzas : Pizza[],
    adicionales : Adicional[],
    total : Number

}
  