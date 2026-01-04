// Function to handle the form submission and show the preview
document.getElementById('notice-form').addEventListener('submit', function(e) {
    e.preventDefault();
    console.log("Form submitted. Mapping data...");

    // Get values from the inputs
    const name = document.getElementById('in-name').value;
    const roll = document.getElementById('in-roll').value;
    const dept = document.getElementById('in-dept').value;
    const clg = document.getElementById('in-clg').value;
    const reason = document.getElementById('in-reason').value;

    // Fill the notice template
    document.getElementById('out-name').innerText = name;
    document.getElementById('out-roll').innerText = roll;
    document.getElementById('out-dept').innerText = dept;
    document.getElementById('out-clg').innerText = clg;
    document.getElementById('out-reason').innerText = reason;
    document.getElementById('out-date').innerText = new Date().toLocaleDateString('en-GB');

    // Hide input screen, show output screen
    document.getElementById('input-screen').style.display = 'none';
    document.getElementById('output-screen').style.display = 'block';
    
    console.log("Notice preview generated successfully.");
});

// THE PDF GENERATOR FUNCTION
async function downloadPDF() {
    console.log("Starting PDF generation...");
    
    // Check if the libraries loaded
    if (typeof html2canvas === 'undefined' || typeof window.jspdf === 'undefined') {
        alert("Error: PDF libraries not loaded. Check your internet connection.");
        console.error("Libraries missing: html2canvas or jspdf");
        return;
    }

    const { jsPDF } = window.jspdf;
    const element = document.getElementById('printable-area');

    try {
        // Create the canvas (high resolution)
        const canvas = await html2canvas(element, {
            scale: 3, // Increased scale for even sharper text
            useCORS: true,
            backgroundColor: "#ffffff"
        });

        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`Medical_Notice_${Date.now()}.pdf`);
        
        console.log("PDF download triggered!");
    } catch (error) {
        console.error("PDF Export Error:", error);
        alert("Something went wrong during generation. Check the console (F12).");
    }
}