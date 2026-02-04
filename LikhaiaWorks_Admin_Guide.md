# 🎨 LIKHAIAWORKS | Website Admin Guide

Welcome to your website management guide! Follow these steps to keep your shop updated with your latest and greatest crafts.

---

## 📁 1. Preparing Your Photos
Before updating the website, always put your new photos here:
**Folder:** `assets/images/`

*   **Tip:** Use simple names (e.g., `stickers-new.jpg`) and keep file sizes small (under 500KB) for fast loading.

---

## 🖼️ 2. Changing Main Images
...
    `<link rel="icon" type="image/png" href="assets/images/favicon.png">`

---

## 🌐 2.6 Creating a Pro Social Share Banner
When you share your link on Messenger/Facebook, you want it to look amazing.
1.  Create a **1200 x 630 pixel** design (this is the standard size).
2.  Put your logo in the center, add your tagline ("Handmade with Love"), and maybe a collage of your best products in the background.
3.  Save it as **`social-share.jpg`**.
4.  Upload it to the `assets/images/` folder.
5.  *Note: It may take Facebook a few hours to "refresh" their cache and see the new image.*

---

## 📸 3. Adding or Editing Product Samples
The "View Samples" popup gallery is controlled in the JavaScript file.

1.  Open **`js/main.js`**.
2.  Find the `const sampleData` section.
3.  To add a new sample, add a new line inside the relevant category:
    ```javascript
    stickers: [
        { url: 'assets/images/old-photo.jpg', id: 'LW-ST-01' },
        { url: 'assets/images/new-photo.jpg', id: 'LW-ST-02' } // <-- Add new ones like this
    ],
    ```
*   **Reference Codes (ID):** Use a unique ID for each photo. This ID is automatically sent to you when a customer clicks "Order This"!

---

## 💰 4. Updating Prices
1.  Open **`index.html`**.
2.  Search for the class `class="price"`.
3.  Change the text inside the `<p>` tag:
    ```html
    <p class="price">Starting at ₱89.00</p>
    ```

---

## 🚀 5. Making Changes Live (GitHub)
Whenever you save a file or add a photo to the folder, you **must** run these commands in your terminal to update the live website:

1.  **Stage your changes:**
    ```powershell
    git add .
    ```
2.  **Save your update with a note:**
    ```powershell
    git commit -m "added new product samples and updated prices"
    ```
3.  **Upload to the internet:**
    ```powershell
    git push
    ```

---

## 💡 Pro Tips
*   **Refresh:** After pushing to GitHub, it usually takes **1-2 minutes** for the live site (`likhaia.github.io`) to show the updates.
*   **Broken Images?** Double-check that the file name in your code matches the actual file name exactly (including capital letters!).
*   **Customization Details:** The form notes (e.g., "Include 35 photos") are managed in `js/main.js` under `const productGuides`.

---
*Created with love for LIKHAIAWORKS*