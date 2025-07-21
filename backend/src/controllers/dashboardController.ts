import { Request, Response } from 'express';
import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

// Get dashboard statistics
export const getDashboardStats = async (req: Request, res: Response): Promise<void> => {
  try {
    // Get total households
    const totalHouseholds = await prisma.households.count({
      where: { is_deleted: false },
    });

    // Get total members
    const totalMembers = await prisma.members.count({
      where: { is_deleted: false },
    });

    // Get hamlets covered
    const hamletsCovered = await prisma.hamlets.count();

    // Get panchayats covered
    const panchayatsCovered = await prisma.panchayats.count();

    // Get category distribution
    const categoryDistribution = await prisma.households.groupBy({
      by: ['category'],
      where: { is_deleted: false },
      _count: {
        category: true,
      },
    });

    // Get recent activity (households created in last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentActivity = await prisma.households.count({
      where: {
        is_deleted: false,
        created_at: {
          gte: thirtyDaysAgo,
        },
      },
    });

    // Get last updated timestamp
    const lastUpdated = new Date().toISOString();

    res.json({
      success: true,
      data: {
        totalHouseholds,
        totalMembers,
        completedSurveys: totalHouseholds, // Assuming all households are completed surveys
        pendingSurveys: 0, // This would need business logic to determine
        hamletsCovered,
        panchayatsCovered,
        categoryDistribution: categoryDistribution.map((cat) => ({
          category: cat.category || 'Unknown',
          count: cat._count.category,
        })),
        recentActivity,
        lastUpdated,
      },
    });
  } catch (error) {
    console.error('❌ Get dashboard stats error:', error);
    res.status(500).json({
      error: 'Failed to fetch dashboard statistics',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Get dashboard reports
export const getDashboardReports = async (req: Request, res: Response): Promise<void> => {
  try {
    // Get basic report data
    const reports = {
      householdReport: {
        total: await prisma.households.count({ where: { is_deleted: false } }),
        byCategory: await prisma.households.groupBy({
          by: ['category'],
          where: { is_deleted: false },
          _count: { category: true },
        }),
        byPanchayat: await prisma.households.groupBy({
          by: ['grama_panchayat'],
          where: { is_deleted: false },
          _count: { grama_panchayat: true },
        }),
      },
      memberReport: {
        total: await prisma.members.count({ where: { is_deleted: false } }),
        byGender: await prisma.members.groupBy({
          by: ['gender'],
          where: { is_deleted: false },
          _count: { gender: true },
        }),
        byEducation: await prisma.members.groupBy({
          by: ['general_education_level'],
          where: { is_deleted: false },
          _count: { general_education_level: true },
        }),
      },
      locationReport: {
        districts: await prisma.districts.count(),
        blocks: await prisma.blocks.count(),
        panchayats: await prisma.panchayats.count(),
        hamlets: await prisma.hamlets.count(),
      },
    };

    res.json({
      success: true,
      reports,
    });
  } catch (error) {
    console.error('❌ Get dashboard reports error:', error);
    res.status(500).json({
      error: 'Failed to fetch dashboard reports',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
