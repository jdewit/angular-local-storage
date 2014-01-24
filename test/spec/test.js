describe('Tests functionality of the localStorage module', function(){
    beforeEach(module('LocalStorageModule', function(localStorageServiceProvider){
        p = localStorageServiceProvider;
    }));
    var ls, store = [];
    beforeEach(inject(function(localStorageService){
        ls = localStorageService;
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

    it('Should be able to get space left in localstorage', function() {
      // set a 10 character string 1000 times, 10*16*1000/(8*1024)=19.53kb
      for (var i=0; i<1000; i++) {
        ls.set('object' + i, 'some_value');
      }

      expect(ls.getSpace()).toBe(5097); // 5120kb - 3kb(localstorage cost) - 19.53kb = 5097.47kb
    });
});
