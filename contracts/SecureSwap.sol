//SPDX-License-Identifier: GPL - 3.0

pragma solidity ^0.8.0;

contract SecureSwap {
    struct Product {
        uint id;
        address payable seller;
        string description;
        uint price;

        /* 
         * This is a security deposit from the seller, which must be higher than the product's price. 
         * This deposit acts as a form of collateral to ensure the seller's commitment to the transaction. 
         */
        uint sellerDeposit; 
        bool isSold;
    }

    uint public productCount = 0;
    mapping(uint => Product) public products;

    mapping(address => uint) public balances;

    mapping(address => uint) public stakedBalances;

    /*
     * This event is emitted when a new product is listed in the marketplace.
     * uint id: The unique identifier of the listed product.
     * address seller: The Ethereum address of the seller who listed the product.
     * uint price: The price of the product being listed.
     */
    event ProductListed(uint id, address seller, uint price);

    /*
     * This event is emitted when a product is purchased by a buyer.
     * uint id: The identifier of the product that has been purchased.
     * address buyer: The Ethereum address of the buyer who purchased the product.
     * uint price: The price at which the product was purchased.
     */
    event ProductPurchased(uint id, address buyer, uint price);


     // Event emitted when a transaction is agreed upon
    event TransactionAgreed(uint productId, address buyer, address seller, uint price);

     /*
      * This event is Emitted when a transaction is approved, indicating that both parties have agreed and the funds can be transferred to the seller.
      * uint id: The product identifier for which the transaction has been approved.
      * address buyer: The buyer's Ethereum address.
      * address seller: The seller's Ethereum address.
      * uint price: The agreed transaction price.
      */
    event TransactionApproved(uint id, address buyer, address seller, uint price);

    /*
     * This event is emitted in the case of a dispute over a transaction.
     * uint id: The identifier of the disputed product.
     * string reason: A textual description providing the reason for the dispute.
     */
    event TransactionDisputed(uint id, string reason);

    // /*
    //  * Function to list a new product
    //  * String memory _description: This is a temperory memory storage between transaction
    //  * uint _price: The price that the item is list for
    //  * uint _sellerDesposit: The collatoral payment the seller need to put down
    //  */
    function listProduct(string memory _description, uint _price, uint _sellerDeposit) public {
        require(_sellerDeposit > _price, "Deposit must be higher than price");
        productCount++;
        //This specifies where the new product will be stored in the market 
        products[productCount] = Product(productCount, payable(msg.sender), _description, _price, _sellerDeposit, false);
        //Notify people if the product is on the chain
        emit ProductListed(productCount, msg.sender, _price);
    }


    // make a registerasseller function
    // list product on chain ^^
    // one seller + one many buyers test, 2 products
    // dispute contract on chain

  // Function for buyers to agree to a transaction
  function agreeToTransaction(uint _productId) public payable {
      Product storage product = products[_productId];
      require(product.seller != address(0), "Product does not exist");
      require(product.isSold == false, "Product already sold");
      //require(msg.sender != product.seller, "Buyer cannot be the seller");

      // Transfer the product price from the buyer to the contract
      require(msg.value == product.price, "Send exact product price");

      // Staking the seller's deposit
      stakedBalances[product.seller] += product.sellerDeposit;

      // Mark the product as sold
      product.isSold = true;

      // Emit event indicating the transaction agreement
      emit TransactionAgreed(_productId, msg.sender, product.seller, product.price);
    }

    // Function for sellers to withdraw their staked balance
    function withdrawStake() public {
        uint amount = stakedBalances[msg.sender];
        require(amount > 0, "No staked balance to withdraw");

        // Transfer staked balance to the seller
        stakedBalances[msg.sender] = 0;
        payable(msg.sender).transfer(amount);
    }

    /*
     * Function for a buyer to purchase a product
     * unit _productId: The identifier of the purchase product.
     */
    // function purchaseProduct(uint _productId) public payable {
    //     //Find the item storeed in the marketplace
    //     Product storage product = products[_productId];
    //     require(msg.value == product.price, "Send exact product price");
    //     require(product.isSold == false, "Product already sold");
    //     product.isSold = true;
    //     balances[product.seller] += msg.value;
    //     emit ProductPurchased(_productId, msg.sender, product.price);
    // }  


    function purchaseProduct(uint _productId) public payable {
      Product storage product = products[_productId];

      require(msg.value == product.price, "Send exact product price");
      require(product.isSold == false, "Product already sold");
      product.isSold = true;
      balances[product.seller] += msg.value;
      emit ProductPurchased(_productId, msg.sender, product.price);
    }

    /*
     * Function to approve the transaction and release funds to the seller
     */
    function approveTransaction(uint _productId) public {
        Product storage product = products[_productId];
        require(balances[product.seller] >= product.price, "Insufficient escrowed funds");
        product.seller.transfer(product.price);
        balances[product.seller] -= product.price;
        emit TransactionApproved(_productId, msg.sender, product.seller, product.price);
    }

    /*
     * Function to handle disputes and refund the buyer
     */
    function disputeTransaction(uint _productId, string memory _reason) public {
        Product storage product = products[_productId];
        require(balances[product.seller] >= product.price, "Insufficient funds to refund");
        product.isSold = false;
        payable(msg.sender).transfer(product.price);
        balances[product.seller] -= product.price;
        emit TransactionDisputed(_productId, _reason);
    }

}