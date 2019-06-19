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
