var expect = require('chai').expect;
var request = require('request');

url = 'http://localhost:3000/';

describe('Status of Pages', function(){

    it('Main page ', function(done) {
        request(url, function(err, response, body){
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

    it('Portfolio page ', function(done) {
        request(url + 'portfolio', function(err, response, body){
            expect(response.statusCode).to.equal(200);
            done();
        });
    });
});
