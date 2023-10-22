var hip_UserID;


// Ideally one of these would be used to load all tables on page load,
// but due to the nature of this project, this script exists after page load.

//window.onload = () => {
//    hip_resyncTable("table");
//};

//document.addEventListener("DOMContentLoaded", function () {
//    hip_resyncTable("table");
//});

// Switch to sub screens within the module
function hip_switchScreen(screen_name) {
    var pages = document.getElementsByClassName("hip_screen");
    var shownScreen = document.getElementById(screen_name);
    shown_screen = shownScreen;
    for (var i = 0; i < pages.length; i++) {
        pages[i].style.display = "none";
    }
    shownScreen.style.display = "block";

}

// get current date in preferred string format
function hip_currentTime() {
    const current_date = new Date()
    return current_date.getFullYear() + "-" +
        String(current_date.getMonth() + 1).padStart(2, '0') + "-" +
        String(current_date.getDate()).padStart(2, '0') + "T" +
        String(current_date.getHours()).padStart(2, '0') + ":" +
        String(current_date.getMinutes()).padStart(2, '0') + ":" +
        String(current_date.getSeconds()).padStart(2, '0');
}

function hip_newEntry(table) {
    if (table == "mms_Address") {
        let html_table = document.getElementById("hip_mms_Address_table");

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
                        <th>` + hip_currentTime() + `</th> <!-- PostDate -->
                    </tr>`

        html_table.children[1].insertAdjacentHTML('beforeend', row_body);
    }
    else if (table == "hip_HiveHeader") {
        let html_table = document.getElementById("hip_HiveHeader_table");

        // find the lowest available hive id
        let lowest_hive_id = 1;
        let hive_ids = [];

        // start at 1 to skip header row
        for (let i = 0; i < html_table.children[1].childElementCount; i++) {
            // This is stupid but it selects the right thing assuming the table structure doesn't change.
            hive_ids.push(parseInt(html_table.children[1].children[i].children[1].innerHTML))
        }
        // once added all hive ids, sort them and check for the lowest.
        hive_ids.sort().forEach((hive) => {
            if (lowest_hive_id == hive) {
                lowest_hive_id++;
            }
            else return;
        });
        const row_body = `<tr>
                        <th><button onclick="this.parentNode.parentNode.remove()">-</button></th>
                        <th>` + lowest_hive_id + `</th> <!-- HiveID -->
                        <th>1</th> <!-- UserID -->
                        <td><input type="text" maxlength="10"></td> <!-- HiveCode -->
                        <td><input type="text" maxlength="50" oninput="this.value = parseInt(this.value) ? this.value : ''"></td> <!-- AddressID -->
                        <td><input type="text" maxlength="25" oninput="this.value = parseInt(this.value) ? this.value : ''"></td> <!-- Supers_Cnt -->
                        <td><input type="text" maxlength="25" oninput="this.value = parseInt(this.value) ? this.value : ''"></td> <!-- Frames -->
                        <td><input type="text" maxlength="10"></td> <!-- Queen_Type -->
                        <td><input type="text" maxlength="25"></td> <!-- Queen_DOB -->
                        <td><input type="checkbox"></td> <!-- Queen_Clipped -->
                        <td><input type="checkbox"></td> <!-- Queen_Marked -->
                        <td><input type="text" maxlength="500"></td> <!-- Notes -->
                        <th>Not available.</th> <!-- Images -->
                        <th>` + hip_currentTime() + `</th> <!-- PostDate -->
                    </tr>`

        html_table.children[1].insertAdjacentHTML('beforeend', row_body);
    }
    else if (table == "hip_HiveInspectiondetails") {
        let html_table = document.getElementById("hip_HiveInspectiondetails_table");

        // find the lowest available hive id
        let lowest_inspection_id = 1;
        let inspection_ids = [];

        // start at 1 to skip header row
        for (let i = 0; i < html_table.children[1].childElementCount; i++) {
            // This is stupid but it selects the right thing assuming the table structure doesn't change.
            inspection_ids.push(parseInt(html_table.children[1].children[i].children[1].innerHTML))
        }
        // once added all address ids, sort them and check for the lowest.
        inspection_ids.sort().forEach((inspection) => {
            if (lowest_inspection_id == inspection) {
                lowest_inspection_id++;
            }
            else return;
        });
        const row_body = `<tr>
                        <th><button onclick="this.parentNode.parentNode.remove()">-</button></th>
                        <th>` + lowest_inspection_id + `</th> <!-- InspectionID -->
                        <th>1</th> <!-- HiveID -->
                        <td><input type="text" maxlength="25"></td> <!-- InspDate -->
                        <td><input type="text" maxlength="7"></td> <!-- InspTime -->
                        <td><input type="text" maxlength="10"></td> <!-- Condition -->
                        <td><input type="text" maxlength="10"></td> <!-- Temperament -->
                        <td><input type="text" maxlength="10"></td> <!-- Population -->
                        <td><input type="text" maxlength="25" oninput="this.value = parseInt(this.value) ? this.value : ''"></td> <!-- FCnt_Honey -->
                        <td><input type="text" maxlength="25" oninput="this.value = parseInt(this.value) ? this.value : ''"></td> <!-- FCnt_Brood -->
                        <td><input type="text" maxlength="25" oninput="this.value = parseInt(this.value) ? this.value : ''"></td> <!-- FCnt_Pollen -->
                        <td><input type="text" maxlength="25" oninput="this.value = parseInt(this.value) ? this.value : ''"></td> <!-- FCnt_Empty -->
                        <td><input type="text" maxlength="25" oninput="this.value = parseInt(this.value) ? this.value : ''"></td> <!-- FCnt_Drone -->
                        <td><input type="text" maxlength="50" oninput="this.value = parseInt(this.value) ? this.value : ''"></td> <!-- FCon_Honey -->
                        <td><input type="text" maxlength="50" oninput="this.value = parseInt(this.value) ? this.value : ''"></td> <!-- FCon_Brood -->
                        <td><input type="text" maxlength="50" oninput="this.value = parseInt(this.value) ? this.value : ''"></td> <!-- FCon_BroodPattern -->
                        <td><input type="text" maxlength="50" oninput="this.value = parseInt(this.value) ? this.value : ''"></td> <!-- FCon_Eggs -->
                        <td><input type="text" maxlength="50" oninput="this.value = parseInt(this.value) ? this.value : ''"></td> <!-- FCon_Pollen -->
                        <td><input type="text" maxlength="50" oninput="this.value = parseInt(this.value) ? this.value : ''"></td> <!-- FCon_Empty -->
                        <td><input type="text" maxlength="50" oninput="this.value = parseInt(this.value) ? this.value : ''"></td> <!-- FCon_Drone -->
                        <td><input type="text" maxlength="500"></td> <!-- Notes -->
                    </tr>`

        html_table.children[1].insertAdjacentHTML('beforeend', row_body);
    }
    else if (table == "hip_HiveHealth") {
        let html_table = document.getElementById("hip_HiveHealth_table");

        // find the lowest available hive id
        let lowest_hivehealth_id = 1;
        let hivehealth_ids = [];

        // start at 1 to skip header row
        for (let i = 0; i < html_table.children[1].childElementCount; i++) {
            // This is stupid but it selects the right thing assuming the table structure doesn't change.
            hivehealth_ids.push(parseInt(html_table.children[1].children[i].children[1].innerHTML))
        }
        // once added all address ids, sort them and check for the lowest.
        hivehealth_ids.sort().forEach((hivehealth) => {
            if (lowest_hivehealth_id == hivehealth) {
                lowest_hivehealth_id++;
            }
            else return;
        });
        const row_body = `<tr>
                        <th><button onclick="this.parentNode.parentNode.remove()">-</button></th>
                        <th>` + lowest_hivehealth_id + `</th> <!-- HiveHealthID -->
                        <td><input type="text" maxlength="25" oninput="this.value = parseInt(this.value) ? this.value : ''"></td> <!-- HiveInspectionID -->
                        <td><input type="text" maxlength="25"></td> <!-- Date -->
                        <td><input type="text" maxlength="25" oninput="this.value = parseInt(this.value) ? this.value : ''"></td> <!-- Irregularity -->
                        <td><input type="text" maxlength="25" oninput="this.value = parseInt(this.value) ? this.value : ''"></td> <!-- Seriousness -->
                        <td><input type="text" maxlength="500"></td> <!-- Notes -->
                    </tr>`

        html_table.children[1].insertAdjacentHTML('beforeend', row_body);


    // HiveInspectionNotes is disabled due to the only useful fields being sqlbinaries - which are not handled front end.

    //}
    //else if (table == "hip_HiveInspectionNotes") {
    //    let html_table = document.getElementById("hip_HiveInspectionNotes_table");


    //    const row_body = `<tr>
    //                    <th><button onclick="this.parentNode.parentNode.remove()">-</button></th>
    //                    <td><input type="text" maxlength="25" oninput="this.value = parseInt(this.value) ? this.value : ''"></td> <!-- HiveInspectionNoteID -->
    //                    <td><input type="text" maxlength="25" oninput="this.value = parseInt(this.value) ? this.value : ''"></td> <!-- HiveInspectionID -->
    //                    <th>Not Available.</th> <!-- Images -->
    //                    <td><input type="text" maxlength="500"></td> <!-- Notes -->
    //                </tr>`

    //    html_table.children[1].insertAdjacentHTML('beforeend', row_body);


    } else return;
}



// Old add row function

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
    if (table == "mms_Address") {
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

    if (table == "mms_Address") { // fetch addresses from database.

        fetch("/api/hip/get_mms_Address", { // fetch to the api route that is provided in backend, with get if you need
            referer: 'about:client',
            credentials: 'same-origin',
            headers: new Headers({ 'content-type': 'application/ json' }),
        })
        .then(function (response) {
            if (response.status == 200) {
                response.json()
                    .then(data => {

                        // Rebuild table depending on the existing data
                        var html_table = document.getElementById("hip_mms_Address_table");

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
    }
    else if (table == "hip_HiveHeader") {
        fetch("/api/hip/get_hip_HiveHeader", { // fetch to the api route that is provided in backend, with get if you need
            referer: 'about:client',
            credentials: 'same-origin',
            headers: new Headers({ 'content-type': 'application/ json' }),
        })
        .then(function (response) {
            if (response.status == 200) {
                response.json()
                    .then(data => {

                        // Rebuild table depending on the existing data
                        var html_table = document.getElementById("hip_HiveHeader_table");

                        // build table body from data
                        let table_body = "";
                        data.forEach(function (row, row_val) {
                            let q_clipped = (row["QClipped"] == true) ? "checked" : "not_checked"
                            let q_marked = (row["QMarked"] == true) ? "checked" : "not_checked"
                            table_body += `<tr>
                                <th><button onclick="this.parentNode.parentNode.remove()">-</button></th>
                                <th>` + row["HiveID"] + `</th> <!-- HiveID -->
                                <th>` + row["UserID"] + `</th> <!-- UserID -->
                                <td><input type="text" maxlength="10" value="` + row["HiveCode"] + `"></td> <!-- HiveCode -->
                                <td><input type="text" maxlength="50" oninput="this.value = parseInt(this.value) ? this.value : ''" value="` + row["AddressID"] + `"></td> <!-- AddressID -->
                                <td><input type="text" maxlength="25" oninput="this.value = parseInt(this.value) ? this.value : ''" value="` + row["Supers_Cnt"] + `"></td> <!-- Supers_Cnt -->
                                <td><input type="text" maxlength="25" oninput="this.value = parseInt(this.value) ? this.value : ''" value="` + row["Frames"] + `"></td> <!-- Frames -->
                                <td><input type="text" maxlength="10" value="` + row["QType"] + `"></td> <!-- Queen_Type -->
                                <td><input type="text" maxlength="25" value="` + row["QDOB"] + `"></td> <!-- Queen_DOB -->
                                <td><input type="checkbox" ` + q_clipped + `></td> <!-- Queen_Clipped -->
                                <td><input type="checkbox" ` + q_marked + `></td> <!-- Queen_Marked -->
                                <td><input type="text" maxlength="500" value="` + row["Notes"] + `"></td> <!-- Notes -->
                                <th>Not available.</th> <!-- Images -->
                                <th>` + row["PostDate"] + `</th> <!-- PostDate -->
                            </tr>`
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
    }
    else if (table == "hip_HiveInspectionDetails") {
        fetch("/api/hip/get_hip_HiveInspectionDetails", { // fetch to the api route that is provided in backend, with get if you need
            referer: 'about:client',
            credentials: 'same-origin',
            headers: new Headers({ 'content-type': 'application/ json' }),
        })
        .then(function (response) {
            if (response.status == 200) {
                response.json()
                    .then(data => {

                        // Rebuild table depending on the existing data
                        var html_table = document.getElementById("hip_HiveInspectionDetails_table");

                        // build table body from data
                        let table_body = "";
                        data.forEach(function (row, row_val) {
                            table_body += `<tr>
                                <th><button onclick="this.parentNode.parentNode.remove()">-</button></th>
                                <th>` + row["InspectionID"] + `</th> <!-- InspectionID -->
                                <th>` + row["HiveID"] + `</th> <!-- HiveID -->
                                <td><input type="text" maxlength="25" value="` + row["InspDate"] + `"></td> <!-- InspDate -->
                                <td><input type="text" maxlength="7" value="` + row["InspTime"] + `"></td> <!-- InspTime -->
                                <td><input type="text" maxlength="10" value="` + row["Condition"] + `"></td> <!-- Condition -->
                                <td><input type="text" maxlength="10" value="` + row["Temperament"] + `"></td> <!-- Temperament -->
                                <td><input type="text" maxlength="10" value="` + row["Population"] + `"></td> <!-- Population -->
                                <td><input type="text" maxlength="25" oninput="this.value = parseInt(this.value) ? this.value : ''" value="` + row["FCnt_Honey"] + `"></td> <!-- FCnt_Honey -->
                                <td><input type="text" maxlength="25" oninput="this.value = parseInt(this.value) ? this.value : ''" value="` + row["FCnt_Brood"] + `"></td> <!-- FCnt_Brood -->
                                <td><input type="text" maxlength="25" oninput="this.value = parseInt(this.value) ? this.value : ''" value="` + row["FCnt_Pollen"] + `"></td> <!-- FCnt_Pollen -->
                                <td><input type="text" maxlength="25" oninput="this.value = parseInt(this.value) ? this.value : ''" value="` + row["FCnt_Empty"] + `"></td> <!-- FCnt_Empty -->
                                <td><input type="text" maxlength="25" oninput="this.value = parseInt(this.value) ? this.value : ''" value="` + row["FCnt_Drone"] + `"></td> <!-- FCnt_Drone -->
                                <td><input type="text" maxlength="50" oninput="this.value = parseInt(this.value) ? this.value : ''" value="` + row["FCon_Honey"] + `"></td> <!-- FCon_Honey -->
                                <td><input type="text" maxlength="50" oninput="this.value = parseInt(this.value) ? this.value : ''" value="` + row["FCon_Brood"] + `"></td> <!-- FCon_Brood -->
                                <td><input type="text" maxlength="50" oninput="this.value = parseInt(this.value) ? this.value : ''" value="` + row["FCon_BroodPattern"] + `"></td> <!-- FCon_BroodPattern -->
                                <td><input type="text" maxlength="50" oninput="this.value = parseInt(this.value) ? this.value : ''" value="` + row["FCon_Eggs"] + `"></td> <!-- FCon_Eggs -->
                                <td><input type="text" maxlength="50" oninput="this.value = parseInt(this.value) ? this.value : ''" value="` + row["FCon_Pollen"] + `"></td> <!-- FCon_Pollen -->
                                <td><input type="text" maxlength="50" oninput="this.value = parseInt(this.value) ? this.value : ''" value="` + row["FCon_Empty"] + `"></td> <!-- FCon_Empty -->
                                <td><input type="text" maxlength="50" oninput="this.value = parseInt(this.value) ? this.value : ''" value="` + row["FCon_Drone"] + `"></td> <!-- FCon_Drone -->
                                <td><input type="text" maxlength="500" value="` + row["Notes"] + `"></td> <!-- Notes -->
                            </tr>`
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
    }
    else if (table == "hip_HiveHealth") {
        fetch("/api/hip/get_hip_HiveHealth", { // fetch to the api route that is provided in backend, with get if you need
            referer: 'about:client',
            credentials: 'same-origin',
            headers: new Headers({ 'content-type': 'application/ json' }),
        })
            .then(function (response) {
                if (response.status == 200) {
                    response.json()
                        .then(data => {

                            // Rebuild table depending on the existing data
                            var html_table = document.getElementById("hip_HiveHealth_table");

                            // build table body from data
                            let table_body = "";
                            data.forEach(function (row, row_val) {
                                table_body += `<tr>
                                    <th><button onclick="this.parentNode.parentNode.remove()">-</button></th>
                                    <th>` + row["HiveHealthID"] + `</th> <!-- HiveHealthID -->
                                    <td><input type="text" maxlength="25" oninput="this.value = parseInt(this.value) ? this.value : ''" value="` + row["HiveInspectionID"] + `"></td> <!-- HiveInspectionID -->
                                    <td><input type="text" maxlength="25" value="` + row["Date"] + `"></td> <!-- Date -->
                                    <td><input type="text" maxlength="25" oninput="this.value = parseInt(this.value) ? this.value : ''" value="` + row["Irregularity"] + `"></td> <!-- Irregularity -->
                                    <td><input type="text" maxlength="25" oninput="this.value = parseInt(this.value) ? this.value : ''" value="` + row["Seriousness"] + `"></td> <!-- Seriousness -->
                                    <td><input type="text" maxlength="500" value="` + row["Notes"] + `"></td> <!-- Notes -->
                                </tr>`
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

    if (table == "mms_Address") { // fetch hive locations from database.
        let html_table_data = document.getElementById("hip_mms_Address_table").rows;
        let json_table = [];
        console.log(html_table_data);

        for (let i = 1; i < html_table_data.length; i++) { // i starts at 1 to avoid the header row.
            let html_row_data = html_table_data[i].children;
            var json_row = {};

            json_row.AddressID = html_row_data[1].innerHTML;
            json_row.UserID = html_row_data[2].innerHTML;
            json_row.AddressType = html_row_data[3].firstChild.value;
            json_row.Address1 = html_row_data[4].firstChild.value;
            json_row.Address2 = html_row_data[5].firstChild.value;
            json_row.Address3 = html_row_data[6].firstChild.value;
            json_row.City = html_row_data[7].firstChild.value;
            json_row.PostCode = html_row_data[8].firstChild.value;
            json_row.RegionalCouncil = html_row_data[9].firstChild.value;
            json_row.State = html_row_data[10].firstChild.value;
            json_row.Country = html_row_data[11].firstChild.value;
            json_row.PostDate = html_row_data[12].innerHTML;

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
        fetch("/api/hip/post_mms_Address", {
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