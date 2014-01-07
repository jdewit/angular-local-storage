describe('Tests functionality of the localStorage module', function(){
    beforeEach(module('LocalStorageModule', function(localStorageServiceProvider){
        p = localStorageServiceProvider;
    }));
    var ls;
    beforeEach(inject(function(_localStorageService_){
        ls = _localStorageService_;
    }));

    it("Should add a value to my local storage", function(){
        var n = 234;
        ls.set('test', n);
        //Since localStorage makes the value a string, we look for the '234' and not 234
        expect(ls.get('test')).toBe('234');

        var obj = { key: 'val' };
        ls.set('object', obj);
        var res = ls.get('object');
        expect(res.key).toBe('val');

    });

    it('Should allow me to set a prefix', function(){
        p.setPrefix("myPref");
        expect(p.prefix).toBe("myPref");
    });

    it('Should allow me to set the cookie values', function(){
        p.setStorageCookie(60, '/path');
        expect(p.cookie.expiry).toBe(60);
        expect(p.cookie.path).toBe('/path');
    });

    it('Should allow me to change the prefix', function() {
        ls.setPrefix("myCustomPref");
        ls.set('test', '123');
        expect(ls.keys()).toContain('test');
        expect(ls.keys().length).toBe(1);
    });
});
