const mariadb = require('./database/connect/mariadb');


function main(response) {
    console.log('main');

    mariadb.query("SELECT * FROM product", function(err, rows) {
        console.log(rows);
    });

    response.writeHead(200, {'Content-Type' : 'text/html'});
    response.write('Main - hojin Jeong');
    response.end();
}

function login(response) {
    console.log('login');
    response.writeHead(200, {'Content-Type' : 'text/html'});
    response.write('login\n hojin Jeong');
    response.end();        
}

function favicon(response) {
    console.log('favorite icons');
    response.writeHead(200, {'Content-Type' : 'text/html'});
    response.write('favorites of hojin Jeong');
    response.end();
}


let handle = {}; //key, value
handle['/'] = main;
handle['/login'] = login;
handle['/favicon.ico'] = favicon;


exports.handle = handle;