const menu = require("./inventory.js");

class Basket {
  constructor() {
    this.basketArray = [];
    this.basketSize = 4;
    this.priceArray = [];
    this.discountedArray = [];
    this.totalPriceArray = [];
    this.count = 0;
  }
  addToBasket(sku) {
    for (let i = 0; i < menu.length; i++) {
      const bagel = menu[i];
      if (bagel.sku === sku && this.basketArray.length < this.basketSize) {
          this.basketArray.push(bagel);
      }
      else if (bagel.sku !== sku) {
          "This item does not exist"
      }
    }
    return "WARNING - Basket is full";
  }

  removeItems(sku) {
    for (let i = 0; i < this.basketArray.length; i++) {
      if (this.basketArray[i].sku === sku) {
        this.basketArray.splice(i, 1);
      }
    }
    return "That item isn't in your basket";
  }

  checkPrice(sku) {
    for (let i = 0; i < menu.length; i++) {
      if (menu[i].sku === sku) {
        return menu[i].price;
      }
    }
  }

  totalBasketPrice() {
    let totalPrice = 0;
    for (let i = 0; i < this.basketArray.length; i++) {
      totalPrice += this.basketArray[i].price;
    }
    totalPrice = totalPrice - this.discountedPrice();
    return Number(totalPrice.toFixed(2));
  }

  discountedPrice() {
    for (let i = 0; i < this.basketArray.length; i++) {
      this.discountedArray.push(this.basketArray[i].sku);
    }
    this.count = this.discountedArray.reduce((tally, sku) => {
      tally[sku] = (tally[sku] || 0) + 1;
      return tally;
    }, {});
    let totalDiscount = 0;
    const skus = Object.keys(this.count);
    for (let i = 0; i < skus.length; i++) {
      const count = this.count[skus[i]];
      const item = this.getItem(skus[i]);
      if (item.discount) {
        if (count >= item.discountTrigger) {
          totalDiscount +=
            item.saving * Math.floor(count / item.discountTrigger);
        }
      }
    }
    totalDiscount = totalDiscount * -1;
    return totalDiscount;
  }

  getItem(sku) {
    for (let i = 0; i < menu.length; i++) {
      if (menu[i].sku === sku) {
        return menu[i];
      }
    }
  }
}

//this discountedPrice function is now returning an object which contains
//the name of each SKU and the amount of times it occurs

// for (let i = 0; i < this.discountedArray.length; i++)
// if (this.discountedArray[i].sku === ""

module.exports = Basket;
