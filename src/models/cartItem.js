export default class cartItem {
	constructor(e) {
		this.id = e.id;
		this.name = e.name;
		this.quantity = 1;
		this.price = e.price;
		this.stock = e.quantity;
		this.total = e.price;
	}
}
