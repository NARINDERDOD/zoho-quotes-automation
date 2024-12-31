void automation.testing(Int Quotes_id)
{
// Fetch the Quote Record
Quotes_Details = zoho.crm.getRecordById("Quotes",Quotes_id);
info Quotes_Details;
Product_info = Quotes_Details.get("Product_Details");
subject = Quotes_Details.get("Subject");
info Product_info;
// Initialize the subform data list
quotedItemsData = list();
count = 0;
// Initialize counter
value_ = zoho.crm.getOrgVariable("createdProduct").toLong();
// Fetch and convert value to a number
info "The value of the custom variable, createdProduct, is " + value_;
sufromID_list = List();
// Initialize a list to store subform IDs
// Loop through existing parent products
for each  product in Product_info
{
	count = count + 1;
	// Increment the counter
	subformId = product.get("id");
	// Get the subform ID
	sufromID_list.add(subformId);
	// Add subform ID to the list
	parentProductMap = Map();
	parentProductMap.put("Product_Name",product.get("product").get("id"));
	parentProductMap.put("List_Price",product.get("list_price"));
	parentProductMap.put("Child_Product","");
	parentProductMap.put("Quantity",product.get("quantity"));
	if(count <= value_)
	{
		parentProductMap.put("id",subformId);
		// Add the id field for the first `value_` records
	}
	quotedItemsData.add(parentProductMap);
	// Fetch related child products
	productID = product.get("product").get("id");
	childProducts = zoho.crm.getRelatedRecords("Child_Product1","Products",productID);
	// Add child products immediately after the parent
	for each  child in childProducts
	{
		if(child.get("Product_Name") != null)
		{
			childProductMap = Map();
			childProductMap.put("Product_Name",child.get("id"));
			childProductMap.put("List_Price",child.get("Unit_Price"));
			childProductMap.put("Child_Product","Yes");
			childProductMap.put("Quantity",1);
			quotedItemsData.add(childProductMap);
		}
	}
}
info "quotedItemsData: " + quotedItemsData;
// Debug the generated data
// Prepare the payload for the API call
payload = Map();
recordsList = List();
quotedItemsList = List();
productID_listForEdit = List();
for each  productData in quotedItemsData
{
	item = Map();
	if(productData.contains("id"))
	{
		item.put("id",productData.get("id"));
		// Include id for the first `value_` records
	}
	item.put("Product_Name",productData.get("Product_Name"));
	item.put("Quantity",productData.get("Quantity"));
	item.put("List_Price",productData.get("List_Price"));
	item.put("Total",null);
	item.put("Discount",null);
	item.put("Tax",null);
	item.put("Net_Total",null);
	// Add child product details if present
	if(productData.contains("Child_Product"))
	{
		item.put("Child_Product",productData.get("Child_Product"));
	}
	quotedItemsList.add(item);
	productID_listForEdit.add(productData.get("Product_Name"));
}
// Build the main record
record = Map();
record.put("id",Quotes_id);
record.put("Quoted_Items",quotedItemsList);
recordsList.add(record);
// Add the records list to the payload
payload.put("data",recordsList);
// Log the final payload for debugging
info "Payload: " + payload;
// Send the API request
responsePUT = invokeurl
[
	url :"https://www.zohoapis.com/crm/v7/Quotes"
	type :PUT
	parameters:payload.toString()
	connection:"zohocrm"
];
info "Response: " + responsePUT;
info productID_listForEdit;
valueMap = Map();
valueMap.put("apiname","SubformIDS");
valueMap.put("value",productID_listForEdit);
resp = zoho.crm.invokeConnector("crm.set",valueMap);
info resp;
}
