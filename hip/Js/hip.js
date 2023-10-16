
// Ideally one of these would be used to load all tables on page load,
// but due to the nature of this project, this script exists after page load.

//window.onload = () => {
//    hip_resyncTable("locations");
//};

//document.addEventListener("DOMContentLoaded", function () {
//    hip_resyncTable("locations");
//});

// Switch to sub screens within the module
function hip_switchScreen(screen_name) {
    var pages = document.getElementsByClassName("hip_screen");
    var shownScreen = document.getElementById(screen_name);
    for (var i = 0; i < pages.length; i++) {
        pages[i].style.display = "none";
    }
    shownScreen.style.display = "block";

    // resync tables when opening screens.
    if (screen_name == "hip_mms_locations")
        hip_resyncTable("mms_locations");
}

function hip_newEntry(table) {
    if (table == "mms_locations") {
        let html_table = document.getElementById("hip_mms_locations_table");

        // find the lowest available address id
        let lowest_address_id = 1;
        let address_ids = [];
        // start at 1 to skip header row
        for (let i = 0; i < html_table.children[1].childElementCount; i++) {
            // This is stupid but it selects the right thing assuming the table structure doesn't change.
            address_ids.push(parseInt(html_table.children[1].children[i].children[1].innerHTML))
        }
        // once added all address ids, sort them and check for the lowest.
        address_ids.sort().forEach((address) => {
            if (lowest_address_id == address) {
                lowest_address_id++;
            }
            else return;
        });

        console.log(lowest_address_id)

        // get current date in preferred string format
        const current_date = new Date()
        const formatted_date = current_date.getFullYear() + "-" +
            String(current_date.getMonth()).padStart(2, '0') + "-" +
            String(current_date.getDate()).padStart(2, '0') + "T" +
            String(current_date.getHours()).padStart(2, '0') + ":" +
            String(current_date.getMinutes()).padStart(2, '0') + ":" +
            String(current_date.getSeconds()).padStart(2, '0')

        const row_body = `<tr>
                        <th><button onclick="this.parentNode.parentNode.remove()">-</button></th>
                        <th>` + lowest_address_id + `</th> <!-- AddressID -->
                        <th>1</th> <!-- UserID -->
                        <td><input type="text" maxlength="5"></td> <!-- AddressType -->
                        <td><input type="text" maxlength="50"></td> <!-- Address1 -->
                        <td><input type="text" maxlength="50"></td> <!-- Address2 -->
                        <td><input type="text" maxlength="50"></td> <!-- Address3 -->
                        <td><input type="text" maxlength="25"></td> <!-- City -->
                        <td><input type="text" maxlength="5"></td> <!-- PostCode -->
                        <td><input type="text" maxlength="25"></td> <!-- RegionalCouncil -->
                        <td><input type="text" maxlength="5"></td> <!-- State -->
                        <td><input type="text" maxlength="5" oninput="this.value = parseInt(this.value) ? this.value : ''"></td> <!-- Country -->
                        <th>` + formatted_date + `</th> <!-- PostDate -->
                    </tr>`

        html_table.children[1].insertAdjacentHTML('beforeend', row_body);
    } else return;
}

//function hip_addRow(table) {
//    if (table == "locations") {
//        let html_table = document.getElementById("hip_location_table");
//        // empty row html string (this is silly)
//        let next_ID = html_table.children[1].children.length + 1;
//        console.log(html_table.children[1]);

//        // 1 isn't the user id and next_ID is a bad way of displaying addressID for new rows.
//        let table_body = "\n<tr>\n<th>" + next_ID + "</th><th>" + 1 + "</th>";
//        for (let i = 0; i < 9; i++) {
//            table_body += "<td contenteditable=\"true\"></td>";
//        }
//        table_body += "<th></th>\n</tr>";

//        html_table.children[1].insertAdjacentHTML('beforeend', table_body);
//    } else return;
//}

function hip_delRow(table) {
    if (table == "mms_locations") {
        var html_table = document.getElementById("hip_location_table");
        // delete the last row
        let next_ID = html_table.children[1].removeChild(html_table.children[1].lastChild);

        html_table.children[1].insertAdjacentHTML('beforeend', table_body);
    } else {
        return;
    }
}

// Populates table with data from the database
function hip_resyncTable(table) {
    // check that the user wants to resync the table.
    if (window.confirm("Resyncing tables will reset any modifications you have made. Are you sure?") == false)
        return;

    if (table == "mms_locations") { // fetch hive locations from database.

        fetch("/api/hip/getLocations", { // fetch to the api route that is provided in backend, with get if you need
            referer: 'about:client',
            credentials: 'same-origin',
            headers: new Headers({ 'content-type': 'application/ json' }),
        })
            .then(function (response) {
                if (response.status == 200) {
                    response.json()
                        .then(data => {

                            // Rebuild table depending on the existing data
                            var html_table = document.getElementById("hip_mms_locations_table");

                            // build table body from data
                            let table_body = "";
                            data.forEach(function (row, row_val) {
                                table_body += `<tr>
                                    <th><button onclick="this.parentNode.parentNode.remove()">-</button></th>
                                    <th>` + row["AddressID"] + `</th> <!-- AddressID -->
                                    <th>` + row["UserID"] + `</th> <!-- UserID -->
                                    <td><input type="text" maxlength="5" value="` + row["AddressType"] + `"></td> <!-- AddressType -->
                                    <td><input type="text" maxlength="50" value="` + row["Address1"] + `"></td> <!-- Address1 -->
                                    <td><input type="text" maxlength="50" value="` + row["Address2"] + `"></td> <!-- Address2 -->
                                    <td><input type="text" maxlength="50" value="` + row["Address3"] + `"></td> <!-- Address3 -->
                                    <td><input type="text" maxlength="25" value="` + row["City"] + `"></td> <!-- City -->
                                    <td><input type="text" maxlength="5" value="` + row["PostCode"] + `"></td> <!-- PostCode -->
                                    <td><input type="text" maxlength="25" value="` + row["RegionalCouncil"] + `"></td> <!-- RegionalCouncil -->
                                    <td><input type="text" maxlength="5" value="` + row["State"] + `"></td> <!-- State -->
                                    <td><input type="text" maxlength="5" oninput="this.value = parseInt(this.value) ? this.value : ''" value="` + row["Country"] + `"></td> <!-- Country -->
                                    <th>` + row["PostDate"] + `</th> <!-- PostDate -->
                                </tr>`

                                //table_body += "<tr>\n<th>"
                                //    + "</th><th>" + row["AddressID"]
                                //    + "</th><th>" + row["UserID"]
                                //    + "</th><td contenteditable=\"true\">" + row["AddressType"]
                                //    + "</td><td contenteditable=\"true\">" + row["Address1"]
                                //    + "</td><td contenteditable=\"true\">" + row["Address2"]
                                //    + "</td><td contenteditable=\"true\">" + row["Address3"]
                                //    + "</td><td contenteditable=\"true\">" + row["City"]
                                //    + "</td><td contenteditable=\"true\">" + row["PostCode"]
                                //    + "</td><td contenteditable=\"true\">" + row["RegionalCouncil"]
                                //    + "</td><td contenteditable=\"true\">" + row["State"]
                                //    + "</td><td contenteditable=\"true\">" + row["Country"]
                                //    + "</td><th>" + row["PostDate"]
                                //    + "</th>\n</tr>";
                            })

                            // replace current body with new body
                            html_table.children[1].innerHTML = table_body;

                        })
                } else {
                    window.alert("failed!!")
                }
            }
            ).catch(function (err) {
                console.log(err);
            });
    } else {
        window.alert("Unexpected parameter given for hip_resyncTable().");
    }
}

function hip_uploadTable(table) {
    // check that the user wants to resync the table.
    if (window.confirm("Are you sure you want to upload the table? Previous entries will not be saved.") == false)
        return;

    if (table == "mms_locations") { // fetch hive locations from database.
        let html_table_data = document.getElementById("hip_mms_locations_table").rows;
        let json_table = [];
        console.log(html_table_data);

        for (let i = 1; i < html_table_data.length; i++) { // i starts at 1 to avoid the header row.
            let html_row_data = html_table_data[i].children;
            var json_row = {};

            json_row.AddressID = html_table_data[i].children[1].innerHTML;
            json_row.UserID = html_table_data[i].children[2].innerHTML;
            json_row.AddressType = html_table_data[i].children[3].firstChild.value;
            json_row.Address1 = html_table_data[i].children[4].firstChild.value;
            json_row.Address2 = html_table_data[i].children[5].firstChild.value;
            json_row.Address3 = html_table_data[i].children[6].firstChild.value;
            json_row.City = html_table_data[i].children[7].firstChild.value;
            json_row.PostCode = html_table_data[i].children[8].firstChild.value;
            json_row.RegionalCouncil = html_table_data[i].children[9].firstChild.value;
            json_row.State = html_table_data[i].children[10].firstChild.value;
            json_row.Country = html_table_data[i].children[11].firstChild.value;
            json_row.PostDate = html_table_data[i].children[12].innerHTML;

            json_table.push(json_row); // add row entry to list


            // old code

            //for (let j = 0; j < html_row_data.length; j++) {
            //    // convert to the correct datatype
            //    if (j <= 1 || j == html_row_data.length - 1)
            //        json_row.push(Number(html_row_data[j].innerHTML));
            //    // this part may be problematic and would need actual front end datetime implementation.
            //    else if (j == html_row_data.length)
            //        json_row.push(new Date(html_row_data[j].innerHTML));
            //    else
            //        json_row.push(html_row_data[j].innerHTML);
            //}
            //json_table.push(json_row);
        }

        console.log(json_table);
        const data = JSON.stringify(json_table);

        // push to DB
        fetch("/api/hip/postLocations", {
            method: 'POST',
            referer: 'about:client',
            credentials: 'same-origin',
            headers: new Headers({ 'content-type': 'application/ json' }),
            body: data,
        })
            .then(function (response) {
                if (response.status == 200) {
                    response.json()
                        .then(() => {
                            window.alert("Success!")
                        })
                } else {

                }
            }
            ).catch(function (err) {
                
            });


    } else {
        window.alert("Unexpected parameter given for hip_uploadTable().");
    }
}


// Example JS
function exampleTest() {
    fetch("/api/hip/Test", { // fetch to the api route that is provided in backend, with get if you need
        referer: 'about:client',
        credentials: 'same-origin',
        headers: new Headers({ 'content-type': 'application/ json' }),
    })
        .then(function (response) {
            if (response.status == 200) {
                response.json()
                    .then(data => {
                        window.alert(data)
                    })
            } else {
                window.alert("failed!!")
            }

        }
        ).catch(function (err) {

        })
}

/*
function login(event) {
    event.preventDefault();
     var email = document.getElementById ("login-email")
     var password = document.getElementById("login-password")

     const data = JSON.stringify({
         'id': parseInt(0),

         "email": email.value,
         "group": email.value,

         "password": password.value,
     })
     fetch("/api/User/login", {
         method: 'POST',
         referer: 'about:client',
         credentials: 'same-origin',
         headers: new Headers({ 'content-type': 'application/ json' }),
         body: data,
     })
         .then(function (response) {
             if (response.status == 202) {
                 response.json()
                     .then(data => {
                       
                     })
             } else {
               
             }

         }
         ).catch(function (err) {

         })
 };*/
 // this is just a example function with post method

 // better to use [ModuleName]+function as function name to prevent duplicate name with other module functions.