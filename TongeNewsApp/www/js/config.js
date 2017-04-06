var settings = {
    client_id: '122440',
    client_secret: '576ec4d35f1b59363ef51171bc95421a',
    rows: 10
}

var server = {
    domain: "http://www.tngou.net/api",
    imgUrl: "http://tnfs.tngou.net/image"
}

var urls = {
    info_show: server.domain + "/info/show?id=",
    login: server.domain + '/oauth2/login?callback=JSON_CALLBACK&client_id=' + settings.client_id + '&client_secret=' + settings.client_secret,
    reg: server.domain + '/oauth2/reg?callback=JSON_CALLBACK&client_id=' + settings.client_id + '&client_secret=' + settings.client_secret,
    user: server.domain + '/user?callback=JSON_CALLBACK',
    favorite: server.domain + '/my/favorite?callback=JSON_CALLBACK',
    favoriteAdd: server.domain + '/favorite/add?callback=JSON_CALLBACK',
    favoriteDelete: server.domain + '/favorite/delete?callback=JSON_CALLBACK',
}

var cache = {
    user: "_user",
    token: '_token'
}