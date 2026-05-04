chrome.storage.local.get("data", (result) => {
    let data = result.data || {};
    let output = "";

    let totalTime = 0;

    for (let site in data) {
        let seconds = Math.floor(data[site] / 1000);
        totalTime += seconds;

        output += `
            <div class="site">
                <b>${site}</b><br>
                ⏱ ${seconds} seconds
            </div>
        `;
    }

    if (Object.keys(data).length === 0) {
        output = "<p>No data yet. Start browsing 🙂</p>";
    } else {
        output += `<hr><p><b>Total Time:</b> ${totalTime} sec</p>`;
    }

    document.getElementById("output").innerHTML = output;
});