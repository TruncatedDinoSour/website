"use strict";

function main() {
    document.getElementById("export-button").addEventListener("click", () => {
        if (!window.localStorage.length) {
            alert("No data to export");
            return;
        }

        document.getElementById("export").value = btoa(
            JSON.stringify(window.localStorage)
        );
    });

    document.getElementById("import-button").addEventListener("click", () => {
        let import_data = document.getElementById("import").value;

        if (!import_data) {
            alert("No import data provided");
            return;
        }

        try {
            let data = JSON.parse(atob(import_data));

            if (!Object.keys(data).length) {
                alert("Cannot import no data");
                return;
            }

            if (!confirm("Are you sure you want to import this data?")) return;

            if (
                confirm(
                    "Do you want to overwrite your data fully (OK) or overwrite the parts that are in the data (CANCEL)"
                )
            )
                window.localStorage.clear();

            Object.keys(data).forEach((k) => localStorage.setItem(k, data[k]));

            alert("Data imported");
        } catch (e) {
            alert(`Invalid data provided: ${e}`);
            return;
        }

        window.location.href = "/";
    });
}

document.addEventListener("DOMContentLoaded", main);
