var settings = {
    port: 3445,
    data_location: './data/',
    localWebServiceRoot: 'http://localhost:8080/web/', //  roo
    useMockRest: true,
    rest_base_url: '/api/*', // how to recognize REST calls
    route_rest_base_url: '/route/api/*', // how to recognize REST calls
    static_site_root: __dirname + '/../build' //up a dir and find build
};

module.exports = settings;