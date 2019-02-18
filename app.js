let rIndex = false, table = document.getElementById("table");

    // check name
    function checkUniqueName(name) {
      let existName = [];

      for (var i = 1; i < table.rows.length ; i++) {
        existName.push(table.rows[i].cells[1].textContent);
      }

      if(existName.includes(name)) {
        return true
      } else {
        return false
      }
    }

    // check format and empty
    function checkInput() {
      let isEmpty = false,
      name = document.getElementById("name").value,
      phone = document.getElementById("phone").value,
      email = document.getElementById("email").value,
      emailRegEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
      phoneno = /^\(?([0-9]{2})\)?[-]?([0-9]{7})$/;

      if(email === '') {
        alert('Email cannot be empty!');
      } else if (email.search(emailRegEx) == -1) {
        alert("Please enter a valid email address.");
      } else if (phone && phone.search(phoneno)) {
        alert("Please enter a valid phone. ex. 02-1234567");
      } else if (name && checkUniqueName(name) && rIndex === false) {
        alert("Name has already existed.");
      } else {
        isEmpty = true;
      }

      return isEmpty;
    }

    // select row
    function selectedRowToInput(event) {

      for (var i = 1; i < table.rows.length ; i++) {
        table.rows[i].onclick = function() {
          rIndex = this.rowIndex;
          document.getElementById("name").value = this.cells[1].innerHTML;
          document.getElementById("phone").value = this.cells[2].innerHTML;
          document.getElementById("email").value = this.cells[3].innerHTML;
          console.log(rIndex);
        }
      }
    }

    // clear form
    function clearForm() {
      document.getElementById("name").value = '';
      document.getElementById("phone").value = '';
      document.getElementById("email").value = '';
    }

    // add row
    function addHtmlTableRow() {
      if(checkInput()) {
        let rowCount = table.rows.length,
          newRow = table.insertRow(table.length),
          cell1 = newRow.insertCell(0),
          cell2 = newRow.insertCell(1),
          cell3 = newRow.insertCell(2),
          cell4 = newRow.insertCell(3),
          cell5 = newRow.insertCell(4),
          cell6 = newRow.insertCell(5),
          name = document.getElementById("name").value,
          phone = document.getElementById("phone").value,
          email = document.getElementById("email").value;

        console.log(rowCount);

        cell1.innerHTML = rowCount;
        cell2.innerHTML = name;
        cell3.innerHTML = phone;
        cell4.innerHTML = email;
        cell5.innerHTML = cell6.innerHTML + "<button onclick='selectedRowToInput(event)'; class='btn btn-success'>Edit</button>";
        cell6.innerHTML = cell6.innerHTML + "<button onclick='deleteHtmlTableRow()'; class='btn btn-danger'>Remove</button>";
      }

      clearForm();
    }

    // edit row
    function editHtmlTableSelecteRow() {
      if(rIndex) {
        if(checkInput()) {
          let name = document.getElementById("name").value,
            phone = document.getElementById("phone").value,
            email = document.getElementById("email").value;

          table.rows[rIndex].cells[1].innerHTML = name;
          table.rows[rIndex].cells[2].innerHTML = phone;
          table.rows[rIndex].cells[3].innerHTML = email;

          clearForm();
        }
      } else {
          alert("You haven't selected any row.")
      }
    }

    // delete row
    function deleteHtmlTableRow() {
      let result = confirm("Are you sure to delete?");
      if (result) {
        let rowCount = table.rows.length;

        for (var i = 1; i < table.rows.length ; i++) {
          table.rows[i].onclick = function() {
            rIndex = this.rowIndex;
            console.log(rIndex);

            table.deleteRow(rIndex);

            // dynamic row number
            for (var n = rIndex; n < table.rows.length ; n++) {
              table.rows[n].cells[0].innerHTML = table.rows[n].cells[0].innerHTML - 1;
            }
          }
          break;
        }
      }
    }
