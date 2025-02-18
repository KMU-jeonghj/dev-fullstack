const fs = require('fs');
const main_view = fs.readFileSync('./main.html', 'utf-8');
const orderlist_view = fs.readFileSync("./orderlist.html", 'utf-8');

const mariadb = require('./database/connect/mariadb');


function main(response) {
    console.log('main');

    mariadb.query("SELECT * FROM product", function(err, rows) {
        console.log(rows);
    });
    


    response.writeHead(200, {'Content-Type' : 'text/html'});
    response.write(main_view);
    response.end();

    
}

function css_main(response) {
    fs.readFile('./main.css', 'utf-8', function(err, data) {
        response.writeHead(200, {'Content-Type' : 'text/css'});
        response.write(data);
        response.end();
    })
}

function redRacket(response) {
    fs.readFile('./img/redRacket.png', function(err, data) {
        response.writeHead(200, {'Content-Type' : 'text/html'});
        response.write(data);
        response.end();
    })
}
function blueRacket(response) {
    fs.readFile('./img/blueRacket.png', function(err, data) {
        response.writeHead(200, {'Content-Type' : 'text/html'});
        response.write(data);
        response.end();
    })
}
function blackRacket(response) {
    fs.readFile('./img/blackRacket.png', function(err, data) {
        response.writeHead(200, {'Content-Type' : 'text/html'});
        response.write(data);
        response.end();
    })
}
function order(response, productId) {
    response.writeHead(200, { 'Content-Type': 'text/html' });

    // ✅ productId를 정수로 변환
    let parsedProductId = parseInt(productId, 10);
    if (isNaN(parsedProductId)) {  
        console.error("❌ Invalid productId:", productId);
        response.write("<h2>Error: Invalid product ID</h2>");
        response.end();
        return;
    }

    // ✅ MySQL `DATE` 형식으로 변환 (YYYY-MM-DD)
    let orderDate = new Date().toISOString().split('T')[0];

    const query = "INSERT INTO orderlist (product_id, order_date) VALUES (?, ?)";
    mariadb.query(query, [parsedProductId, orderDate], function(err, result) {
        if (err) {
            console.error("❌ Error inserting data:", err);
            response.write("<h2>Error placing order</h2>");
        } else {
            console.log("✅ Insert Success! Affected Rows:", result.affectedRows);
            response.write('✅ Order placed successfully');
        }
        response.end();
    });
}

// function order(response, productId) {
//     response.writeHead(200, {'Content-Type' : 'text/html'});

//     let parsedProductId = parseInt(productId, 10);

//     mariadb.query("INSERT INTO orderlist VALUES ("+ parsedProductId + ",'" + new Date().toLocaleDateString() +  "');", function(err, rows) {
//         console.log(rows);
//     });
    


//     response.write('order page');
//     response.end();

    
// }


function orderlist(response) {
    console.log('orderlist');

    response.writeHead(200, { 'Content-Type': 'text/html' });

    mariadb.query("SELECT * FROM orderlist", function (err, rows) {
        // if (err) {  // ✅ 쿼리 실행 실패 시 처리
        //     console.error("Database query error:", err);
        //     response.write("<h2>Error fetching order list</h2>");
        //     response.end();
        //     return;
        // }

        if (!rows || rows.length === 0) {  // ✅ 데이터가 없을 경우 처리
            console.warn("No data found in orderlist");
            response.write("<h2>No orders found</h2>");
            response.end();
            return;
        }

        // 먼저 orderlist.html 내용을 출력
        response.write(orderlist_view);

        // 테이블 안에 데이터 삽입 (orderlist.html에서 <table>이 이미 존재한다고 가정)
        rows.forEach(element => {
            response.write("<tr>"
                + "<td>" + (element.product_id !== null ? String(element.product_id) : 'N/A') + "</td>"
                + "<td>" + (element.order_date || 'N/A') + "</td>"
                + "</tr>"
            );
        });

        response.write("</table>"); // 테이블이 닫혔는지 확인!
        response.end();
    });
}




// function orderlist(response) {
//     console.log('orderlist');

//     response.writeHead(200, { 'Content-Type': 'text/html' });

//     mariadb.query("SELECT * FROM orderlist", function (err, rows) {
        

//         // 먼저 orderlist.html 내용을 출력
//         response.write(orderlist_view);

//         // 테이블 안에 데이터 삽입 (orderlist.html에서 <table>이 이미 존재한다고 가정)
//         rows.forEach(element => {
//             response.write("<tr>"
//                 + "<td>" + element.product_id + "</td>"
//                 + "<td>" + element.order_date + "</td>"
//                 + "</tr>"
//             );
//         });

//         response.write("</table>"); // 테이블이 닫혔는지 확인!
//         response.end();
        

//     });
// }

function favicon(response) {
    console.log('favorite icons');
    response.writeHead(200, {'Content-Type' : 'text/html'});
    response.write('favorites of hojin Jeong');
    response.end();
}


let handle = {}; //key, value
handle['/'] = main;
handle['/orderlist.html'] = orderlist;
handle['/order'] = order;

handle['/favicon.ico'] = favicon;

/*css*/
handle['/main.css'] = css_main;

/* image directory */
handle['/img/redRacket.png'] = redRacket;
handle['/img/blueRacket.png'] = blueRacket;
handle['/img/blackRacket.png'] = blackRacket;

exports.handle = handle;