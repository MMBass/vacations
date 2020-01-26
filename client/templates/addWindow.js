export default `
    <form id="form-add" class="col-10">
        <textarea name="" id="descInput" class="form-control" placeholder="description" required="" autofocus>Description</textarea>

        <input type="number" id="priceInput" class="form-control" placeholder="price" required="" value="00">

        <input type="url" id="imgInput" class="form-control" placeholder="imgUrl" required="" value="https://www.connections.be/~/media/images/connections/wom/emiraten/touring-abu-dhabi-and-dubai/1-abu-dhabi-aerial.jpg?bc=ffffff">

        <input type="date" id="dateInput" class="form-control" placeholder="date" required="" value="1111-11-11">

        <button id="sendAdd" class="btn btn-sm btn-success btn-block" type="submit">Send</button>
    </form>`