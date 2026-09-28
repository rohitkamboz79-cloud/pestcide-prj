document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");
    const savedData = document.getElementById("savedData");
    const storageKey = "samabrotherPesticides";

    if (!form) return;

    const existingData = JSON.parse(localStorage.getItem(storageKey) || "[]");
    const lastEntry = Array.isArray(existingData) && existingData.length ? existingData[existingData.length - 1] : null;

    if (lastEntry) {
        form.name.value = lastEntry.name || "";
        form.address.value = lastEntry.address || "";
        form.phone.value = lastEntry.phone || "";
        form.product.value = lastEntry.product || "";
        savedData.textContent = "Last saved data restored from localStorage.";
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const formData = {
            name: form.name.value.trim(),
            address: form.address.value.trim(),
            phone: form.phone.value.trim(),
            product: form.product.value.trim()
           
        };

        if (!formData.name || !formData.address || !formData.phone || !formData.product) {
            alert("Please fill in all fields.");
            return;
        }

        let records = JSON.parse(localStorage.getItem(storageKey) || "[]");
        if (!Array.isArray(records)) {
            records = [];
        }

        records.push(formData);
        localStorage.setItem(storageKey, JSON.stringify(records));

        if (savedData) {
            savedData.textContent = "Saved successfully! Your data is stored in localStorage.";
        }

        form.reset();
    });
});