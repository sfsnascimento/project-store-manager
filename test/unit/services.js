const sinon = require('sinon');
const { expect } = require('chai');

const ProductModels = require('../../models/Product');
const ProductServices = require('../../services/Product');

describe('product', () => {
  describe('o produto é cadastrado com sucesso', () => {
    const product = {
      name: "Martelo de Thor",
      quantity: 10
    };

    before(async () => {
      const execute = { insertId: 1 };
      
      sinon.stub(ProductModels, 'create').resolves(execute);
      sinon.stub(ProductModels, 'getByName').resolves([]);
    });
    after(async () => {
      ProductModels.create.restore();
      ProductModels.getByName.restore();
    });

    it('retorna um objeto que possui as chaves id, name e quantity', async () => {
      const response = await ProductServices.create(product.name, product.quantity);

      expect(response).to.be.a('object');
      expect(response).to.have.a.property('id');
      expect(response).to.have.a.property('name');
      expect(response).to.have.a.property('quantity');
    });
  });

  describe('quando o produto já existe', () => {
    const product = {
      name: "Martelo de Thor",
      quantity: 10
    };

    before(async () => {
      const execute = [{ id: 1, name: 'Martelo de Thor', quantity: 10 }];
      
      sinon.stub(ProductModels, 'getByName').resolves(execute);
    });
    after(async () => {
      ProductModels.getByName.restore();
    });

    it('retorna um array com um objeto contendo as chaves id, name e quantity', async () => {
      const response = await ProductServices.create(product.name, product.quantity);

      expect(response).to.be.a('array');
      expect(response[0]).to.have.a.property('id');
      expect(response[0]).to.have.a.property('name');
      expect(response[0]).to.have.a.property('quantity');
    });
  });

  describe('lista todos os produtos no banco de dados', () => {
    before(async () => {
      const execute = [
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
      ];
      
      sinon.stub(ProductModels, 'getAllProducts').resolves(execute);
    });
    after(async () => {
      ProductModels.getAllProducts.restore();
    });

    it('é listado todos os produtos com sucesso', async () => {
      const response = await ProductServices.getAllProducts();

      expect(response).to.be.a('array');
    });

    it('o array possui length maior que 0', async () => {
      const response = await ProductServices.getAllProducts();

      expect(response.length).to.be.greaterThan(0);
    });
  });

  describe('busca um produto pelo id', () => {
    const ID = 1;
    
    before(async () => {
      const execute = [{
          "id": 1,
          "name": "martelo",
          "quantity": 10
        }];
      
      sinon.stub(ProductModels, 'getById').resolves(execute);
    });
    after(async () => {
      ProductModels.getById.restore();
    });

    it('retorna um objeto', async () => {
      const response = await ProductServices.getById(ID);

      expect(response).to.be.a('object');
    });

    it('retorna o produto pelo id', async () => {
      const response = await ProductServices.getById(ID);

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
      const execute = {
        affectedRows: 1,
      };
    
      sinon.stub(ProductModels, 'update').resolves(execute);
    });
    after(async () => {
      ProductModels.update.restore();
    });

    it('retorna um objeto', async () => {
      const response = await ProductServices.update(product.name, product.quantity, product.id);

      expect(response).to.be.a('object');
      expect(response).to.have.property('affectedRows');
    });
  });

  describe('deleta um produto', () => {
    const ID = 1;

    before(async () => {
      const execute = {
        affectedRows: 1,
      };
    
      sinon.stub(ProductModels, 'deleteProduct').resolves(execute);
    });
    after(async () => {
      ProductModels.deleteProduct.restore();
    });

    it('retorna um objeto', async () => {
      const response = await ProductServices.deleteProduct(ID);

      expect(response).to.have.property('affectedRows');
      expect(response).to.be.a('object');
    });
  });
});
