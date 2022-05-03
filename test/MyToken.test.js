const Token = artifacts.require('MyToken');
require('dotenv').config({ path: '../.env' });

const chai = require('./setupchai.js');
const BN = web3.utils.BN;
const expect = chai.expect;

contract('Token Test', (accounts) => {
  const [deployerAccount, recipient, anotherAccount] = accounts;

  beforeEach(async () => {
    this.myToken = await Token.new(process.env.INITIAL_TOKENS);
  });

  it('all tokens should be in my account', async () => {
    let instance = this.myToken;
    let totalSupply = await instance.totalSupply();
    /* let balance = await instance.balanceOf(accounts[0]);
    assert.equal(
      balance.valueOf(),
      initialSupply.valueOf(),
      'The balance was not the same'
    ); */

    expect(
      instance.balanceOf(deployerAccount)
    ).to.eventually.be.a.bignumber.equal(totalSupply);
  });

  it('is possible to send tokens between accounts', async () => {
    const sendTokens = 1;
    let instance = this.myToken;
    let totalSupply = await instance.totalSupply();
    expect(
      instance.balanceOf(deployerAccount)
    ).to.eventually.be.a.bignumber.equal(totalSupply);
    expect(instance.transfer(recipient, sendTokens)).to.eventually.be.fulfilled;
    expect(
      instance.balanceOf(deployerAccount)
    ).to.eventually.be.a.bignumber.equal(totalSupply.sub(new BN(sendTokens)));
    expect(instance.balanceOf(recipient)).to.eventually.be.a.bignumber.equal(
      new BN(sendTokens)
    );
  });
});
