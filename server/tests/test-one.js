const chai = require('chai')
const expect = chai.expect

const getArgs = (str) => {
    let [args,code] = str
        .slice(1,str.length-1)
        .split(",code:");
    args = args
        .slice(6,args.length-1)
        .split(',');

    return [args,code]
}

const [clientData]= process.argv.slice(6);


const [args,code] = getArgs(clientData);

describe('getSum',  () => {
    console.log(args,code,'async',process.argv)
    const getCelcius = new Function(...args,code);

    it('1should convert farenheit to celcius for all values in an array', () => {
        expect(getCelcius(6, 10)).to.equal(16);
    })
    it('2should convert farenheit to celcius for all values in an array', () => {
        expect(getCelcius(242, 300)).to.equal(542);
    })
    it('3should convert farenheit to celcius for all values in an array', () => {
        expect(getCelcius(3, 5)).to.equal(8);
    })
})