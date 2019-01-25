module.exports = (req, res) => {
    function renderFullPage() {
        return `
            <!doctype html>
            <html>
                <head>
                    <title>Wasm React</title>
                </head>
                <body>
                        <div id="root">
                        </div>
                        <script src="bundle.js"></script>
                </body>
            </html>
        `;
    }

    res.send(renderFullPage());
}