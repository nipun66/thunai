import { Router } from 'express';
import { getDashboardStats, getDashboardReports } from '../controllers/dashboardController';
import PDFDocument from 'pdfkit';
import ExcelJS from 'exceljs';
import { authenticateJWT } from '../middleware/authMiddleware';

const router = Router();

// Public routes (no authentication required)
router.get('/stats', getDashboardStats);
router.get('/reports', getDashboardReports);

// Helper to get report data (same as getDashboardReports, but returns object)
async function getDashboardReportsData(prisma: any) {
  return {
    householdReport: {
      total: await prisma.households.count({ where: { is_deleted: false } }),
      byCategory: await prisma.households.groupBy({ by: ['category'], where: { is_deleted: false }, _count: { category: true } }),
      byPanchayat: await prisma.households.groupBy({ by: ['grama_panchayat'], where: { is_deleted: false }, _count: { grama_panchayat: true } })
    },
    memberReport: {
      total: await prisma.members.count({ where: { is_deleted: false } }),
      byGender: await prisma.members.groupBy({ by: ['gender'], where: { is_deleted: false }, _count: { gender: true } }),
      byEducation: await prisma.members.groupBy({ by: ['general_education_level'], where: { is_deleted: false }, _count: { general_education_level: true } })
    },
    locationReport: {
      districts: await prisma.districts.count(),
      blocks: await prisma.blocks.count(),
      panchayats: await prisma.panchayats.count(),
      hamlets: await prisma.hamlets.count()
    }
  };
}

router.get('/export/pdf', authenticateJWT, async (req, res) => {
  try {
    // Fetch report data
    const reports = await getDashboardReportsData(req.app.get('prisma') || require('../generated/prisma'));
    // Create PDF
    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="dashboard_report_${new Date().toISOString().slice(0,10)}.pdf"`);
    doc.text('THUNAI Dashboard Report', { align: 'center', underline: true });
    doc.moveDown();
    doc.text(`Generated: ${new Date().toLocaleString()}`);
    doc.text(`User: ${(req as any).user?.phoneNumber || 'unknown'}`);
    doc.moveDown();
    doc.text('Household Report:');
    doc.text(JSON.stringify(reports.householdReport, null, 2));
    doc.moveDown();
    doc.text('Member Report:');
    doc.text(JSON.stringify(reports.memberReport, null, 2));
    doc.moveDown();
    doc.text('Location Report:');
    doc.text(JSON.stringify(reports.locationReport, null, 2));
    doc.end();
    doc.pipe(res);
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate PDF', details: error instanceof Error ? error.message : 'Unknown error' });
  }
});

router.get('/export/excel', authenticateJWT, async (req, res) => {
  try {
    // Fetch report data
    const reports = await getDashboardReportsData(req.app.get('prisma') || require('../generated/prisma'));
    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'THUNAI System';
    workbook.created = new Date();
    const sheet = workbook.addWorksheet('Dashboard Report');
    sheet.addRow(['THUNAI Dashboard Report']);
    sheet.addRow([`Generated: ${new Date().toLocaleString()}`]);
    sheet.addRow([`User: ${(req as any).user?.phoneNumber || 'unknown'}`]);
    sheet.addRow([]);
    sheet.addRow(['Household Report']);
    Object.entries(reports.householdReport).forEach(([k, v]) => sheet.addRow([k, JSON.stringify(v)]));
    sheet.addRow([]);
    sheet.addRow(['Member Report']);
    Object.entries(reports.memberReport).forEach(([k, v]) => sheet.addRow([k, JSON.stringify(v)]));
    sheet.addRow([]);
    sheet.addRow(['Location Report']);
    Object.entries(reports.locationReport).forEach(([k, v]) => sheet.addRow([k, JSON.stringify(v)]));
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename="dashboard_report_${new Date().toISOString().slice(0,10)}.xlsx"`);
    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate Excel', details: error instanceof Error ? error.message : 'Unknown error' });
  }
});

export default router;