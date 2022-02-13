const verify = require('../util/verify');
const wordMap = require('../util/wordMap');

describe('Test verify function', () => {

    test('Testing regular correct:', () => {
        const map1 = wordMap('arose');
        const characters = 'ａ ｂ ｃ ｄ ｅ ｆ ｇ ｈ ｉ ｊ ｋ ｌ ｍ ｎ ｏ ｐ ｑ ｒ ｓ ｔ ｕ ｖ ｗ ｘ ｙ ｚ'.split(' ');
        const verified = verify('arose', 'arose', map1, characters);
        expect(verified).toStrictEqual({ resultStr: '『a』『r』『o』『s』『e』', counter: 5 });
        expect(characters).toStrictEqual('『a』 ｂ ｃ ｄ 『e』 ｆ ｇ ｈ ｉ ｊ ｋ ｌ ｍ ｎ 『o』 ｐ ｑ 『r』 『s』 ｔ ｕ ｖ ｗ ｘ ｙ ｚ'.split(' '));
    });

    test('Testing correct (Different capitalization):', () => {
        const map1 = wordMap('aRoSE');
        const characters = 'ａ ｂ ｃ ｄ ｅ ｆ ｇ ｈ ｉ ｊ ｋ ｌ ｍ ｎ ｏ ｐ ｑ ｒ ｓ ｔ ｕ ｖ ｗ ｘ ｙ ｚ'.split(' ');
        const verified = verify('arose', 'arose', map1, characters);
        expect(verified).toStrictEqual({ resultStr: '『a』『r』『o』『s』『e』', counter: 5 });
        expect(characters).toStrictEqual('『a』 ｂ ｃ ｄ 『e』 ｆ ｇ ｈ ｉ ｊ ｋ ｌ ｍ ｎ 『o』 ｐ ｑ 『r』 『s』 ｔ ｕ ｖ ｗ ｘ ｙ ｚ'.split(' '));
    });    

    test('Testing correct (characters set comparison):', () => {
        const map1 = wordMap('elder');
        const characters = 'ａ ｂ ｃ ｄ ｅ ｆ ｇ ｈ ｉ ｊ ｋ ｌ ｍ ｎ ｏ ｐ ｑ ｒ ｓ ｔ ｕ ｖ ｗ ｘ ｙ ｚ'.split(' ');
        const verified = verify('exeem', 'elder', map1, characters);
        expect(verified).toStrictEqual({ resultStr: '『e』ｘｅ『e』ｍ', counter: 2 });
        expect(characters).toStrictEqual('ａ ｂ ｃ ｄ 『e』 ｆ ｇ ｈ ｉ ｊ ｋ ｌ ｎ ｏ ｐ ｑ ｒ ｓ ｔ ｕ ｖ ｗ ｙ ｚ'.split(' '));
    });    

    test('Testing regular incorrect, also tests for correct 【s】 placement:', () => {
        const map1 = wordMap('arose');
        const characters = 'ａ ｂ ｃ ｄ ｅ ｆ ｇ ｈ ｉ ｊ ｋ ｌ ｍ ｎ ｏ ｐ ｑ ｒ ｓ ｔ ｕ ｖ ｗ ｘ ｙ ｚ'.split(' ');
        const verified = verify('tests', 'arose', map1, characters);
        expect(verified).toStrictEqual({ resultStr: 'ｔ【e】【s】ｔｓ', counter: 0 });
        expect(characters).toStrictEqual('ａ ｂ ｃ ｄ 【e】 ｆ ｇ ｈ ｉ ｊ ｋ ｌ ｍ ｎ ｏ ｐ ｑ ｒ 【s】 ｕ ｖ ｗ ｘ ｙ ｚ'.split(' '));
    });     

    test('Testing regular incorrect (all wrong characters):', () => {
        const map1 = wordMap('arose');
        const characters = 'ａ ｂ ｃ ｄ ｅ ｆ ｇ ｈ ｉ ｊ ｋ ｌ ｍ ｎ ｏ ｐ ｑ ｒ ｓ ｔ ｕ ｖ ｗ ｘ ｙ ｚ'.split(' ');
        const verified = verify('fuzzy', 'arose', map1, characters);
        expect(verified).toStrictEqual({ resultStr: 'ｆｕｚｚｙ', counter: 0 });
        expect(characters).toStrictEqual('ａ ｂ ｃ ｄ ｅ ｇ ｈ ｉ ｊ ｋ ｌ ｍ ｎ ｏ ｐ ｑ ｒ ｓ ｔ ｖ ｗ ｘ'.split(' '));
    });    

    test('Testing correct change of character set from wrong to correct:', () => {
        const map1 = wordMap('arose');
        const characters = 'ａ ｂ ｃ ｄ 【e】 ｆ ｇ ｈ ｉ ｊ ｋ ｌ ｍ ｎ ｏ ｐ ｑ ｒ 【s】 ｔ ｕ ｖ ｗ ｘ ｙ ｚ'.split(' ');
        let verified = verify('arose', 'arose', map1, characters);
        expect(characters).toStrictEqual('『a』 ｂ ｃ ｄ 『e』 ｆ ｇ ｈ ｉ ｊ ｋ ｌ ｍ ｎ 『o』 ｐ ｑ 『r』 『s』 ｔ ｕ ｖ ｗ ｘ ｙ ｚ'.split(' '));
    });     

    test('Testing correct change of character set from correct to wrong:', () => {
        const map1 = wordMap('arose');
        const characters = '『a』 ｂ ｃ ｄ ｅ ｆ ｇ ｈ ｉ ｊ ｋ ｌ ｍ ｎ ｏ ｐ ｑ ｒ ｓ ｔ ｕ ｖ ｗ ｘ ｙ ｚ'.split(' ');
        let verified = verify('lacks', 'arose', map1, characters);
        expect(characters).toStrictEqual('『a』 ｂ ｄ ｅ ｆ ｇ ｈ ｉ ｊ ｍ ｎ ｏ ｐ ｑ ｒ 【s】 ｔ ｕ ｖ ｗ ｘ ｙ ｚ'.split(' '));
    });    
});