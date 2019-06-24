/**
* Método que verifica se o período entre 2 datas é válido.
*
* @author Felipe Marques
* @email felipecaioba@gmail.com
* @method ValidarPeriodoData
* @params (string) dataInicio, (string) dataFim
* @return (boolean)
*/
var ValidarPeriodoData = function(dataInicio,dataFim){

var diaInicio = (dataInicio.split(‘/’)[0]);
var mesInicio = (dataInicio.split(‘/’)[1]);
var anoInicio = (dataInicio.split(‘/’)[2]);

var diaFim = (dataFim.split(‘/’)[0]);
var mesFim = (dataFim.split(‘/’)[1]);
var anoFim = (dataFim.split(‘/’)[2]);

var dataInicio = anoInicio+’-‘+mesInicio+’-‘+diaInicio;
var dataFim = anoFim+’-‘+mesFim+’-‘+diaFim;

if(Date.parse(dataInicio) > Date.parse(dataFim)){
return false;
}else if(Date.parse(dataFim) < Date.parse(dataInicio)){ }else{ return true; } } // exemplo de uso alert(ValidarPeriodoData('10/08/2011','10/08/2011')); // retorna true alert(ValidarPeriodoData('09/08/2011','10/08/2011')); // retorna true alert(ValidarPeriodoData('10/08/2011','10/08/2012')); // retorna true alert(ValidarPeriodoData('10/08/2011','10/09/2011')); // retorna true alert(ValidarPeriodoData('10/08/2011','11/08/2011')); // retorna true alert(ValidarPeriodoData('10/08/2011','09/08/2011')); // retorna false alert(ValidarPeriodoData('10/08/2011','10/08/2010')); // retorna false alert(ValidarPeriodoData('10/08/2011','10/07/2010')); // retorna false [/javascript]








/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package modelo;

import java.util.Calendar;
import javax.xml.crypto.Data;

/**
 *
 * @author Aluno
 */
public class Periodo {

    private Calendar dataInicioAluguel;
    private Calendar dataFimAluguel;

    public boolean intersecaoDatasAluguel(Periodo p) {

        if(this.equals(p)){
            return true;
        }

        if (p.dataInicioAluguel.before(this.dataFimAluguel) && p.dataInicioAluguel.after(this.dataInicioAluguel)) {
            return true;
        } else if (p.dataFimAluguel.equals(this.dataFimAluguel)) {
            return true;
        } else if (p.dataInicioAluguel.equals(this.dataFimAluguel)) {
            return true;
        }

        return !this.getDataInicioAluguel().after(p.dataFimAluguel) || this.getDataFimAluguel().before(p.dataInicioAluguel);
    }

    public long getDiasAlugados() {
        // 1 dia = 86400000 milisegundos
        return (dataFimAluguel.getTimeInMillis() - dataInicioAluguel.getTimeInMillis()) / 86400000;
    }

    public Calendar getDataInicioAluguel() {
        return dataInicioAluguel;
    }

    public void setDataInicioAluguel(Calendar dataInicioAluguel) {
         this.dataInicioAluguel = dataInicioAluguel;
    }

    public Calendar getDataFimAluguel() {
        return dataFimAluguel;
    }

    public void setDataFimAluguel(Calendar dataFimAluguel) {
         this.dataFimAluguel = dataFimAluguel;
    }

    @Override
    public String toString() {
        return "Periodo{" + "dataInicioAluguel=" + dataInicioAluguel + ", dataFimAluguel=" + dataFimAluguel + '}';
    }
    

}
