var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
});

connection.query("SELECT * FROM bamazon.products", function(err, result, fields) {
    if (err) throw err;
    console.log(result);
    runPurchase();
});

function runPurchase() {
    inquirer
        .prompt([{
                type: "input",
                name: "item_id",
                message: "Enter the item_id of the product you would like to buy."
            }, {
                type: "input",
                name: "quantity",
                message: "Enter the quantity of the product you would like to buy."
            }

        ]).then(function(answer) {
            var item = answer.item_id;
            var quantity = answer.quantity;

            console.log("You have selected quantity " + quantity + " of item_id #" + item);

            var query = 'SELECT * FROM products WHERE ?';

            connection.query(query, { item_id: item }, function(err, data) {
                if (err) throw err;

                if (data.length === 0) {
                    console.log("Oops!: Invalid item_id. Please select a valid item_id from the list above.");
                    runPurchase();
                } else {
                    var productData = data[0];

                    if (quantity <= productData.stock_quantity) {
                        console.log("Thank You! Checking stock...");

                        var updateQuery = "UPDATE products SET stock_quantity = " + (productData.stock_quantity - quantity) + " WHERE item_id = " + item;

                        connection.query(updateQuery, function(err, data) {
                            if (err) throw err;

                            setTimeout(function() {
                                console.log("Order placed! Your total came to $" + productData.price * quantity)
                            }, 3000);

                            connection.end();

                        }) //end of connection.query line 58

                    } else {

                        setTimeout(function() {
                            console.log("Not enough inventory in stock, please adjust your quantity");
                            runPurchase();
                        }, 3000);

                    }; //end of else statement line 70
                }; //end of else statement line 50
            }); //end of connection.query function
        }); //end of .then function
}; //end of runPurchase function