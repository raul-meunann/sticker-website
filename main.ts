import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

let handler = async (req: Request): Promise<Response> => {
  let html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>JETZT STICKER KAUFEN!</title>
      </head>
      <body>
        <h1>Preis-Berechnung</h1>

        <p>Größe / Form: </p>
        <select id="sticker-type">
          <option value="55e">5cm x 5cm eckig</option>
          <option value="55r">5cm x 5cm rund</option>
        </select>

        <p>Stückzahl: </p>
        <select id="sticker-amount">
          <option value="0.15">1</option>
          <option value="2.00">20</option>
          <option value="3.75">40</option>
          <option value="5.25">60</option>
          <option value="6.75">80</option>
          <option value="7.5">100</option>
        </select>

        <p>Preis: <span id="sticker-price"></span>€</p>

        <script>
          let stickerType = document.getElementById('sticker-type');
          let stickerAmount = document.getElementById('sticker-amount');
          let stickerPrice = document.getElementById('sticker-price');

          let price = 0;

          let calculatePrice = () => {
            switch(stickerType.value) {
              case '55e':
                price = parseFloat(stickerAmount.value);
                break;
              case '55r':
                price = parseFloat(stickerAmount.value) * 2;
                break;
            }

            stickerPrice.innerHTML = price;
          }

          stickerType.onchange = calculatePrice;
          stickerAmount.onchange = calculatePrice;

          calculatePrice();
        </script>

        ${ new URL(req.url).pathname == '/' ? "" : "<script>location.replace('/');</script>" }
      </body>
    </html>
  `;

  return new Response(html, {
    status: 200,
    headers: {
      "content-type": "text/html"
    }
  });
}

serve(handler, { port: 3000 });