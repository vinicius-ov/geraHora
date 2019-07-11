import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import moment from 'moment';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  horaEntrada = moment('0830','hhmm').format('HH:mm');
  horaAlmoco = moment('1200','hhmm').format('HH:mm');
  horaRetorno = moment('1300','hhmm').format('HH:mm');
  horaSaida = moment('1848','hhmm').format('HH:mm');

  //TODO: colocar em um vetor e gerar 31 vezesou 23 vezes (?)

  constructor(public navCtrl: NavController) {
this.geraCalendario();
  }

  

  geraCalendario(){
    //vai criar cada hora de marcacao, randomizando 15 minutos a mais para cada uma
    var intervalo = 830 + Math.floor((Math.random() * 15) + 1);
    this.horaEntrada = moment(intervalo.toString(),'hmm').format('HH:mm');
    intervalo = 1200 + Math.floor((Math.random() * 15) + 1);
    this.horaAlmoco = moment(intervalo.toString(),'hhmm').format('HH:mm');
    intervalo = 1310 + Math.floor((Math.random() * 15) + 1);
    this.horaRetorno = moment(intervalo.toString(),'hhmm').format('HH:mm');
    intervalo = 1830 + Math.floor((Math.random() * 15) + 1);
    this.horaSaida = moment(intervalo.toString(),'hhmm').format('HH:mm');
    //var splitar cada turno para pegar ver se fechou o total de 8:30
    var splice = this.horaEntrada.split(':');
    let turnoManha = moment(this.horaAlmoco.replace(':',''),'hmm').subtract(splice[1],'minutes').subtract(splice[0],'hours').format('HH:mm');
    splice = this.horaRetorno.split(':');
    var turnoTarde = moment(this.horaSaida.replace(':',''),'hmm').subtract(splice[1],'minutes').subtract(splice[0],'hours').format('HH:mm');
    let dia = moment(turnoManha.replace(':',''),'hmm').add(turnoTarde.split(':')[1],'minutes').add(turnoTarde.split(':')[0],'hours').format('HH:mm');
    console.log('turnoManha ' + turnoManha);
    console.log('turnoTarde ' + turnoTarde);
    if (dia > moment('848','hmm').format('HH:mm')){
        console.log('passou');
        let passadoMinutos = moment(dia.replace(':',''),'hmm').subtract('48','minutes').format('mm');
        console.log('ópa ' + passadoMinutos);
        this.horaSaida = moment(this.horaSaida.replace(':',''),'hhmm').subtract(passadoMinutos,'minutes').format('HH:mm');
    }else{
      console.log('nao passou');
      let faltou = moment('48','mm').subtract(dia.split(':')[1],'minutes').format('mm');
      console.log('faltou ' + faltou);
      this.horaSaida = moment(this.horaSaida.replace(':',''),'hhmm').add(faltou,'minutes').format('HH:mm');
    }
    console.log('dia ' + dia);
    console.log('horaSaida ' + this.horaSaida);
  }

}

