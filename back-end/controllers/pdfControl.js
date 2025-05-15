const PDFDocument = require('pdfkit');
const Task = require('../models/task');

const generatePDF = async (req, res) => {
  const tasks = await Task.find({});
  const doc = new PDFDocument();

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=tasks.pdf');
  doc.pipe(res);

  doc.fontSize(20).text('Task Report', { align: 'center' });
  doc.moveDown();

  tasks.forEach(task => {
    doc.fontSize(12).text(`Title: ${task.title}`);
    doc.text(`Status: ${task.status}`);
    doc.text(`Deadline: ${new Date(task.deadline).toLocaleDateString()}`);
    doc.text('------------------------------');
  });

  doc.end();
};

module.exports = { generatePDF };
