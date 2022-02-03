const sinon = require('sinon');
const { expect } = require('chai');

const ProductServices = require('../../services/Product');
const ProductControllers = require('../../controllers/Product');

describe('product', () => {
  describe('o produto é cadastrado com sucesso', () => {
    const response = {};
    const request = {};
    const execute = { id: 1, name: 'Martelo de Thor', quantity: 10 };

    before(async () => {
      request.body = {
        name: 'Martelo de Thor',
        quantity: 10,
      };
      
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(ProductServices, 'create').resolves(execute);
    });

    after(async () => {
      ProductServices.create.restore();
    });

    it('é retornado o status com o código 201 e o produto que foi criado ', async () => {
      await ProductControllers.create(request, response);

      expect(response.json.calledWith(execute)).to.be.equal(true);
      expect(response.status.calledWith(201)).to.be.equal(true);
    });
  });

  describe('quando o produto já existe', () => {
    const response = {};
    const request = {};
    const execute = [{ id: 1, name: 'Martelo de Thor', quantity: 10 }];

    before(async () => {
      request.body = {
        name: 'Martelo de Thor',
        quantity: 10,
      };
      
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(ProductServices, 'create').resolves(execute);
    });

    after(async () => {
      ProductServices.create.restore();
    });

    it('é retornado o status com o código 409 e a messagem "product already exists" ', async () => {
      await ProductControllers.create(request, response);

      expect(response.json.calledWith({ message: 'Product already exists' })).to.be.equal(true);
      expect(response.status.calledWith(409)).to.be.equal(true);
    });
  });

  describe('lista todos os produtos no banco de dados', () => {
    const response = {};
    const request = {};

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

    before(async () => {

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(ProductServices, 'getAllProducts').resolves(execute);
    });

    after(async () => {
      ProductServices.getAllProducts.restore();
    });

    it('é retornado o status com o código 200 e todos os produtos ', async () => {
      await ProductControllers.getAllProducts(request, response);

      expect(response.json.calledWith(execute)).to.be.equal(true);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });
  });

  describe('busca um produto pelo id e o produto existe', () => {
    const response = {};
    const request = {};

    const execute = {
      "id": 1,
      "name": "martelo",
      "quantity": 10
    };
    
    before(async () => {
      request.params = {
        id: 1,
      };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(ProductServices, 'getById').resolves(execute);
    });

    after(async () => {
      ProductServices.getById.restore();
    });

    it('é retornado o status 200 e o produto', async () => {
      await ProductControllers.getById(request, response);

      expect(response.json.calledWith(execute)).to.be.equal(true);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });
  });
  describe('busca um produto pelo id e o produto não existe', () => {
    const response = {};
    const request = {};

    const execute = undefined;
    
    before(async () => {
      request.params = {
        id: 1,
      };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(ProductServices, 'getById').resolves(execute);
    });

    after(async () => {
      ProductServices.getById.restore();
    });

    it('é retornado o status 200 e o produto', async () => {
      await ProductControllers.getById(request, response);

      expect(response.json.calledWith({ message: 'Product not found' })).to.be.equal(true);
      expect(response.status.calledWith(404)).to.be.equal(true);
    });
  });

  describe('atualiza um produto', () => {
    const response = {};
    const request = {};

    const called = {
      name: 'Martelo',
      quantity: 10,
    };

    const execute = {
      affectedRows: 1,
    };
    
    before(async () => {
      request.params = {
        id: 1,
      };

      request.body = {
        name: 'Martelo',
        quantity: 10,
      };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(ProductServices, 'update').resolves(execute);
    });

    after(async () => {
      ProductServices.update.restore();
    });

    it('retorna o status 200 e o name e quantity do produto atualizado', async () => {
      await ProductControllers.update(request, response);

      expect(response.json.calledWith(called)).to.be.equal(true);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });
  });

  describe('tenta atualizar um produto pelo id e ele não existe', () => {
    const response = {};
    const request = {};

    const called = {
      name: 'Martelo',
      quantity: 10,
    };

    const execute = {
      affectedRows: 0,
    };
    
    before(async () => {
      request.params = {
        id: 1,
      };

      request.body = {
        name: 'Martelo',
        quantity: 10,
      };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(ProductServices, 'update').resolves(execute);
    });

    after(async () => {
      ProductServices.update.restore();
    });

    it('retorna o status 404 e o name e quantity do produto atualizado', async () => {
      await ProductControllers.update(request, response);

      expect(response.json.calledWith({ message: 'Product not found' })).to.be.equal(true);
      expect(response.status.calledWith(404)).to.be.equal(true);
    });
  });

  // describe('deleta um produto', () => {
  //   const response = {};
  //   const request = {};

  //   const execute = {
  //     id: 1,
  //     name: 'Martelo',
  //     quantity: 10
  //   };
    
  //   before(async () => {
  //     request.params = {
  //       id: 1,
  //     };

  //     response.status = sinon.stub().returns(response);
  //     response.json = sinon.stub().returns();

  //     sinon.stub(ProductServices, 'deleteProduct').resolves();
  //     sinon.stub(ProductServices, 'getById').resolves(execute)
  //   });

  //   after(async () => {
  //     ProductServices.deleteProduct.restore();
  //   });

  //   it('retorna o status 200 e o produto deletado', async () => {
  //     await ProductControllers.deleteProduct(request, response);

  //     expect(response.json.calledWith(called)).to.be.equal(true);
  //     expect(response.status.calledWith(200)).to.be.equal(true);
  //   });
  // });
});