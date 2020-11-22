import scrapeIt from "scrape-it";
import nodemailer from 'nodemailer';


const url = 'https://compragamer.com/index.php?criterio=rtx%203080&seccion=3&nro_max=50';

setInterval(() => {
  scrapeIt(url, {
    products: {
      listItem: ".products__item"
      , data: {
        link: {
          selector: "a.products__foto",
          attr: "href"
        },
        name: {
          selector: "h4.products__name"
        },
        price: {
          selector: "span.products__price-new"
        },
        stock: {
          selector: "footer.products-btns",
          convert: value => value === 'Sumar al carrito'
        }
      }
    }
  }, (err, {data}) => {
    transporter.sendMail(mailOptions, (err, data) => {
      if (err) {
        console.log('error: ' + err);
      } else {
        console.log('Email sent');
      }
    });
  })
}, 10000)


let transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth:{
        user: 'zwengertest99@hotmail.com',
        pass: 'asd654321'
    }
});

let mailOptions = {
    from: 'zwengertest99@hotmail.com',
    to: 'ritortoalvaro93@gmail.com',
    subject: 'RTX 3080',
    text: 'Hay stock padre !'
};
