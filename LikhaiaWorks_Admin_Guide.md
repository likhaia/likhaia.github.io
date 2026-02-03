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
---

## 🎨 2.5 Creating a Perfect Favicon (Browser Icon)
If your logo is hard to see in the browser tab, follow these steps:
1.  Go to **Canva** (or any editor) and create a **500x500 square** project.
2.  Add a **Large White Circle** that fills the entire square.
3.  Place your **Logo** in the center of the circle.
4.  Save it as **`favicon.png`** and upload it to `assets/images/`.
5.  In `index.html`, update the favicon line to:
    `<link rel="icon" type="image/png" href="assets/images/favicon.png">`

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