# bamazon-app


WELCOME TO THE BAMAZON STORE!

This is a node.js application that allows the user to view and purchase listed
products.  It is connected to a mySQL database and updates product quantities
as the user purchases them. Currently the sole app is bamazonCustomer.js


Instructions on how to use the Bamazon App...

using your terminal, enter in the following command:
	node bamazonCustomer.js

This will provide a list of all the available products for sale. 

The program will prompt for an item id which corresponds 
to the item you would like to purchase.

Enter the item id, then Enter the quantity

The program will check stock for the item chosen and place the order if
there is sufficient quantity in stock.
If there is insufficient quantity, it will display an error and re-prompt
the user to select a different quantity. 