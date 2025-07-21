import { Request, Response } from 'express';
import { PrismaClient } from '../generated/prisma';
import { z } from 'zod';
import { AuthRequest } from '../middleware/authMiddleware';

const prisma = new PrismaClient();

const educationSchema = z.object({
  household_id: z.string().uuid(),
  student_name: z.string().max(150).optional(),
  class_grade: z.string().max(50).optional(),
  school_institution: z.string().max(200).optional(),
  issues_faced: z.string().optional(),
  additional_remarks: z.string().optional(),
  estimated_budget: z.number().optional(),
  is_dropout: z.boolean().optional(),
  dropout_age: z.number().optional(),
  last_class: z.string().max(50).optional(),
  dropout_year: z.number().optional(),
  dropout_reason: z.string().optional(),
  reentry_budget: z.number().optional(),
});

export const getEducationDetails = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const education = await prisma.education_details.findMany({
      include: {
        households: true,
      },
    });
    res.json(education);
  } catch (error) {
    console.error('Get education details error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getEducationDetail = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { education_id } = req.params;
    const education = await prisma.education_details.findUnique({
      where: { education_id: Number(education_id) },
      include: {
        households: true,
      },
    });

    if (!education) {
      res.status(404).json({ error: 'Education detail not found' });
      return;
    }

    res.json(education);
  } catch (error) {
    console.error('Get education detail error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createEducationDetail = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const parse = educationSchema.safeParse(req.body);
    if (!parse.success) {
      res.status(400).json({ error: parse.error.flatten() });
      return;
    }

    const education = await prisma.education_details.create({
      data: {
        household_id: parse.data.household_id,
        student_name: parse.data.student_name,
        class_grade: parse.data.class_grade,
        school_institution: parse.data.school_institution,
        issues_faced: parse.data.issues_faced,
        additional_remarks: parse.data.additional_remarks,
        estimated_budget: parse.data.estimated_budget,
        is_dropout: parse.data.is_dropout,
        dropout_age: parse.data.dropout_age,
        last_class: parse.data.last_class,
        dropout_year: parse.data.dropout_year,
        dropout_reason: parse.data.dropout_reason,
        reentry_budget: parse.data.reentry_budget,
      },
      include: {
        households: true,
      },
    });

    res.status(201).json(education);
  } catch (error) {
    console.error('Create education detail error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateEducationDetail = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { education_id } = req.params;
    const parse = educationSchema.partial().safeParse(req.body);

    if (!parse.success) {
      res.status(400).json({ error: parse.error.flatten() });
      return;
    }

    const education = await prisma.education_details.update({
      where: { education_id: Number(education_id) },
      data: {
        household_id: parse.data.household_id,
        student_name: parse.data.student_name,
        class_grade: parse.data.class_grade,
        school_institution: parse.data.school_institution,
        issues_faced: parse.data.issues_faced,
        additional_remarks: parse.data.additional_remarks,
        estimated_budget: parse.data.estimated_budget,
        is_dropout: parse.data.is_dropout,
        dropout_age: parse.data.dropout_age,
        last_class: parse.data.last_class,
        dropout_year: parse.data.dropout_year,
        dropout_reason: parse.data.dropout_reason,
        reentry_budget: parse.data.reentry_budget,
      },
      include: {
        households: true,
      },
    });

    res.json(education);
  } catch (error) {
    console.error('Update education detail error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteEducationDetail = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { education_id } = req.params;

    await prisma.education_details.delete({
      where: { education_id: Number(education_id) },
    });

    res.json({ message: 'Education detail deleted successfully' });
  } catch (error) {
    console.error('Delete education detail error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
