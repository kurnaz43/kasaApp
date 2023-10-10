import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import * as io from "socket.io-client";
import { ArchivService } from 'src/app/services/archiv.service';
import { ProduktAdderService } from 'src/app/services/produkt-adder.service';
import { WarenkorbService } from 'src/app/services/warenkorb.service';
import { Artikel } from 'src/POJO/Artikel';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  produkte: Artikel[];
  searchQuery: string = '';
  gesamtpreis: number;
  items1;
  items: Array<Artikel>;
  public myUserId: string;
  socket;
  chat_input: string;
  chats: any;
  constructor(private toastCtrl: ToastController, public navCtrl: NavController, private archiv: ArchivService, private produktManager: ProduktAdderService, private toastController: ToastController, private warenkorb: WarenkorbService) {
    this.produktManager.whatchAllProdukts().subscribe((alleArtikel) => {
      this.produkte = Array.from(alleArtikel.values());
      this.items = Array.from(alleArtikel.values());
    });
    warenkorb.whatchGesamtPreis().subscribe((preis) => {
      this.gesamtpreis = (preis);
    });
    // console.log('produkte array', this.produkte);
    this.initializeItems();

    if (this.myUserId == null) {
      this.myUserId = Date.now().toString();
    }

    // console.log('asdasdasd', this.produktManager.produkte);
  }
  ngOnInit(): void {

    this.produktManager.initProdukte();
  }

  connectToServer() {
    this.socket = io.connect('http://localhost:3000');
    console.log('lets connect');

    this.socket.on('welcome', function (data) {
      console.log('connected  ');

      // Respond with a message including this clients' id sent from the server
      this.socket.emit('i am client', { data: 'foo!', id: data.id });

    });
  }
  send(msg) {
    if (msg != '') {
      // Assign user typed message along with generated user id
      let saltedMsg = this.myUserId + "#" + msg;
      // Push the message through socket 
      this.socket.emit('message', saltedMsg);
    }
    this.chat_input = '';
  }
  Receive() {
    // Socket receiving method 
    this.socket.on('message', (msg) => {
      // separate the salted message with "#" tag 
      let saletdMsgArr = msg.split('#');
      var item = {};
      // check the sender id and change the style class
      if (saletdMsgArr[0] == this.myUserId) {
        item = { "styleClass": "chat-message right", "msgStr": saletdMsgArr[1] };
      }
      else {
        item = { "styleClass": "chat-message left", "msgStr": saletdMsgArr[1] };
      }
      // push the bind object to array
      // Final chats array will iterate in the view  
      this.chats.push(item);
    });
  }
  initializeItems() {
    this.items = Array.from(this.produkte.values());
    console.log('items: ', this.items);


  }

  getItems(ev: any) {
    this.initializeItems();

    const val = ev.target.value;

    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.getName().toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  increaseCartItem(produkt: Artikel) {
    this.items.forEach(async (value) => {
      if (value === produkt) {
        if (produkt.getBestand() != 0) {
          value.setBestand(produkt.getBestand() - 1);
          this.warenkorb.addToCart(produkt, 1)
        }

        else {
          const toast = await this.toastController.create({
            message: ' Ürünümüz Tükenmistir! ',
            duration: 3000,
            position: 'bottom',
            buttons: [
              {
                text: 'Kapat!',
                role: 'Cancel'
              }],
          });

          await toast.present();
        }
      }
    })

  }
  decreaseCartItem(produkt) {
    if (this.warenkorb.getArtikelAnzahl(produkt) === 0) {
      return;
    }
    this.items.forEach((value) => {
      if (value === produkt) {
        value.setBestand(produkt.bestand + 1);
        this.warenkorb.abortFromCart(produkt, 1)
      }
    });
  }

  save() {
    this.archiv.save();
  }
  onPrintInvoice(cmpName) {
    let printContents = document.getElementById(cmpName).innerHTML;
    let originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
  }
}
