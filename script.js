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

    let productsWithStock = data.products.filter(product => product.stock);
    console.log(productsWithStock)
    if(productsWithStock.length !== 0) {
      transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
          console.log('error: ' + err);
        } else {
          console.log('Email sent');
        }
      });
    }
  })
}, 1200000)


let transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 465,
  secure: true,
    auth:{
        user: 'elmailrancio@gmail.com',
        pass: 'asdfg654321'
    }
});

let mailOptions = {
    from: 'elmailrancio@gmail.com',
    to: 'ritortoalvaro93@gmail.com',
    subject: 'RTX 3080',
    text: 'Hay stock padre !'
};
