import scrapeIt from "scrape-it";
import axios from 'axios';
import nodemailer from 'nodemailer';

const url = 'https://compragamer.com/index.php?criterio=rtx%203080&seccion=3&nro_max=50';

setInterval( () => {
    scrapeIt('https://compragamer.com/index.php?seccion=3&cate=6&nro_max=50', {
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
    }, (err, { data }) => {
        console.log(err || data);
        console.log(data.products.filter(product => product.stock))
        let productsWithStock = data.products.filter(product => product.stock);
        if(productsWithStock) {

        }
    })
}, 10000)

//
// let transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth:{
//         user: process.env.EMAIL,
//         pass: process.env.PASSWORD
//     }
// });
//
// let mailOptions = {
//     from: 'ritortoalvaro93@gmail.com',
//     to: 'ritortoalvaro93@gmail.com',
//     subject: 'RTX 3080',
//     text: 'aqui va el array'
// };
//
// transporter.sendMail(mailOptions, (err, data) => {
//     if (err){
//         console.log('error: ' + err);
//     } else {
//         console.log('Email sent');
//     }
// });
