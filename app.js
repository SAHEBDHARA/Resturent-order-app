const form = document.getElementById('userForm');



form.addEventListener('submit', function(event) {
    event.preventDefault();

const price = document.getElementById('price').value;
const dish = document.getElementById('dish').value;
const tableoption = document.getElementById('tableoption').value;


// creating object 
const userData = {
    price: price,
    dish: dish,
    tableoption: tableoption
};

 // pusing the data to data base 

axios.post('https://crudcrud.com/api/520904f9f14f43be8773047ebe65c3b3/resturentdata', userData)
      .then((res)=> console.log(res))
      .catch((err)=> console.log(err))

      populateOrders();
 //  Clear the input fields after submission
      document.getElementById('price').value = '';
      document.getElementById('dish').value = '';
      document.getElementById('tableoption').value = '';

})


function populateOrders() {
    axios.get('https://crudcrud.com/api/520904f9f14f43be8773047ebe65c3b3/resturentdata')
        .then((res) => {
            const restaurantData = res.data;
            console.log(restaurantData)

            
            for (const data of restaurantData) {
                const tableId = `table${data.tableoption}`;
                const table = document.getElementById(tableId);
                const newOrder = document.createElement('li');
                newOrder.textContent = `${data.dish} - $${data.price}`;
                newOrder.classList.add('orders'); 
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.classList.add('delete-button');
                deleteButton.addEventListener('click', function() {
                    // Delete the order from both the UI and the server
                    axios.delete(`https://crudcrud.com/api/520904f9f14f43be8773047ebe65c3b3/resturentdata/${data._id}`)
                        .then(() => {
                            table.removeChild(newOrder); // Remove from UI
                        })
                        .catch((err) => console.error(err));
                });
                newOrder.appendChild(deleteButton);
                table.appendChild(newOrder);

            }
        })
        .catch((err) => console.error(err));
}

// Call the populateOrders function when the page is loaded or refreshed
window.onload = populateOrders;





