const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../models/connection');

const Product = require('../../models/Product');

describe('product', () => {
  describe('busca o produto pelo nome e o produto existe', () => {
    const product = {
      name: "Martelo de Thor",
    };
    
    before(async () => {
      const execute = [[{ id: 1, name: 'Martelo de Thor', quantity: 10 }]];
      
      sinon.stub(connection, 'execute').resolves(execute);
    });
    after(async () => {
      connection.execute.restore();
    });

    it('retorna um array que possui um objeto com as chaves id, name e quantity', async () => {
      const response = await Product.getByName(product.name);

      expect(response).to.be.a('array');
      expect(response[0]).to.have.a.property('id');
      expect(response[0]).to.have.a.property('name');
      expect(response[0]).to.have.a.property('quantity');
    });
  });

  describe('busca o produto pelo nome e o produto não existe', () => {
    const product = {
      name: "Martelo de Thor",
    };
    
    before(async () => {
      const execute = [[]];
      
      sinon.stub(connection, 'execute').resolves(execute);
    });
    after(async () => {
      connection.execute.restore();
    });

    it('retorna um array vazio', async () => {
      const response = await Product.getByName(product.name);

      expect(response).to.be.a('array');
      expect(response.length).to.be.equal(0);
    });
  });

  describe('o produto é cadastrado com sucesso', () => {
    const product = {
      name: "Martelo de Thor",
      quantity: 10
    };

    
    before(async () => {
      const execute = [{ insertId: 1 }];
      
      sinon.stub(connection, 'execute').resolves(execute);
    });
    after(async () => {
      connection.execute.restore();
    });

    it('retorna um objeto', async () => {
      const response = await Product.create(product.name, product.quantity);

      expect(response).to.be.a('object');
    });

    it('o objeto possui o "insertId" do novo produto inserido', async () => {
      const response = await Product.create(product.name, product.quantity);

      expect(response).to.have.a.property('insertId');
    });
  });

  describe('lista todos os produtos no banco de dados', () => {
    before(async () => {
      const execute = [[
        {
          "id": 1,
          "name": "martelo",
          "quantity": 10
        },
        {
          "id": 2,
          "name": "traje",
          "quantity": 10
        }
      ]];
      
      sinon.stub(connection, 'execute').resolves(execute);
    });
    after(async () => {
      connection.execute.restore();
    });

    it('é listado todos os produtos com sucesso', async () => {
      const response = await Product.getAllProducts();

      expect(response).to.be.a('array');
    });

    it('o array possui length maior que 0', async () => {
      const response = await Product.getAllProducts();

      expect(response.length).to.be.greaterThan(0);
    });
  });

  describe('busca um produto pelo id', () => {
    const ID = 1;
    
    before(async () => {
      const execute = [[{
          "id": 1,
          "name": "martelo",
          "quantity": 10
        }]];
      
      sinon.stub(connection, 'execute').resolves(execute);
    });
    after(async () => {
      connection.execute.restore();
    });

    it('retorna um objeto', async () => {
      const response = await Product.getById(ID);

      expect(response).to.be.a('array');
    });

    it('o objeto retornado contém as chaves id, name, quantity', async () => {
      const [response] = await Product.getById(ID);

      expect(response).to.have.a.property('id');
      expect(response).to.have.a.property('name');
      expect(response).to.have.a.property('quantity');
    });
  });

  describe('atualiza um produto', () => {
    const product = {
      "id": 1,
      "name": "martelo",
      "quantity": 10
    };

    before(async () => {
      const execute = [{
        affectedRows: 1,
      }];
    
      sinon.stub(connection, 'execute').resolves(execute);
    });
    after(async () => {
      connection.execute.restore();
    });

    it('retorna um objeto', async () => {
      const response = await Product.update(product.name, product.quantity, product.id);

      expect(response).to.be.a('object');
    });

    it('retorna o produto atualizado', async () => {
      const response = await Product.update(product.name, product.quantity, product.id);

      expect(response).to.have.property('affectedRows');
    });
  });

  describe('deleta um produto', () => {
    const ID = 1;

    before(async () => {
      const execute = [{
        affectedRows: 1,
      }];
    
      sinon.stub(connection, 'execute').resolves(execute);
    });
    after(async () => {
      connection.execute.restore();
    });

    it('retorna um objeto', async () => {
      const response = await Product.deleteProduct(ID);

      expect(response).to.be.a('object');
    });

    it('o objeto retornado possui a chave affectedRows', async () => {
      const response = await Product.deleteProduct(ID);

      expect(response).to.have.property('affectedRows');
    });
  });
});
