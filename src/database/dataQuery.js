function deleteQuery(document, field, operator, value, db) {
	db.collection(document)
		.where(field, operator, value)
		.get()
		.then(querySnapshot => {
			querySnapshot.forEach(doc => {
				doc.ref.delete();
			});
		});
}

function orderedQuery(document, field, db, callback, order) {
	if (!order) order = "asc";
	let a = [];
	db.collection(document)
		.orderBy(field, order)
		.get()
		.then(function(querySnapshot) {
			querySnapshot.forEach(function(doc) {
				a.push(doc.data());
			});
			callback(a);
		});
}

function searchQuery(
	document,
	field,
	operator,
	value,
	db,
	callback,
	orderField = "id",
	order = "asc"
) {
	let a = [];
	db.collection(document)
		.where(field, operator, value)
		.orderBy(orderField, order)
		.get()
		.then(function(querySnapshot) {
			let a = [];
			querySnapshot.forEach(function(doc) {
				a.push(doc.data());
			});
			callback(a);
		});
	return a;
}

function addQuery(document, payload, db, callback, errorCallback) {
	db.collection(document)
		.add(Object.assign({}, payload))
		.then(function(doc) {
			callback(doc);
		})
		.catch(function(error) {
			errorCallback(error);
		});
}
const dataQuery = {
	searchQuery,
	orderedQuery,
	deleteQuery,
	addQuery
};
export default dataQuery;
