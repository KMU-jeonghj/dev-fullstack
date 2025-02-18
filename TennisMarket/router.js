function route(pathname, handle, response, productId) {
    console.log('pathname : ' + pathname);

    if (typeof handle[pathname] == 'function') 
        handle[pathname](response, productId);
    
    else { //지정되지 않은 경로일시(handle에 없을시) -> 404 예외처리
        response.writeHead(200, {'Content-Type' : 'text/html'});
        response.write('404 : Page Not Found.');
        response.end();
    }
}

exports.route = route;